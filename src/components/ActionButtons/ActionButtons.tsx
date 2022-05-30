import React, { ReactNode, useMemo } from 'react';

import { Account, getAccountActions, Status, AccountStatus } from 'common';
import { useUpdateStatus } from 'api/status';

import styles from './ActionButtons.module.css';

interface ActionButtonsProps {
  account: Account;
  onStatusChange?: (account: Account) => void;
  onStatusError?: (account: Account) => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ account, onStatusChange, onStatusError }) => {
  const actions = useMemo(() => getAccountActions(account), [account]);
  
  const { mutate: updateStatus } = useUpdateStatus(
    { id: account.id },
    {
      onSuccess: () => onStatusChange?.(account),
      onError: () => onStatusError?.(account),
    }
  );

  const buttons: Partial<Record<AccountStatus, ReactNode>> = useMemo(() => ({
    [Status.APPROVED]: <button onClick={() => updateStatus(Status.APPROVED)}>Approve</button>,
    [Status.FUNDED]: <button onClick={() => updateStatus(Status.FUNDED)}>Fund</button>,
    [Status.CLOSED]: <button onClick={() => updateStatus(Status.CLOSED)}>Close</button>,
  }), []);

  return (
    <section className={styles.actionButtons}>
      {actions.map((nextStatus: Status) => (
        <React.Fragment key={nextStatus}>
          {buttons?.[nextStatus] || null}
        </React.Fragment>
      ))}
    </section>
  );
}

export default React.memo(ActionButtons);

