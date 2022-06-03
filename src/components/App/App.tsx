import React, { useCallback, useMemo } from 'react';
import { useSearchParams, createSearchParams } from "react-router-dom";
import { Row, Navbar, Container, Nav } from 'react-bootstrap';

import AccountList from 'components/AccountList/AccountList';
import StatusFilter from 'components/StatusFilter/StatusFilter';
import Stats from 'components/Stats/Stats';
import { CommonSearchParams, AccountStatus, Account, Status } from 'common';

import { useAccountsList, AccountListSearchParams } from 'api/accounts';
import { useStats } from 'api/stats';
import logo from './assets/sarwa-logo.svg'

import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './App.module.css';


const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams({});

  const commonParams: CommonSearchParams = useMemo(() => ({
    statusIn: searchParams.getAll('status') as AccountStatus[] || undefined,
  }), [searchParams]);
  const listParams: AccountListSearchParams = useMemo(() => ({
    ...commonParams,
    offset: 5,
    limit: 20,
  }), [commonParams]);

  const { isLoading: isStatsLoading, data: stats, refetch: refetchStats } = useStats(commonParams);
  const { isLoading: isAccountsLoading, data: accounts, refetch: refetchAccounts } = useAccountsList(listParams);

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
  }, [refetchStats, refetchAccounts]);

  const onStatusError = useCallback((account: Account) => {
    console.log(account);
  }, []);

  return (
    <section>
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
          {isAccountsLoading ? (
            <section>Loading</section>
          ) : (
            <AccountList 
              accounts={accounts?.accounts}  
              onStatusChange={onStatusChange} 
              onStatusError={onStatusError}
            />
          )}
        </Row>
      </Container>
    </section>
  );
}

export default React.memo(App);
