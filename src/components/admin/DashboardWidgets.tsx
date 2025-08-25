import React from 'react';
import "@/styles/adminLayout.css";

type Widget = { title: string; value: string; delta?: string };

export const DashboardWidgetPanel: React.FC<{ widgets: Widget[] }> = ({
  widgets,
}) => {
  return (
    <section className='dashboard-widget-panel'>
      {widgets.map((w) => (
        <div key={w.title} className='dashboard-widget'>
          <div className='dashboard-widget__title'>{w.title}</div>
          <div className='dashboard-widget__value'>{w.value}</div>
          {w.delta && <div className='dashboard-widget__delta'>{w.delta}</div>}
        </div>
      ))}
    </section>
  );
};