const storage = require('../../storage');
const processAccountParams = require('../../lib/processAccountParams');

const STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  FUNDED: 'funded',
  CLOSED: 'closed',
}

function checkAccountNextStatus(account, nextStatus) {
  if (account.status === STATUS.PENDING && (nextStatus === STATUS.APPROVED || nextStatus === STATUS.CLOSED)) {
    return nextStatus;
  }

  if (account.status === STATUS.APPROVED && (nextStatus === STATUS.FUNDED || nextStatus === STATUS.CLOSED)) {
    return nextStatus;
  }

  if (account.status === STATUS.FUNDED && nextStatus === STATUS.CLOSED && account.balance === 0) {
    return nextStatus;
  }

  return false;
}

const VALID_STATUSES = Object.values(STATUS);

function updateAccountStatus (req, res) {
  const db = storage.getInstance();

  const {
    id: rawId,
    nextStatus: rawNextStatus,
  } = req.body;

  const id = rawId ? parseInt(rawId) : null;
  const nextStatus = rawNextStatus && VALID_STATUSES.includes(rawNextStatus) ? rawNextStatus : null;

  if (id === null || nextStatus === null) {
    return res.status(400).send('Wrong params');
  }

  const account = db.objects('Account').filtered('id == $0', id);

  if (account.length !== 1) {
    return res.status(404).send('Account not found');
  }

  const checkedNextStatus = checkAccountNextStatus(account[0], nextStatus);

  if (!checkedNextStatus) {
    return res.status(400).send('Wrong next status');
  }

  db.write(() => {
    account[0].status = checkedNextStatus;
  });

  
  res.send({ account: account[0] });
};

module.exports = updateAccountStatus;