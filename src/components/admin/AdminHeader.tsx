import React from "react";
import "@/styles/adminLayout.css";

export const AdminHeader: React.FC<{ title?: string }> = ({ title }) => {
    return (
        <header className="admin-header">
            <h1 className="admin-header__title">{title ?? 'Admin'}</h1>
            <div className="admin-header__user">Admin User</div>
        </header>
    );
};

