'use client';

import {
  Book,
  Trash2,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { cn } from '@/lib/utils';
import { useTranslations } from '@/hooks/use-translations';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

interface TimeLineSectionProps {
  loans: Loan[];
  reservations: Reservation[];
  startDate?: string;
  endDate?: string;
}

type Loan = {
  id: number;
  book: { title: string };
  expedit: string | null;
  return: string | null;
  due_date: Date;
  end_due: string | null;
  deleted_at?: string | null;
  remaining_days?: number;
  remaining_hours?: number;
  is_overdue?: boolean;
};

type Reservation = {
  id: number;
  book: { title: string };
  expedit: string | null;
  deleted_at?: string | null;
};

type CombinedItem = (Loan | Reservation) & { type: 'loan' | 'reservation' };

function EmptyTimelineMessage({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="text-center py-12">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
        {icon}
      </div>
      <h3 className="mt-2 text-sm font-medium text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
    </div>
  );
}

function RecordDot({ item }: { item: CombinedItem }) {
  const isLoan = item.type === 'loan';
  const color =
    item.deleted_at
      ? 'grey'
      : isLoan
        ? (item as Loan).return
          ? 'primary'
          : (item as Loan).is_overdue
            ? 'error'
            : 'success'
        : 'primary';

  const variant = item.deleted_at ? 'outlined' : 'filled';

  return <TimelineDot color={color as any} variant={variant} className="!shadow-sm" />;
}

function RecordCard({
  item,
  t,
}: {
  item: CombinedItem;
  t: ReturnType<typeof useTranslations>['t'];
}) {
  const isLoan = item.type === 'loan';

  return (
    <div
      className={cn(
        'rounded-lg border p-4 transition-all hover:shadow-sm',
        item.deleted_at
          ? 'border-gray-200 bg-gray-50'
          : isLoan
            ? (item as Loan).is_overdue
              ? 'border-red-100 bg-red-50'
              : 'border-blue-100 bg-blue-50'
            : 'border-purple-100 bg-purple-50'
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <Book className="mt-0.5 h-5 w-5 flex-shrink-0 text-current" />
          <div>
            <h3 className="text-sm font-medium leading-tight text-gray-900 sm:text-base">
              {item.book.title}
            </h3>
            <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600 sm:text-sm">
              <div className="flex items-center">
                <Calendar className="mr-1 h-3 w-3" />
                <span>
                  {isLoan ? 'Exp' : t('ui.records.info.reserv')}: {item.expedit ?? 'N/A'}
                </span>
              </div>
              {isLoan && (
                <div className="flex items-center">
                  <Clock className="mr-1 h-3 w-3" />
                  <span>Dev: {(item as Loan).return ?? 'Pendiente'}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        {item.deleted_at && <Trash2 className="h-4 w-4 text-gray-400" />}
      </div>

      {isLoan && (() => {
        const loan = item as Loan;
        return (
          <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
            <div className="text-xs text-gray-600 sm:text-sm">
              <span className="font-medium">{t('ui.records.info.duration')}:</span>{' '}
              {loan.end_due ?? '—'}
            </div>
            {typeof loan.remaining_days !== 'undefined' && (
              <div
                className={cn(
                  'flex items-center text-xs sm:text-sm',
                  loan.is_overdue ? 'text-red-600' : 'text-green-600'
                )}
              >
                {loan.is_overdue ? (
                  <>
                    <AlertTriangle className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                    <span>
                      {t('ui.records.info.defeated_ago')} {Math.abs(loan.remaining_days)}{' '}
                      {t('ui.records.info.days')}
                    </span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                    <span>
                      {t('ui.records.info.left')} {Math.abs(loan.remaining_days)}{' '}
                      {t('ui.records.info.days')}
                    </span>
                  </>
                )}
              </div>
            )}
          </div>
        );
      })()}

      {item.deleted_at && (
        <div className="mt-2 flex items-center text-xs text-red-500 sm:text-sm">
          <Trash2 className="mr-1 h-3 w-3" />
          {item.type === 'loan'
            ? t('ui.records.loan.delete')
            : t('ui.records.info.canceled_reserv')}
        </div>
      )}
    </div>
  );
}

function RecordTimeline({
  items,
  t,
}: {
  items: CombinedItem[];
  t: ReturnType<typeof useTranslations>['t'];
}) {
  return (
    <Timeline position="alternate" className="p-4 sm:p-6">
      {items.map((item, index) => (
        <TimelineItem key={`${item.type}-${item.id}`}>
          <TimelineSeparator>
            <RecordDot item={item} />
            {index !== items.length - 1 && <TimelineConnector className="bg-gray-200" />}
          </TimelineSeparator>
          <TimelineContent className="py-4 pl-2 pr-0 sm:pl-4">
            <RecordCard item={item} t={t} />
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}

export function TimeLineSection({
  loans,
  reservations,
  startDate,
  endDate,
}: TimeLineSectionProps) {
  const { t } = useTranslations();

  const filterByDateRange = <T extends { expedit: string | null }>(items: T[]) => {
    if (!startDate && !endDate) return items;

    const start = startDate ? new Date(`${startDate}T00:00:00`) : null;
    const end = endDate ? new Date(`${endDate}T23:59:59`) : null;

    return items.filter((item) => {
      if (!item.expedit) return false;
      const expDate = new Date(item.expedit);
      return (!start || expDate >= start) && (!end || expDate <= end);
    });
  };

  const filteredLoans: CombinedItem[] = filterByDateRange(loans).map((l) => ({
    ...l,
    type: 'loan' as const,
  }));

  const filteredReservations: CombinedItem[] = filterByDateRange(reservations).map((r) => ({
    ...r,
    type: 'reservation' as const,
  }));

  const combined: CombinedItem[] = [...filteredLoans, ...filteredReservations].sort((a, b) => {
    const dateA = new Date(a.expedit ?? 0).getTime();
    const dateB = new Date(b.expedit ?? 0).getTime();
    return dateB - dateA;
  });

  return (
    <Tabs defaultValue="loans" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="loans">{t('ui.loans.title')}</TabsTrigger>
        <TabsTrigger value="reservations">{t('ui.reservations.title')}</TabsTrigger>
        <TabsTrigger value="all">{t('ui.records.timeline.all')}</TabsTrigger>
      </TabsList>

      <TabsContent value="loans" className="space-y-4">
        {filteredLoans.length === 0 ? (
          <EmptyTimelineMessage
            icon={<Book className="h-6 w-6 text-gray-500" />}
            title={t('ui.records.loan.none')}
            subtitle={t('ui.records.loan.info')}
          />
        ) : (
          <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
            <RecordTimeline items={filteredLoans} t={t} />
          </div>
        )}
      </TabsContent>

      <TabsContent value="reservations" className="space-y-4">
        {filteredReservations.length === 0 ? (
          <EmptyTimelineMessage
            icon={<Book className="h-6 w-6 text-gray-500" />}
            title={t('ui.records.reservation.none')}
            subtitle={t('ui.records.reservation.info')}
          />
        ) : (
          <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
            <RecordTimeline items={filteredReservations} t={t} />
          </div>
        )}
      </TabsContent>

      <TabsContent value="all" className="space-y-4">
        {combined.length === 0 ? (
          <EmptyTimelineMessage
            icon={<Book className="h-6 w-6 text-gray-500" />}
            title={t('ui.records.timeline.none')}
            subtitle={t('ui.records.timeline.info')}
          />
        ) : (
          <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
            <RecordTimeline items={combined} t={t} />
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}
