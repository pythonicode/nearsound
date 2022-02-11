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
  const provider = new providers.JsonRpcProvider(
    "https://archival-rpc.testnet.near.org"
  );

  const [near, setNear] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [contract, setContract] = useState(null);
  const [redirect, setRedirect] = useState(true);
  const [signedIn, setSignedIn] = useState(false);
  const [roles, setRoles] = useState(["listener"]);
  const [artist, setArtist] = useState("No Artist");
  const [connected, setConnected] = useState(false);

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
        viewMethods: ["nft_tokens", "get_artist"], // view methods do not change state but usually return a value
        changeMethods: ["nft_mint", "create_artist"], // change methods modify state
        sender: wallet_connection.account(), // account object to initialize and sign transactions.
      }
    );
    setContract(contract_connection);
    const artist = await contract_connection.get_artist({
      account_id: wallet_connection.getAccountId(),
    });
    if (artist != "None") {
      setRoles([...roles, "artist"]);
      setArtist(artist);
    }
    setConnected(true);
  };

  const connect_to_near = () => {
    wallet.requestSignIn(
      "nearsound.testnet", // contract requesting access
      "Nearsound" // optional
    );
  };

  const get_state = async (hash, account_id) => {
    const result = await provider.txStatus(txHash, accountId);
    return result;
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
    connect_to_near,
    get_state,
    signedIn,
    redirect,
    setRedirect,
  };

  return (
    <NearContext.Provider value={context}>{children}</NearContext.Provider>
  );
}
