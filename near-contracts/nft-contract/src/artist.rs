use crate::*;

#[near_bindgen]
impl Contract {
    #[payable]
    pub fn create_artist(
        &mut self,
        artist_name: Artist,
    ) {
        let initial_storage_usage = env::storage_usage();
        let _artist = self.artist_by_account.get(&env::predecessor_account_id());

        if let Some(_artist) = _artist {
            env::panic_str("Artist already exists for this user. You cannot change your Artist Name.");
        } else {
            self.artist_by_account.insert(&env::predecessor_account_id(), &artist_name);
        }

        let required_storage_in_bytes = env::storage_usage() - initial_storage_usage;

        // Refund any excess storage if the user attached too much. Panic if they didn't attach enough to cover the required.
        refund_deposit(required_storage_in_bytes);
    }
    
    pub fn get_artist(&self, account_id: AccountId) -> Artist {
        let artist = self.artist_by_account.get(&account_id);
        if let Some(artist) = artist {
            artist
        } else {
            String::from("None")
        }
    }

    pub fn is_artist(&self, account_id: AccountId) -> bool {
        let _artist = self.artist_by_account.get(&account_id);
        if let Some(_artist) = _artist {
            true
        } else {
            false
        }
    }
}