import React, { ReactNode, useMemo } from 'react';
import { Button } from 'react-bootstrap';

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
      onSuccess: (response) => onStatusChange?.(response.account),
      onError: () => onStatusError?.(account),
    }
  );

  const buttons: Partial<Record<AccountStatus, ReactNode>> = useMemo(() => ({
    [Status.APPROVED]: (
      <Button variant="primary" size="sm" onClick={() => updateStatus(Status.APPROVED)}>
        Approve
      </Button>
    ),
    [Status.FUNDED]: (
      <Button variant="success" size="sm" onClick={() => updateStatus(Status.FUNDED)}>
        Fund
      </Button>
    ),
    [Status.CLOSED]: (
      <Button variant="dark" size="sm" onClick={() => updateStatus(Status.CLOSED)}>
        Close
      </Button>
    ),
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

