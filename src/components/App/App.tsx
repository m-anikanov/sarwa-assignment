import React, { useCallback, useMemo } from 'react';
import { useSearchParams, createSearchParams } from "react-router-dom";

import Table from 'components/Table/Table';
import StatusFilter from 'components/StatusFilter/StatusFilter';
import { CommonSearchParams, AccountStatus, Account } from 'common';

import { useAccountsList, AccountListSearchParams } from 'api/accounts';
import { useStats } from 'api/stats';

import styles from './App.module.css';

const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams({});

  const commonParams: CommonSearchParams = useMemo(() => ({
    statusIn: searchParams.getAll('status') as AccountStatus[] || undefined,
  }), [searchParams]);
  const listParams: AccountListSearchParams = useMemo(() => ({
    ...commonParams,
    offset: 5,
    limit: 10,
  }), [commonParams]);

  const { isLoading: isStatsLoading, data: stats, refetch: refetchStats } = useStats(commonParams);
  const { isLoading: isAccountsLoading, data: accounts, refetch: refetchAccounts } = useAccountsList(listParams);

  const onStatusFilterChange = useCallback((nextValue: AccountStatus[]) => {
    const nextParams = createSearchParams({ status: nextValue });
    setSearchParams(nextParams);
  }, []);

  const onStatusChange = useCallback((account: Account) => {
    refetchStats();
    refetchAccounts();
  }, [refetchStats, refetchAccounts]);

  const onStatusError = useCallback((account: Account) => {
    console.log(account);
  }, []);

  return (
    <section className={styles.app}>
      Sarwa
      <StatusFilter value={commonParams.statusIn} onChange={onStatusFilterChange}/>
      {stats && (
        <section>
          <section>{stats?.balance}</section>
          <section>{stats?.accounts}</section>
        </section>
      )}
      {isAccountsLoading ? (
        <section>Loading</section>
      ) : (
        <Table 
          accounts={accounts?.accounts}  
          onStatusChange={onStatusChange} 
          onStatusError={onStatusError}
        />
      )}
    </section>
  );
}

export default React.memo(App);
