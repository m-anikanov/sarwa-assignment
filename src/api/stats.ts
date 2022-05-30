import { useQuery } from 'react-query'
import { AccountStatus, CommonSearchParams, ApiUrls } from 'common';

export interface StatsSearchParams extends CommonSearchParams {}

export interface GetStatsResponse {
  accounts: number;
  balance: number;
}

const fetchStats = async (params: StatsSearchParams = {}) => {
  const searchParams: string[][] = [];

  if (params.statusIn) {
    searchParams.push(...params.statusIn.map((status: AccountStatus) => (['statusIn', status])));
  }

  const search = new URLSearchParams(searchParams);

  const response = await fetch(`${ApiUrls.STATS}?${search}`);

  if (!response.ok) {
    throw new Error('Faild attempt to fetch stats')
  }

  return response.json();
}

export const useStats = (params: StatsSearchParams) => {
  const key = `stats-${Object.values(params)}`;

  return useQuery<GetStatsResponse>(key, () => fetchStats(params));
}