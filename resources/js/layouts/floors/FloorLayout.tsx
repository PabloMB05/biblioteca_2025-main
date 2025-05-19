import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import { PropsWithChildren, useEffect } from "react";
import { toast } from "sonner";
import { useTranslations } from "@/hooks/use-translations"; // Asegúrate de que esto exista

interface FlashMessages {
  success?: string;
  error?: string;
}

interface PageProps {
  flash: FlashMessages;
  [key: string]: unknown;
}

interface FloorLayoutProps extends PropsWithChildren {
  title: string;
}

export function FloorLayout({ title, children }: FloorLayoutProps) {
  const { t } = useTranslations(); // 👈 usar hook de traducción
  const { flash } = usePage<PageProps>().props;

  useEffect(() => {
    if (flash.success) {
      toast.success(flash.success);
    }
    if (flash.error) {
      toast.error(flash.error);
    }
  }, [flash]);

  const floorsTitle = t("ui.navigation.items.floors"); // 👈 traducción para "Pisos"

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: t("ui.navigation.items.dashboard"),
      href: "/dashboard",
    },
    {
      title: floorsTitle,
      href: "/floors",
    },
  ];

  if (title !== floorsTitle) {
    breadcrumbs.push({
      title,
      href: "#",
    });
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={title} />
      {children}
    </AppLayout>
  );
}
