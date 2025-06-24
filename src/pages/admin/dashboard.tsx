// pages/admin.tsx
import ProtectedRoute from '../../components/ProtectedRoute';

export default function AdminPage() {
  return (
    <ProtectedRoute allowedRoles={['admin']} fallback={<p>Loading...</p>}>
      <h1>Admin Dashboard</h1>
      {/* admin content here */}
    </ProtectedRoute>
  );
}
