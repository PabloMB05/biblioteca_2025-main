import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useTranslations } from '@/hooks/use-translations';
import { LoanLayout } from '@/layouts/loans/LoanLayout';
import { Book, Layers } from 'lucide-react';
import { LoanForm } from './components/LoanForm';
import { usePage } from '@inertiajs/react';

interface LoanFormProps {
    loan?: {
        id: string;
        book_id: string;
        user_id: string;
        is_overdue: boolean;
        is_active: boolean;
        hours_between: number;
        hoursDue_between: number;
        created_at: string;
        returned_at: string;
        due_date: string;
    },
    usermail: string;
    bookUUID: string;
    emailList: string[];
    ddate: string;
    lang: string;
}

export default function CreateLoan({loan, lang, usermail, bookUUID, ddate, emailList}:LoanFormProps) {
    const { t } = useTranslations();

    const paramsString = window.location.search;
    const searchParams = new URLSearchParams(paramsString);
    const book_id = searchParams.get("bookID") || bookUUID;

    return (
        <LoanLayout title={t('ui.loans.edit')}>
            <div className="flex max-w-screen items-center self-center">
                <Card className="w-100% m-4 p-4 shadow-lg dark:shadow-xs dark:shadow-white">
                    <CardHeader>
                        <CardTitle>
                            <div className="flex items-center gap-1">
                                <Layers color="#2762c2" />
                                {t('ui.loans.cards.edit.title')}
                            </div>
                        </CardTitle>
                        <CardDescription>{t('ui.loans.cards.edit.description')}</CardDescription>
                    </CardHeader>
                    <Separator />
                    <CardContent>
                        <LoanForm emailList={emailList} ddate={ddate} initialData={loan} usermail={usermail} bookIDButton={book_id} lang={lang}/>
                    </CardContent>
                </Card>
            </div>
        </LoanLayout>
    );
}