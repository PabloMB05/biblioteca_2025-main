import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useTranslations } from '@/hooks/use-translations';
import { LoanLayout } from '@/layouts/loans/LoanLayout';
import { LoanForm } from './components/LoanForm';

export default function CreateLoan() {
    const { t } = useTranslations();

    return (
        <LoanLayout title={t('ui.loans.create')}>
            <div className="flex justify-center w-full">
                <Card className="w-full max-w-4xl m-4 p-4 shadow-lg dark:shadow-xs dark:shadow-white">
                    <CardHeader>
                        <CardTitle>
                            <div className="flex items-center gap-2">
                                {t('ui.loans.cards.create.title')}
                            </div>
                        </CardTitle>
                        <CardDescription>{t('ui.loans.cards.create.description')}</CardDescription>
                    </CardHeader>
                    <Separator />
                    <CardContent>
                        <LoanForm />
                    </CardContent>
                </Card>
            </div>
        </LoanLayout>
    );
}
