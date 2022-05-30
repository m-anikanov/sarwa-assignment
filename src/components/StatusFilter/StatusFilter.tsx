import React, { useCallback } from 'react';

import { Status, AccountStatus } from 'common';

import styles from './StatusFilter.module.css';

interface StatusFilterProps {
  value?: AccountStatus[];
  onChange: (value: AccountStatus[]) => void;
}

const statuses = Object.values(Status) as AccountStatus[];

const StatusFilter: React.FC<StatusFilterProps> = ({ value, onChange }) => {
  const onValueChange = useCallback((e: React.FormEvent<HTMLSelectElement>) => {
    const selectNode = e.target as HTMLSelectElement;
    const nextValue = Array.from(selectNode.options).reduce<AccountStatus[]>((acc, optNode) => {
      if (optNode.selected) {
        acc.push(optNode.value as AccountStatus);
      }
      return acc;
    }, []);
    
    onChange(nextValue);
  }, [onChange]);

  return (
    <section className={styles.statusFilter}>
      <select onChange={onValueChange} value={value} multiple>
        {statuses.map((status, i) => (
          <option value={status} key={i}>{status}</option>
        ))}
      </select>
    </section>
  );
}

export default React.memo(StatusFilter);

