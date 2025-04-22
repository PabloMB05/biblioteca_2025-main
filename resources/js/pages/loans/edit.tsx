import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useTranslations } from '@/hooks/use-translations';
import { LoanLayout } from '@/layouts/loans/LoanLayout';
import { Book, Layers } from 'lucide-react';
import { LoanForm } from './components/LoanForm';
import { usePage } from '@inertiajs/react';

interface LoanFormProps {
    initialData?: {
        id: string;
        user_id: string;
        user: string;
        book_id: string;
        title: string;
        dueDate: Date;
    },
}

export default function EditLoan() {
}