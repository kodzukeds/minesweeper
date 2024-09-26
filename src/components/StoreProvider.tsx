"use client";
import { Provider } from "react-redux";
import { makeStore } from "../lib/store";
import React, { useMemo } from "react";
import { EnhancedStore } from "@reduxjs/toolkit";

interface storeProviderProps {
  children: React.ReactNode
}

export default function StoreProvider({ children }: storeProviderProps) {
  const storeRef = useMemo<EnhancedStore>(() => makeStore(), []);

  return <Provider store={storeRef}>{children}</Provider>;
}
