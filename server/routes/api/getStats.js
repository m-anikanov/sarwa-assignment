const storage = require('../../storage');
const processAccountParams = require('../../lib/processAccountParams');


function getStats (req, res) {
  const db = storage.getInstance();

  const { statusIn } = processAccountParams(req.query);

  const statusQuery = statusIn.map(status => `status="${status}"`).join(' OR ');

  const accounts = db.objects('Account').sorted('id');
  const accountsFiltered = statusQuery ? accounts.filtered(statusQuery) : accounts;
  
  const accountsByStatus = {};

  accounts.forEach((acc) => {
    if (accountsByStatus[acc.status]) {
      accountsByStatus[acc.status]++;
    } else {
      accountsByStatus[acc.status] = 1;
    }
  });

  res.send({
    totalAccounts: accounts.length,
    totalBalance: accounts.sum('balance'),
    accountsByStatus,
    filtered: {
      accounts: accountsFiltered.length,
      balance: accountsFiltered.sum('balance'),
    }
  });
};

module.exports = getStats;