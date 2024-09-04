"use client"; // Indicate this file is a client component

import { Provider } from "react-redux";
import { store } from "@/src/redux/store";
import Header from "@/src/components/Header";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <Provider store={store}>
      <Header />
      {children}
    </Provider>
  );
}
