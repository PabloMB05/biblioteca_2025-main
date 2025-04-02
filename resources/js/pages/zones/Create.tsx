import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useTranslations } from '@/hooks/use-translations';
import { PageProps } from '@inertiajs/core';
import { usePage } from '@inertiajs/react';
import { PlusIcon } from 'lucide-react';
import { useState } from 'react';
import { ZoneForm } from './components/ZoneForm';
import { ZoneLayout } from '@/layouts/zones/ZoneLayout';

interface Floor {
    id: number;
    story: string;
    capacity: number;
    count: number;
}

interface IndexFloorProps extends PageProps {
    floors: Floor[];
}

export default function FloorsIndex({ floors}: IndexFloorProps) {
    const { t } = useTranslations();
    const { url } = usePage();

    return (
        <ZoneLayout title={t('ui.floors.title')}>
        </ZoneLayout>
    );
}