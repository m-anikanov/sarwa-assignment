import React from 'react';
import { Table, Badge, Button } from 'react-bootstrap';

import { AccountList as AccountListType, Account, statusToBadge } from 'common';
import ActionButtons from 'components/ActionButtons/ActionButtons';
import { GetAccountListResponse } from 'api/accounts';

import styles from './AccountList.module.css';

interface AccountListProps {
  accounts?: AccountListType;
  onStatusChange?: (account: Account) => void;
  onStatusError?: (account: Account) => void;
}

const AccountList: React.FC<AccountListProps> = ({ accounts = [], onStatusChange, onStatusError }) => {
  return (
    <tbody>
      {accounts.map((account) => (
        <tr key={`account-${account.id}`}>
          <td>{account.id}</td>
          <td>
            <Badge 
              className={styles.badge}
              bg={statusToBadge[account.status] || 'light'}
            >
                {account.status}
            </Badge>
          </td>
          <td>{account.balance}</td>
          <td>
            <ActionButtons 
              account={account} 
              onStatusChange={onStatusChange} 
              onStatusError={onStatusError}
            />
          </td>
        </tr>
      ))}
    </tbody>
  );
}

interface AccountPagesProps {
  accountPages: GetAccountListResponse[];
  onStatusChange?: (account: Account) => void;
  onStatusError?: (account: Account) => void;
  onLoadMore?: () => void;
}

const AccountPages: React.FC<AccountPagesProps> = ({ 
  accountPages, 
  onStatusChange, 
  onStatusError, 
  onLoadMore,
}) => {
  return (
    <section className={styles.list}>
      <Table striped hover bordered className={styles.table}>
        <thead>
          <tr>
            <th>#</th>
            <th>Status</th>
            <th>Balance</th>
            <th></th>
          </tr>
        </thead>
        {accountPages.map((page, i) => (
          <AccountList 
            key={i}
            accounts={page.accounts}
            onStatusChange={onStatusChange}
            onStatusError={onStatusError}
          />
        ))}
      </Table>
      {onLoadMore && (
        <section className="d-grid gap-2">
          <Button variant="primary" onClick={onLoadMore} size="lg" >Load more</Button>
        </section>
      )}
    </section>
  )
};

export default React.memo(AccountPages);
