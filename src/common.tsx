import React from 'react';
import { Badge } from 'react-bootstrap';

export enum ApiUrls {
  STATS = '/api/stats',
  ACCOUNTS = '/api/accounts',
  UPDATE_STATUS = '/api/updateStatus'
}

export enum Status {
  PENDING = 'pending',
  APPROVED = 'approved',
  FUNDED = 'funded',
  CLOSED = 'closed',
}

export type AccountStatus = Status.PENDING | Status.APPROVED | Status.CLOSED | Status.FUNDED;

export interface Account {
  status: AccountStatus;
  balance: number;
  id: number;
}

export interface CommonSearchParams {
  statusIn?: AccountStatus[]; 
}

export type AccountList = Account[];

export const getAccountActions = (account: Account) => {
  if (account.status === Status.PENDING) {
    return [Status.APPROVED, Status.CLOSED];
  }

  if (account.status === Status.APPROVED) {
    return [Status.FUNDED, Status.CLOSED];
  }

  if (account.status === Status.FUNDED && account.balance === 0) {
    return [Status.CLOSED];
  }

  return [];
}

export const statusToBadge = {
  [Status.PENDING]: 'secondary',
  [Status.APPROVED]: 'primary',
  [Status.FUNDED]: 'success',
  [Status.CLOSED]: 'dark',
}

export const createToast = (account: Account, isSuccess: boolean): React.ReactNode => {
  if (isSuccess) {
    return (
      <>
        Account <b>#{account.id}</b> status changed to
        {' '}             
        <Badge bg={statusToBadge[account.status]}
        >
          {account.status.toUpperCase()}
        </Badge>
      </>
    );
  } else {
    return (
      <>
        Failed to update account <b>#{account.id}</b> status
      </>
    );
  }
}