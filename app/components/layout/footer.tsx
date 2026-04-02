"use client";

import Link from "next/link";

export function Footer() {
    return (
        <div className="footer-content">
            © {new Date().getFullYear()} Pro4Tech
            <p>Designed & Powered by Code Don't Blow</p>
        </div >
    );
}