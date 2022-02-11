import NearLogo from "./NearLogo";
import { useNear } from "../context/NearProvider";
import { useState } from "react";
import { useRouter } from "next/router";
import { LoadingButton } from "@mui/lab";

export default function NearAccount() {
  const router = useRouter();

  return (
    <LoadingButton
      onClick={() => {
        router.push("/account");
      }}
      color="neutral"
      size="large"
      variant="outlined"
    >
      Account
    </LoadingButton>
  );
}
