import { UserForm } from "@/pages/users/components/UserForm";
import { UserLayout } from "@/layouts/users/UserLayout";
import { useTranslations } from "@/hooks/use-translations";

import RoleForm from '@/pages/users/components/RoleForm';
import { Tabsuser } from "./components/Tabsuser";
interface createprops {
    permits?: string[];
    role?: string[];
  }
export default function CreateUser({permits,role}: createprops)  {
  const { t } = useTranslations();
  

  return (
    <UserLayout title={t("ui.users.create")}>
      <div className="px-6 py-1">
        <div className="max-w-x2 w-full">
          <Tabsuser permits={permits} role={role}
          ></Tabsuser>
        </div>
      </div>
    </UserLayout>
  );

};

