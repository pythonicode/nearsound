use crate::*;

#[near_bindgen]
impl Contract {
    #[payable]
    pub fn nft_mint(
        &mut self,
        token_id: TokenId,
        mut metadata: TokenMetadata,
        receiver_id: AccountId,
        perpetual_royalties: Option<HashMap<AccountId, u32>>,
    ) {
        // Measure the initial storage being used on the contract
        let initial_storage_usage = env::storage_usage();

        // Get the Artist name for the Account ID and panic if account is not an artist
        let caller = env::predecessor_account_id();
        let artist = self.artist_by_account.get(&caller).expect("Artist privileges not setup for this account.");

        // Create a royalty map to store in the token
        let mut royalty = HashMap::new();

        // If perpetual royalties were passed into the function do the following:
        if let Some(perpetual_royalties) = perpetual_royalties {
            // Make sure that the length of the perpetual royalties is below 7 since we won't have enough GAS to pay out that many people
            assert!(perpetual_royalties.len() < 7, "Cannot add more than 6 perpetual royalty amounts");

            // Iterate through the perpetual royalties and insert the account and amount in the royalty map
            for (account, amount) in perpetual_royalties {
                royalty.insert(account, amount);
            }
        }

        // Define the token struct that contains the owner ID 
        let token = Token {
            // Set the owner ID equal to the receiver ID passed into the function
            owner_id: receiver_id.clone(),
            // Set the author ID equal to the account ID that minted the token
            author_id: caller,
            // Set the approved account IDs to the default value (an empty map)
            approved_account_ids: Default::default(),
            // Next approval ID is set to 0
            next_approval_id: 0,
            // Map of perpetual royalties for the token (The owner will get 100% - total perpetual royalties)
            royalty,
        };

        // Insert the token ID and token struct and make sure that the token doesn't already exist
        assert!(
            self.tokens_by_id.insert(&token_id, &token).is_none(),
            "Token already exists"
        );
        
        // Parse and Index Metadata For Enumeration w/ Search
        self.internal_add_token_to_search(&artist, &token_id);
        self.internal_add_token_to_search(&metadata.title, &token_id);
        let desc = metadata.description.clone();
        if let Some(desc) = desc {
            for token in desc.split_whitespace() {
                let token_str = String::from(token);
                self.internal_add_token_to_search(&token_str, &token_id);
            }
        }

        // Update and insert the token metadata
        metadata.artist = Some(artist);
        self.token_metadata_by_id.insert(&token_id, &metadata);

        //call the internal method for adding the token to the owner
        self.internal_add_token_to_owner(&token.owner_id, &token_id);

        // Construct the mint log as per the events standard.
        let nft_mint_log: EventLog = EventLog {
            // Standard name ("nep171").
            standard: NFT_STANDARD_NAME.to_string(),
            // Version of the standard ("nft-1.0.0").
            version: NFT_METADATA_SPEC.to_string(),
            // The data related with the event stored in a vector.
            event: EventLogVariant::NftMint(vec![NftMintLog {
                // Owner of the token.
                owner_id: token.owner_id.to_string(),
                // Vector of token IDs that were minted.
                token_ids: vec![token_id.to_string()],
                // An optional memo to include.
                memo: None,
            }]),
        };

        // Log the serialized json.
        env::log_str(&nft_mint_log.to_string());

        //calculate the required storage which was the used - initial
        let required_storage_in_bytes = env::storage_usage() - initial_storage_usage;

        //refund any excess storage if the user attached too much. Panic if they didn't attach enough to cover the required.
        refund_deposit(required_storage_in_bytes);
    }
}