import { UserForm } from "@/pages/users/components/Tabsuser";
import { UserLayout } from "@/layouts/users/UserLayout";
import { useTranslations } from "@/hooks/use-translations";
import { PageProps } from "@/types";

interface CreateUserProps extends PageProps {
  arrayRolePermissions?: String[];

}


export default function CreateUser({arrayRolePermissions}:CreateUserProps) {
  
  const { t } = useTranslations();
  

  return (
    <UserLayout title={t("ui.users.create")}>
      <div className="flex justify-center items-start py-1 px-6">
        <div className="w-full max-w-3xl">
          <UserForm arrayRolePermissions={arrayRolePermissions} />
        </div>
      </div>
    </UserLayout>
  );
}