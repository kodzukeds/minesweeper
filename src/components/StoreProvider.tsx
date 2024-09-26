"use client";
import { Provider } from "react-redux";
import { makeStore } from "../lib/store";
import React, { useRef } from "react";
import { EnhancedStore } from "@reduxjs/toolkit";

interface storeProviderProps {
  children: React.ReactNode
}

export default function StoreProvider({ children }: storeProviderProps) {
  const storeRef = useRef<EnhancedStore | null>(null)
  if (!storeRef.current) {
    storeRef.current = makeStore()
  }
  return <Provider store={storeRef.current}>{children}</Provider>
}
