import { useEffect, useState } from 'react';
import { TimeLineSection } from '../users/components/TimeLine';
import { TimeLineLayout } from '@/layouts/timeline/timelinelayout';

interface ProfileProps {
  user: {
    name: string;
    email: string;
  };
  loans: {
    id: number;
    book: {
      title: string;
    };
    expedit: string | null;
    return: string | null;
    due_date: Date;
    end_due: string | null;
    deleted_at?: string | null;
    remaining_days?: number;
    remaining_hours?: number;
    is_overdue?: boolean;
  }[];
  reservations: {
    id: number;
    book: {
      title: string;
    };
    expedit: string | null;
    deleted_at?: string | null;
  }[];
}

export default function UserHistoryTimeline({ user, loans, reservations }: ProfileProps) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  return (
    <div className="space-y-6">
      <TimeLineLayout title={user.name}>
        <div className="ml-3">
          <div className="mb-4">
            <h1 className="text-xl font-semibold">{user.name}</h1>
            <p>{user.email}</p>
          </div>

          <div className="flex flex-wrap gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-1">Desde:</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border rounded px-2 py-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Hasta:</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border rounded px-2 py-1"
              />
            </div>
          </div>
        </div>

        <TimeLineSection
          loans={loans}
          reservations={reservations}
          startDate={startDate}
          endDate={endDate}
        />
      </TimeLineLayout>
    </div>
  );
}
