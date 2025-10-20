"use client";

import styles from "@/src/styles/ConnectModal.module.sass";
import { ArenaBlock, ArenaChannelMod } from "arena-ts";

export function ConnectDialog({
  focus,
  showConnectModal,
  setShowConnectModal,
  block,
}: {
  focus: boolean;
  showConnectModal: boolean;
  setShowConnectModal: any;
  block: ArenaBlock | ArenaChannelMod;
}) {
  // Connect feature disabled - authentication removed
  return null;
}

export function ConnectModal({
  setShowConnectModal,
  block,
}: {
  setShowConnectModal: any;
  block: ArenaBlock | ArenaChannelMod;
}) {
  // Connect feature disabled - authentication removed
  return null;
}
