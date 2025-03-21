"use client";
import React, { useState } from "react";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import { MessagesContext } from "@/context/MessagesContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import Header from "@/components/custom/Header";

const Provider = ({ children }) => {
  const [messages, setMessages] = useState();
  const [userDetail, setUserDetail] = useState();
  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <MessagesContext.Provider value={{ messages, setMessages }}>
        <NextThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange>
            <Header/>
          {children}
        </NextThemeProvider>
      </MessagesContext.Provider>
    </UserDetailContext.Provider>
  );
};

export default Provider;
