const storage = require('../../storage');
const processAccountParams = require('../../lib/processAccountParams');


function getStats (req, res) {
  const db = storage.getInstance();

  const { statusIn } = processAccountParams(req.query);

  const statusQuery = statusIn.map(status => `status="${status}"`).join(' OR ');

  const accounts = db.objects('Account').sorted('id');
  const accountsFiltered = statusQuery ? accounts.filtered(statusQuery) : accounts;
  
  res.send({ 
    accounts: accountsFiltered.length,
    balance: accountsFiltered.sum('balance'),
  });
};

module.exports = getStats;