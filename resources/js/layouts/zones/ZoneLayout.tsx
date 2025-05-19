import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import { PropsWithChildren, useEffect } from "react";
import { toast } from "sonner";
import { useTranslations } from "@/hooks/use-translations"; // Asegúrate que exista

interface FlashMessages {
  success?: string;
  error?: string;
}

interface PageProps {
  flash: FlashMessages;
  [key: string]: unknown;
}

interface ZoneLayoutProps extends PropsWithChildren {
  title: string;
}

export function ZoneLayout({ title, children }: ZoneLayoutProps) {
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

  const zonesTitle = t("ui.navigation.items.zones"); // 👈 traducción para "Zonas"

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: t("ui.navigation.items.dashboard"),
      href: "/dashboard",
    },
    {
      title: zonesTitle,
      href: "/zones",
    },
  ];

  if (title !== zonesTitle) {
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
