import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { sepolia } from "viem/chains";
import { http } from "viem";

export const wagmiConfig = getDefaultConfig({
  appName: "Tribal Authentica",
  projectId: "YOUR_PROJECT_ID", // Get one from WalletConnect Cloud
  chains: [sepolia],
  ssr: true,
  transports: {
    [sepolia.id]: http('https://eth-sepolia.public.blastapi.io') // Using a public RPC URL
  }
}); 