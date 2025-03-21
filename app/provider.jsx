"use client";
import React, { useState } from "react";
import { ThemeProvider } from "next-themes";
import { MessagesContext } from "@/context/MessagesContext";

const Provider = ({ children }) => {
    const [messages, setMessages] = useState()
  return (
    <MessagesContext value={{messages, setMessages}}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange>
        {children}
      </ThemeProvider>
    </MessagesContext>
  );
};

export default Provider;
