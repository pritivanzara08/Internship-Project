import Link from "next/link";
import React from "react";
import "@/styles/adminLayout.css";

type NavItem = { label: string; href: string; roles: ("admin" | "customer")[] };

const items: NavItem[] = [
  { label: "Dashboard", href: "/admin/dashboard", roles: ["admin"] },
  { label: "Products", href: "/admin/products", roles: ["admin"] },
  { label: "Orders", href: "/admin/orders", roles: ["admin", "customer"] },
  { label: "Customers", href: "/admin/customers", roles: ["admin"] },
  { label: "Settings", href: "/admin/settings", roles: ["admin"] },
];

interface Props {
  userRole?: "admin" | "customer";
}

export const AdminSidebar: React.FC<Props> = ({ userRole = "admin" }) => {
  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar__brand">Shop Admin</div>
      <nav>
        {items
          .filter((item) => item.roles.includes(userRole))
          .map((it) => (
            <Link key={it.href} href={it.href} legacyBehavior>
              <a className="admin-sidebar__link">{it.label}</a>
            </Link>
          ))}
      </nav>
    </aside>
  );
};
