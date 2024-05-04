"use client";
import { Provider } from "react-redux";
import { makeStore } from "@root/libs/redux/store";
import { ReactNode, useEffect, useState } from "react";

export interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const [store, setStore] = useState<any>();

  useEffect(() => {
    setStore(makeStore([]));
  }, []);

  return store && <Provider store={store}>{children}</Provider>;
}
