import { useInfiniteQuery } from 'react-query'

import { AccountStatus, AccountList, CommonSearchParams, ApiUrls } from 'common';

export interface AccountListSearchParams extends CommonSearchParams {
  limit?: number;
  offset?: number;
}

export interface GetAccountListResponse {
  accounts: AccountList;
  nextOffset?: number;
}

const fetchAccountList = async (params: AccountListSearchParams = {}) => {
  const searchParams: string[][] = [];

  if (params.limit) {
    searchParams.push(['limit', String(params.limit)]);
  }

  if (params.offset) {
    searchParams.push(['offset', String(params.offset)]);
  }

  if (params.statusIn) {
    searchParams.push(...params.statusIn.map((status: AccountStatus) => (['statusIn', status])));
  }

  const search = new URLSearchParams(searchParams);

  const response = await fetch(`${ApiUrls.ACCOUNTS}?${search}`);

  if (!response.ok) {
    throw new Error('Faild attempt to fetch accounts list')
  }

  return response.json();
}

export const useAccountsList = (params: AccountListSearchParams) => {
  const key = `account-list-${Object.values(params)}`;

  return useInfiniteQuery<GetAccountListResponse>(
    key, 
    ({ pageParam }) => fetchAccountList({...params, offset: pageParam}), 
    { 
      keepPreviousData: true,
      getNextPageParam: (lastPage) => lastPage.nextOffset
    },
  );
}

