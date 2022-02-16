// Packages //
import { useState, useEffect, useContext, createContext } from "react";
import {
  keyStores,
  connect,
  providers,
  WalletConnection,
  Contract,
} from "near-api-js";

const NearContext = createContext();

export function useNear() {
  return useContext(NearContext);
}

export function NearProvider({ children }) {
  const provider = new providers.JsonRpcProvider({
    url: "https://archival-rpc.testnet.near.org",
  });

  const [near, setNear] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [contract, setContract] = useState(null);
  const [redirect, setRedirect] = useState(true);
  const [signedIn, setSignedIn] = useState(false);
  const [roles, setRoles] = useState(["listener"]);
  const [artist, setArtist] = useState("No Artist");
  const [connected, setConnected] = useState(false);
  const [terms, setTerms] = useState([]);
  const [tokens, setTokens] = useState([]);

  const setup_near = async () => {
    const config = {
      networkId: "testnet",
      keyStore: new keyStores.BrowserLocalStorageKeyStore(),
      nodeUrl: "https://rpc.testnet.near.org",
      walletUrl: "https://wallet.testnet.near.org",
      helperUrl: "https://helper.testnet.near.org",
      explorerUrl: "https://explorer.testnet.near.org",
    };
    const near_connection = await connect(config);
    setNear(near_connection);
    const wallet_connection = new WalletConnection(near_connection);
    setWallet(wallet_connection);
    const contract_connection = new Contract(
      wallet_connection.account(), // the account object that is connecting
      "nearsound.testnet",
      {
        viewMethods: [
          "nft_tokens",
          "get_artist",
          "get_search_terms",
          "nft_tokens_for_search",
        ], // view methods do not change state but usually return a value
        changeMethods: ["nft_mint", "create_artist"], // change methods modify state
        sender: wallet_connection.account(), // account object to initialize and sign transactions.
      }
    );
    setContract(contract_connection);
    const _artist = contract_connection.get_artist({
      account_id: wallet_connection.getAccountId(),
    });
    const _search = contract_connection.get_search_terms();
    const _tokens = contract_connection.nft_tokens({
      from_index: "0",
      limit: 64,
    });
    const [artist_name, search_terms, default_tokens] = await Promise.all([
      _artist,
      _search,
      _tokens,
    ]);
    if (artist_name != "None") {
      setRoles([...roles, "artist"]);
      setArtist(artist_name);
    }
    setTerms(search_terms);
    setTokens(default_tokens);
    setConnected(true);
  };

  const connect_to_near = () => {
    wallet.requestSignIn(
      "nearsound.testnet", // contract requesting access
      "Nearsound" // optional
    );
  };

  const getTransaction = async (hash, account_id) => {
    const result = await provider.txStatus(hash, account_id);
    return result;
  };

  const search = async (search_term) => {
    const _tokens = await contract.nft_tokens_for_search({
      search_term,
      from_index: "0",
      limit: 64,
    });
    console.log(_tokens);
    setTokens(_tokens);
  };

  useEffect(() => {
    if (wallet != undefined && wallet.isSignedIn()) setSignedIn(true);
    else setSignedIn(false);
  }, [wallet]);

  useEffect(() => {
    setup_near();
  }, []);

  const context = {
    near,
    wallet,
    contract,
    connected,
    roles,
    artist,
    terms,
    tokens,
    connect_to_near,
    getTransaction,
    signedIn,
    redirect,
    setRedirect,
    search,
  };

  return (
    <NearContext.Provider value={context}>{children}</NearContext.Provider>
  );
}
