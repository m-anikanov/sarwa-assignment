const express = require('express');
const getAccountList = require('./api/getAccountList');
const updateAccountStatus = require('./api/updateAccountStatus');
const getStats = require('./api/getStats');

const router = express.Router();

router.get('/api/accounts', getAccountList);
router.get('/api/stats', getStats);
router.put('/api/updateStatus', updateAccountStatus);

module.exports = router;
