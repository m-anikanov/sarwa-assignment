import { useMutation, UseMutationOptions } from 'react-query'
import { AccountStatus, ApiUrls, Account, Status } from 'common';

export interface UpdateStatusParams {
  nextStatus: AccountStatus;
  id: number;
}

export interface UpdateStatusResponse {
  account: Account;
}

const updateStatus = async ({ nextStatus, id }: UpdateStatusParams) => {
  const params = JSON.stringify({
    nextStatus,
    id: String(id),
  });

  const response = await fetch(ApiUrls.UPDATE_STATUS, {
    method: 'PUT',
    body: params,
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (!response.ok) {
    throw new Error('Faild attempt to update status')
  }

  return response.json();
}

interface SetStatusParams {
  id: number;
}

interface UpdateStatusOptions {
  onSuccess: () => void;
  onError: () => void;
}

export const useUpdateStatus = ({ id }: SetStatusParams, options?: UpdateStatusOptions) => {
  return useMutation(
    (nextStatus: AccountStatus) => updateStatus({
      id,
      nextStatus,
    }),
    options,
  );
}
