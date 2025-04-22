import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "../../lib/axios";

export interface Loan {
  id: string;
  book_id: string;
  user_email: string;
  book_title: string;
  user_id: string;
  is_late: boolean;
  is_active: boolean;
  created_at: string;
  return_date: string;
  due_date: string;
}

// Interface representing the actual API response structure
export interface ApiPaginatedResponse<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Array<{
    url: string | null;
    label: string;
    active: boolean;
  }>;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

// Interface representing the expected format for the Table component
export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
  };
}

interface UseLoanParams {
  search?: any[];
  page?: number;
  perPage?: number;
}

export function useLoans({ search, page = 1, perPage = 10 }: UseLoanParams = {}) {
    console.log(search);
  return useQuery({
    queryKey: ["loans", { search, page, perPage }],
    queryFn: async () => {
      const { data: apiResponse } = await axios.get<ApiPaginatedResponse<Loan>>("/api/loans", {
        params: {
          search,
          page,
          per_page: perPage,
        },
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        }
      });

      // Transform the API response to the expected format
      return {
        data: apiResponse.data,
        meta: {
          current_page: apiResponse.current_page,
          from: apiResponse.from,
          last_page: apiResponse.last_page,
          per_page: apiResponse.per_page,
          to: apiResponse.to,
          total: apiResponse.total
        }
      } as PaginatedResponse<Loan>;
    },
  });
}


export function useUpdateLoan(loanId: string) {
  return useMutation({
    mutationFn: async (data: { id:string, book_id:string, user_id:string, is_overdue:boolean, is_active:boolean, created_at:string, returned_at:string, due_date:string }) => {
      const response = await axios.put(`/api/loans/${loanId}`, data, {
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        }
      });
      return response.data;
    },
  });
}
export function useReturnLoan() {
  return useMutation({
    mutationFn: async (loanId: string) => {
      const response = await axios.put(`/api/loans/${loanId}/return`, {}, {
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        }
      });
      return response.data;
    },
  });
}

export function useDeleteLoan() {
  return useMutation({
    mutationFn: async (loanId: string) => {
      await axios.delete(`/api/loans/${loanId}`, {
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        }
      });
    },
  });
}