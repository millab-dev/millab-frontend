import AdminModuleList from "@/components/admin/AdminModuleList";
import AdminGuard from "@/components/admin/AdminGuard";

export default function AdminModulesPage() {
  return (
    <AdminGuard>
      <AdminModuleList />
    </AdminGuard>
  );
}
