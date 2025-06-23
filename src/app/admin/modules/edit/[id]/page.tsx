import EditModuleForm from "@/components/admin/EditModuleForm";
import AdminGuard from "@/components/admin/AdminGuard";

export default function EditModulePage() {
  return (
    <AdminGuard>
      <EditModuleForm />
    </AdminGuard>
  );
}
