import React from "react";
import Link from "next/link";

type Props = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
    return (
        <div className="main-layout">
        <header className="main-header">
            <Link href="/">
            <img src="/images/logo.png" alt="Logo" className="logo-img" />
            </Link>
            <nav className="main-nav">
            <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/products">Products</Link></li>
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/contact">Contact</Link></li>
            </ul>
            </nav>
        </header>
        <main className="main-content">
            {children}
        </main>
        <footer className="main-footer">
            <p>&copy; {new Date().getFullYear()} Gift-Article. All rights reserved.</p>
        </footer>
        </div>
    );
}