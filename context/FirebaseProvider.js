// Packages //
import { useState, useEffect, useContext, createContext } from "react";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const FirebaseContext = createContext();

const firebaseConfig = {
  apiKey: "AIzaSyCopswfJbXXI71WnIOQe2Tk0Nq9da0EooY",
  authDomain: "nearsoundmusic.firebaseapp.com",
  projectId: "nearsoundmusic",
  storageBucket: "nearsoundmusic.appspot.com",
  messagingSenderId: "188406153934",
  appId: "1:188406153934:web:3eeeca80473366440f469f",
  measurementId: "G-W8G38L9P78",
};

export function useFirebase() {
  return useContext(FirebaseContext);
}

export function FirebaseProvider({ children }) {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore();

  // States
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    setAnalytics(getAnalytics(app));
  }, []);

  const context = {
    app,
    analytics,
    db,
  };

  return (
    <>
      <FirebaseContext.Provider value={context}>
        {children}
      </FirebaseContext.Provider>
    </>
  );
}
