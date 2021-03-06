const BaseAdapter = require('./baseAdapter');

module.exports = class UserAdapter extends BaseAdapter {
  constructor() {
    super({
      name: 'User',
      model: 'User',
    });
  }

  async create(payload) {
    const user = await super.create(payload);
    if (user) delete user.dataValues.password;
    return user;
  }

  async getByPk(userID) {
    const user = await super.getByPk(userID);
    if (user) delete user.dataValues.password;
    return user;
  }

  async getOne(filter) {
    const user = await super.getOne(filter);
    if (user) delete user.dataValues.password;
    return user;
  }

  async update(userID, payload) {
    const response = await super.update(userID, payload);
    return response;
  }
};
