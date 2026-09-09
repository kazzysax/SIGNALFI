import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata={title:"SignalFi — Trade the signal",description:"AI event-driven trading for GOAT spot and Hyperliquid perpetual markets.",icons:{icon:"/favicon.svg",shortcut:"/favicon.svg"}};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en" className="dark"><body>{children}</body></html>}
