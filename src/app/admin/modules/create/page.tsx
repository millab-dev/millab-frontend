import CreateModuleForm from "@/components/admin/CreateModuleForm";
import AdminGuard from "@/components/admin/AdminGuard";

export default function CreateModulePage() {
  return (
    <AdminGuard>
      <CreateModuleForm />
    </AdminGuard>
  );
}
