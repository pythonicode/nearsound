import NearLogo from "./NearLogo";
import { LoadingButton } from "@mui/lab";
import { useNear } from "../context/NearProvider";
import { useState } from "react";

export default function NearLogin() {
  const { near, wallet, connect_to_near } = useNear();

  const [load, setLoad] = useState(false);

  return (
    <LoadingButton
      onClick={() => {
        connect_to_near();
        setLoad(true);
      }}
      color="neutral"
      size="large"
      loading={load}
      loadingPosition="start"
      startIcon={<NearLogo />}
      variant="outlined"
    >
      Connect to Near
    </LoadingButton>
  );
}
