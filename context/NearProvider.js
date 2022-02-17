// Packages //
import { useState, useEffect, useContext, createContext } from "react";
import { keyStores, connect, WalletConnection, Contract } from "near-api-js";

const NearContext = createContext();

export function useNear() {
  return useContext(NearContext);
}

export function decode(data) {
  let res = "";
  for (let i = 0; i < data.length; i++) res += String.fromCharCode(data[i]);
  return JSON.parse(res);
}

const EMPTY_QUERY = Buffer.from("{}").toString("base64");

const DEFAULT_SEARCH = Buffer.from(
  JSON.stringify({
    from_index: "0",
    limit: 64,
  })
).toString("base64");

export function NearProvider({ children }) {
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
  const [costPerByte, setCostPerByte] = useState(null);

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
    const _tokens = near_connection.connection.provider.query({
      request_type: "call_function",
      finality: "final",
      account_id: "nearsound.testnet",
      method_name: "nft_tokens",
      args_base64: DEFAULT_SEARCH,
    });
    const _search = near_connection.connection.provider.query({
      request_type: "call_function",
      finality: "final",
      account_id: "nearsound.testnet",
      method_name: "get_search_terms",
      args_base64: EMPTY_QUERY,
    });
    const _request =
      near_connection.connection.provider.experimental_genesisConfig();
    const [default_tokens, search_terms, response] = await Promise.all([
      _tokens,
      _search,
      _request,
    ]);
    setCostPerByte(response.runtime_config.storage_amount_per_byte);
    setTokens(decode(default_tokens.result));
    setTerms(decode(search_terms.result));
    const contract_connection = new Contract(
      wallet_connection.account(), // the account object that is connecting
      "nearsound.testnet",
      {
        viewMethods: [
          "nft_tokens",
          "get_artist",
          "get_search_terms",
          "nft_tokens_for_search",
          "nft_token",
        ], // view methods do not change state but usually return a value
        changeMethods: ["nft_mint", "create_artist"], // change methods modify state
        sender: wallet_connection.account(), // account object to initialize and sign transactions.
      }
    );
    setContract(contract_connection);
    setRoles([...roles, "artist"]);
    setArtist("Halfmoon");
    setConnected(true);
  };

  const connect_to_near = () => {
    wallet.requestSignIn(
      "nearsound.testnet", // contract requesting access
      "Nearsound" // optional
    );
  };

  const getTransaction = async (hash, account_id) => {
    const result = await near.connection.provider.txStatus(hash, account_id);
    return result;
  };

  const search = async (search_term) => {
    const _tokens = await contract.nft_tokens_for_search({
      search_term,
      from_index: "0",
      limit: 64,
    });
    if (_tokens.length == 0) reset_search();
    else setTokens(_tokens);
  };

  const reset_search = async (from_index = "0", limit = 64) => {
    const _args = Buffer.from(
      JSON.stringify({
        from_index,
        limit,
      })
    ).toString("base64");
    const response = await near.connection.provider.query({
      request_type: "call_function",
      finality: "final",
      account_id: "nearsound.testnet",
      method_name: "nft_tokens",
      args_base64: _args,
    });
    setTokens(decode(response.result));
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
    reset_search,
    costPerByte,
  };

  return (
    <NearContext.Provider value={context}>{children}</NearContext.Provider>
  );
}
