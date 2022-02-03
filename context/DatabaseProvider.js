// Packages //
import { useContext, createContext } from "react";

const DatabaseContext = createContext();

export function useDatabase() {
  return useContext(DatabaseContext);
}

export function DatabaseProvider({ children }) {
  // Create a single supabase client for interacting with your database

  const context = {};

  return (
    <>
      <DatabaseContext.Provider value={context}>
        {children}
      </DatabaseContext.Provider>
    </>
  );
}
