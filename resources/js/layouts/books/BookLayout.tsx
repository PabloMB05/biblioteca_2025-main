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

interface BookLayout extends PropsWithChildren {
    title: string;
}

export function BookLayout({ title, children }: BookLayout) {
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

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: 'Libros',
            href: '/books',
        },
    ];

    if (title !== t('ui.books.title')) {
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