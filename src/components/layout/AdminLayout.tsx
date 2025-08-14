import React from 'react';
import Link from 'next/link';
import styles from './AdminLayout.module.css'; // optional CSS module

type Props = { children: React.ReactNode };

export default function AdminLayout({ children }: Props) {
    return (

        <div className={styles.adminRoot}>
            <aside className={styles.sidebar}>
                <nav>
                    <ul>
                        <li><Link href="/admin/dashboard">Dashboard</Link></li>
                        <li><Link href="/admin/products">Products</Link></li>
                        <li><Link href="/admin/orders">Orders</Link></li>
                        <li><Link href="/admin/customers">Customers</Link></li>
                        <li><Link href="/admin/settings">Settings</Link></li>
                    </ul>
                </nav>
            </aside>
            <main className={styles.content}>{children}</main>
        </div>
    );
}