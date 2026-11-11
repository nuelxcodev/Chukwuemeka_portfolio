"use client";

import { useSyncExternalStore } from "react";
import { getSection, subscribeSection } from "@/lib/store";

export function useActiveSection() {
  return useSyncExternalStore(subscribeSection, getSection, () => 0);
}
