const Realm = require('realm');

const data = require('../../__mock__.json');

const AccountSchema = {
  name: 'Account',
  properties: {
    id: 'int',
    balance: 'int',
    status: 'string',
  },
  primaryKey: 'id',
};

class Storage {
  realm = null;

  async init() {
    this.realm = await Realm.open({
      inMemory: true,
      path: 'realm-db',
      schema: [AccountSchema],
    });

    this.realm.write(() => {
      data.forEach(({status, balance}, i) => {
        this.realm.create('Account', { id: i, balance, status });
      });
    });
  }

  getInstance() {
    return this.realm;
  }
}

module.exports = new Storage();

