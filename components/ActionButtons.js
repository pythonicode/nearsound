import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const ActionButton = styled(Button)(({ theme }) => ({
  width: "100%",
  marginTop: "0.5rem",
}));

export function MintSong({ onClick, roles }) {
  if (roles.includes("artist") || roles.includes("admin"))
    return (
      <ActionButton onClick={onClick} variant="outlined">
        Mint a Song
      </ActionButton>
    );
  else return null;
}

export function CreateArtist({ onClick, roles }) {
  if (!roles.includes("artist")) {
    return (
      <ActionButton onClick={onClick} variant="outlined">
        Create Artist Account
      </ActionButton>
    );
  } else return null;
}
