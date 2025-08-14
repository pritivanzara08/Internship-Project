import React from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import type { NextPage } from 'next';

const Dashboard: NextPage = () => {
// You can replace this static data with real API data later
const widgets = [
{ title: 'Sales', value: '$12,340' },
{ title: 'Orders', value: '320' },
{ title: 'Users', value: '1,240' },
];

return (
<AdminLayout>

<div> <h1>Welcome to Admin Dashboard</h1> <p> Overview widgets and metrics appear here. Connect to your MongoDB backend to populate these in real-time. </p> <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 16, }} > {widgets.map((w) => ( <div key={w.title} style={{ padding: 16, border: '1px solid #e5e5e5', borderRadius: 6 }}> <div style={{ fontSize: 14, color: '#888' }}>{w.title}</div> <div style={{ fontSize: 20, fontWeight: 700, marginTop: 6 }}>{w.value}</div> </div> ))} </div> <div style={{ marginTop: 32 }}> <h2 style={{ fontSize: 18, marginBottom: 8 }}>Recent Activity</h2> <ul style={{ paddingLeft: 20, color: '#555' }}> <li>New order #1234 placed</li> <li>Product "Custom Mug" stock updated</li> <li>User admin logged in</li> </ul> </div> </div> </AdminLayout>
);
};

export default Dashboard;

