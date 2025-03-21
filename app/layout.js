import Header from "@/components/custom/Header";
import "./globals.css";
import Provider from "./provider";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Provider>
          <Header/>
          {children}
        </Provider>
      </body>
    </html>
  );
}
