// Packages //
import { motion } from "framer-motion";
import { Button, Autocomplete, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NearLogin from "./NearLogin";
import NearAccount from "./NearAccount";
import { useNear } from "../context/NearProvider";
import { useRouter } from "next/router";
import { useState } from "react";

const variants = {
  hidden: { y: -100 },
  enter: { y: 0 },
  exit: { y: -100 },
};

export default function Header() {
  const router = useRouter();

  const [query, setQuery] = useState("");

  const { signedIn, terms, search } = useNear();

  const action_button = () => {
    if (!signedIn) return <NearLogin />;
    return <NearAccount />;
  };

  return (
    <motion.header
      variants={variants}
      initial="hidden"
      animate="enter"
      exit="exit"
      transition={{ duration: 1 }}
      className="w-full flex flex-col sm:flex-row items-center justify-start p-4 gap-4 bg-dark border-b-2 border-dark-200"
    >
      <div
        onClick={() => {
          router.push("/");
        }}
        className="flex items-center justify-center gap-4 cursor-pointer select-none text-3xl"
      >
        Nearsound
      </div>
      <div className="flex flex-row grow items-center justify-center">
        <form className="flex flex-row items-center justify-center gap-4">
          <Autocomplete
            disablePortal
            value={query}
            onChange={(e, val) => setQuery(val)}
            options={terms}
            sx={{ width: "300px" }}
            renderInput={(params) => <TextField {...params} label="Search" />}
          />
          <Button
            onClick={() => {
              search(query);
            }}
          >
            <SearchIcon />
            Search
          </Button>
        </form>
      </div>
      {action_button()}
    </motion.header>
  );
}
