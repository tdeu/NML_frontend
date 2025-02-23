import React from "react";
import { SwitchTheme } from "~~/components/SwitchTheme";

/**
 * Site footer
 */
export const Footer = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 py-4 px-4 flex justify-between items-center bg-gradient-to-t from-emerald-500/10 to-transparent backdrop-blur-sm">
      <div className="flex-grow text-center text-sm font-ubuntu text-base-content/80">
        Neural Mask Ledger MMXXV - All Rights Preserved
      </div>
      <div>
        <SwitchTheme />
      </div>
    </div>
  );
};