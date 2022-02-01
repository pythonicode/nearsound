import NearLogo from "./NearLogo";
import { useRouter } from "next/router";
import { useNear } from "../context/NearProvider";

export default function HeaderAction() {
  const router = useRouter();
  const { near, wallet } = useNear();

  if (wallet != undefined && wallet.isSignedIn()) {
    return (
      <button className="flex flex-row gap-2 items-center justify-center text-xl border border-neutral-700 py-2 px-4 rounded hover:border-white transition-all">
        <NearLogo /> <code>/dashboard</code>
      </button>
    );
  }

  return (
    <button className="flex flex-row gap-2 items-center justify-center text-xl border border-neutral-700 py-2 px-4 rounded hover:border-white transition-all">
      <NearLogo /> <code>/connect</code>
    </button>
  );
}
