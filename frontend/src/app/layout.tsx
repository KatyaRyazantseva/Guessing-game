import type { Metadata } from "next";
import "./globals.css";
import '@mantine/core/styles.css';
import { EthereumProvider } from '../components/web3/Context';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';



export const metadata: Metadata = {
  title: 'Guessing game',
  description: "Web3 guessing game app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
          <link href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet" />
          <ColorSchemeScript />
      </head>
      <body>
        <EthereumProvider>
          <MantineProvider>
            {children}
          </MantineProvider>
        </EthereumProvider>
        
      </body>
    </html>
  )
}
