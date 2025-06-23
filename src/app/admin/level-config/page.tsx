import LevelConfigManagement from "@/components/admin/LevelConfigManagement";
import AdminGuard from "@/components/admin/AdminGuard";

export default function LevelConfigPage() {
  return (
    <AdminGuard>
      <LevelConfigManagement />
    </AdminGuard>
  );
}
