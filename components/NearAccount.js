import NearLogo from "./NearLogo";
import { useNear } from "../context/NearProvider";
import { useState } from "react";
import { useRouter } from "next/router";
import { LoadingButton } from "@mui/lab";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";

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
      startIcon={<AccountCircleRoundedIcon />}
    >
      Account
    </LoadingButton>
  );
}
