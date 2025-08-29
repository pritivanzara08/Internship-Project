import React, { useEffect, useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { useRouter } from "next/router";

interface SettingsData {
  siteName: string;
  maintenanceMode: boolean;
}

export default function AdminSettingsPage() {
  const [data, setData] = useState<SettingsData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/admin/settings");
        if (res.status === 403) {
          router.push("/login");
          return;
        }
        const json = await res.json();
        setData(json.data);
      } catch (error) {
        console.error("Error fetching settings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  if (loading) return <p>Loading...</p>;
  if (!data) return <p>No settings available</p>;

  return (
    <AdminLayout title="Settings">
      <h1 className="beautiful-title">Admin Settings</h1>
      <div className="mt-6 space-y-4">
        <p>
          <strong>Site Name:</strong> {data.siteName}
        </p>
        <p>
          <strong>Maintenance Mode:</strong>{" "}
          {data.maintenanceMode ? "Enabled" : "Disabled"}
        </p>
      </div>
    </AdminLayout>
  );
}
