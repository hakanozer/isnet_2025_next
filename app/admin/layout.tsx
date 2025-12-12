import type { Metadata } from "next";
import { getSession } from "@/lib/session"
import { redirect } from "next/navigation"
import { headers } from "next/headers";
import Navbar from "./components/Navbar";

export const metaData: Metadata = {
  title: 'İşnet App',
  description: 'İşnet App Detail'
}

export default async function AdminLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getSession()

  /*
  const h = await headers();
  const referer = h.get('referer') || '';
  const pathname = new URL(referer).pathname;
  console.log(pathname, session.role)
  */

  return (
    <html lang="en">
    <head>
    </head>
      <body>
        <div className="container">
          {session && session.id && 
            <Navbar name={session.name} />
          }
          {children}
        </div>
      </body>
    </html>
  );
}
