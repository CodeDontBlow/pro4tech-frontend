"use client";

import Link from "next/link";

export function Navbar() {
  return (
    <nav style={{ display: "flex", gap: "10px" }}>
      <Link href="/">Home</Link>
      <Link href="/login">Login</Link>
    </nav>
  );
}
