import React, { useCallback, useMemo } from 'react';
import { useSearchParams, createSearchParams } from "react-router-dom";
import { Row, Navbar, Container, Nav } from 'react-bootstrap';

import AccountList from 'components/AccountList/AccountList';
import StatusFilter from 'components/StatusFilter/StatusFilter';
import Stats from 'components/Stats/Stats';
import Toaster from 'components/Toaster/Toaster';
import { useToastsState } from 'hooks/useToastsState';
import { CommonSearchParams, AccountStatus, Account, Status, createToast } from 'common';
import { useAccountsList, AccountListSearchParams } from 'api/accounts';
import { useStats } from 'api/stats';
import logo from './assets/sarwa-logo.svg'

import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './App.module.css';


const App: React.FC = () => {
  const [toasts, pushToast] = useToastsState();
  const [searchParams, setSearchParams] = useSearchParams({});

  const commonParams: CommonSearchParams = useMemo(() => ({
    statusIn: searchParams.getAll('status') as AccountStatus[] || undefined,
  }), [searchParams]);
  const listParams: AccountListSearchParams = useMemo(() => ({
    ...commonParams,
    limit: 20,
  }), [commonParams]);

  const { data: stats, refetch: refetchStats } = useStats(commonParams);
  const { 
    data: accounts, 
    refetch: refetchAccounts, 
    fetchNextPage, 
    hasNextPage,
  } = useAccountsList(listParams);

  const statusOptions = useMemo(() => Object.values(Status).map((status) => {
    const accountsCount = stats?.accountsByStatus?.[status];

    return {
      value: status,
      text: accountsCount ? `${status} (${accountsCount})`: status,
    };
  }), [stats]);

  const onStatusFilterChange = useCallback((nextValue: AccountStatus[]) => {
    const nextParams = createSearchParams({ status: nextValue });
    setSearchParams(nextParams);
  }, []);

  const onStatusChange = useCallback((account: Account) => {
    refetchStats();
    refetchAccounts();
    pushToast(createToast(account, true));
  }, [refetchStats, refetchAccounts, pushToast]);

  const onStatusError = useCallback((account: Account) => {
    pushToast(createToast(account, false));
  }, [pushToast]);

  return (
    <section className={styles.app}>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">
            <img
              src={logo}
              width="126"
              height="33"
              alt="Sarwa logo"
            />
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Accounts</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container>
        <section className={styles.filters}>
          <StatusFilter 
            value={commonParams.statusIn} 
            onChange={onStatusFilterChange}
            options={statusOptions}
          />
          <Stats data={stats} />
        </section>
        <Row>
          {accounts && (
            <AccountList 
              accountPages={accounts.pages}  
              onStatusChange={onStatusChange} 
              onStatusError={onStatusError}
              onLoadMore={hasNextPage ? fetchNextPage : undefined}
            />
          )}
        </Row>
      </Container>
      <Toaster toasts={toasts} />
    </section>
  );
}

export default React.memo(App);
