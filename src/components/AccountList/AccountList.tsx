import React from 'react';
import { Table, Badge } from 'react-bootstrap';

import { AccountList as AccountListType, Account, Status } from 'common';
import ActionButtons from 'components/ActionButtons/ActionButtons';

import styles from './AccountList.module.css';

interface AccountListProps {
  accounts?: AccountListType;
  onStatusChange?: (account: Account) => void;
  onStatusError?: (account: Account) => void;
}

const statusToBadge = {
  [Status.PENDING]: 'secondary',
  [Status.APPROVED]: 'primary',
  [Status.FUNDED]: 'success',
  [Status.CLOSED]: 'dark',
}

const AccountList: React.FC<AccountListProps> = ({ accounts = [], onStatusChange, onStatusError }) => {
  return (
    <section>
      <Table striped hover bordered className={styles.table}>
        <thead>
          <tr>
            <th>#</th>
            <th>Status</th>
            <th>Balance</th>
            <th></th>
          </tr>
        </thead>
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
      </Table>
    </section>
  );
}

export default React.memo(AccountList);
