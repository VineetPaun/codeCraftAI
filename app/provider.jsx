"use client";
import React, { useEffect, useState } from "react";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import { MessagesContext } from "@/context/MessagesContext";
import { UserDetailContext } from "@/context/UserDetailContext.jsx";
import Header from "@/components/custom/Header";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useConvex } from "convex/react";

const Provider = ({ children }) => {
  const [messages, setMessages] = useState();
  const [userDetail, setUserDetail] = useState();
  const convex = useConvex()

  useEffect(() => {
    isAuthenticated()
  }, [])

  const isAuthenticated = async () => {
    if(typeof window !== undefined) {
      const user = JSON.parse(localStorage.getItem('user'))
      const result = await convex.query(api.users.GetUser, {
        email: user?.email
      })
      setUserDetail(result)
      console.log(result);
    }
  }
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID_KEY}>
      <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
        <MessagesContext.Provider value={{ messages, setMessages }}>
          <NextThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange>
            <Header />
            {children}
          </NextThemeProvider>
        </MessagesContext.Provider>
      </UserDetailContext.Provider>
    </GoogleOAuthProvider>
  );
};

export default Provider;