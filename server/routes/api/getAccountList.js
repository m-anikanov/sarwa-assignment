const storage = require('../../storage');
const processAccountParams = require('../../lib/processAccountParams');

const serializeAccountList = (accounts) => accounts.map(({status, balance, id}) => ({
  status, 
  balance,
  id,
}));

function getAccountList (req, res) {
  const db = storage.getInstance();

  const { limit, offset, statusIn } = processAccountParams(req.query);

  const statusQuery = statusIn.map(status => `status="${status}"`).join(' OR ');

  const accounts = db.objects('Account').sorted('id');
  const accountsFiltered = statusQuery ? accounts.filtered(statusQuery) : accounts;
  const accountsPage = accountsFiltered.slice(parseInt(offset, 10), offset + limit);
  
  res.send({ 
    accounts: serializeAccountList(accountsPage),
  });
};

module.exports = getAccountList;