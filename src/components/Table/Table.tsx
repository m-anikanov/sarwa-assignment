import React from 'react';

import type { AccountList, Account } from 'common';
import ActionButtons from 'components/ActionButtons/ActionButtons';

import styles from './Table.module.css';

interface TableProps {
  accounts?: AccountList;
  onStatusChange?: (account: Account) => void;
  onStatusError?: (account: Account) => void;
}

const Table: React.FC<TableProps> = ({ accounts = [], onStatusChange, onStatusError }) => {
  return (
    <section className={styles.table}>
      <table>
        <tbody>
          {accounts.map((account) => (
            <tr key={`account-${account.id}`}>
              <td>{account.id}</td>
              <td>{account.status}</td>
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
      </table>
    </section>
  );
}

export default React.memo(Table);
