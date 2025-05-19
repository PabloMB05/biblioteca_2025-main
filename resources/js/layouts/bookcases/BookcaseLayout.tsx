import { useTranslations } from '@/hooks/use-translations';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { PropsWithChildren, useEffect } from 'react';
import { toast } from 'sonner';

interface FlashMessages {
    success?: string;
    error?: string;
}

interface PageProps {
    flash: FlashMessages;
    [key: string]: unknown;
}

interface BookcaseLayoutProps extends PropsWithChildren {
    title: string;
}

export function BookcaseLayout({ title, children }: BookcaseLayoutProps) {
    const { t } = useTranslations();
    const { flash } = usePage<PageProps>().props;

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }
        if (flash.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    const dashboardTitle = t('ui.navigation.items.dashboard');
    const bookcasesTitle = t('ui.navigation.items.bookcases');

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: dashboardTitle,
            href: '/dashboard',
        },
        {
            title: bookcasesTitle,
            href: '/bookcases',
        },
    ];

    if (title !== bookcasesTitle) {
        breadcrumbs.push({
            title,
            href: '#',
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />
            {children}
        </AppLayout>
    );
}
