"use client";

import Link from "next/link";
import router from "next/router";

export function Footer() {
  return (
    <div className="footer-content">
      <p>
        {" "}
        © {new Date().getFullYear()} Designed & Powered by{" "}
        <span className="text-[var(--black-700)] font-semibold">
          Code Don't Blow
        </span>{" "}
      </p>
    </div>
  );
}
