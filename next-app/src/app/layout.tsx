import type { Metadata } from "next";
import Head from 'next/head';
import "./globals.css";
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { EthereumProvider } from './web3/Context';
import { ColorSchemeScript } from '@mantine/core';

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
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet" />
        <ColorSchemeScript />
      </head>
      <body>
        <EthereumProvider>
          {children}
        </EthereumProvider>
      </body>
    </html>
  )
}
