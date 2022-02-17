import Tooltip from "@mui/material/Tooltip";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import SavingsIcon from "@mui/icons-material/Savings";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import HeadphonesIcon from "@mui/icons-material/Headphones";

export default function Roles({ roles }) {
  const role_icon = {
    admin: (
      <Tooltip key={"admin"} title="Admin">
        <AdminPanelSettingsIcon />
      </Tooltip>
    ),
    approver: (
      <Tooltip key={"approver"} title="Approver">
        <HowToRegIcon />
      </Tooltip>
    ),
    advertiser: (
      <Tooltip key={"advertiser"} title="Advertiser">
        <SavingsIcon />
      </Tooltip>
    ),
    artist: (
      <Tooltip key={"artist"} title="Artist">
        <AudiotrackIcon />
      </Tooltip>
    ),
    listener: (
      <Tooltip key={"listener"} title="Listener">
        <HeadphonesIcon />
      </Tooltip>
    ),
  };

  if (roles === undefined) return null;
  const content = roles.map((role) => {
    return role_icon[role];
  });

  return <>{content}</>;
}
