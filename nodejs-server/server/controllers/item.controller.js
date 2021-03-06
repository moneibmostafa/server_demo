const BaseController = require('./baseController');
const { ItemValidator } = require('../validators');
const { ItemAdapter } = require('../adapters/database');

class ItemController extends BaseController {
  constructor() {
    super({
      adapter: new ItemAdapter(),
      validator: new ItemValidator(),
      primaryKey: 'id',
      name: 'item',
    });
  }

  formatPayload(body) {
    const payload = { ...body };
    if (payload.availabilityCount !== undefined)
      payload.available = payload.availabilityCount > 0;
    if (payload.price) payload.price = payload.price.toFixed(2);
    return payload;
  }

  async createItem(body) {
    try {
      const payload = this.formatPayload(body);
      const item = await super.create(payload);
      return item;
    } catch (error) {
      return super.handleError(error);
    }
  }

  async updateItem(itemID, body) {
    try {
      const item = await super.getByPk(itemID);
      const payload = this.formatPayload(body);
      const response = await super.update(item.id, payload);
      return response;
    } catch (error) {
      return super.handleError(error);
    }
  }
}

const itemController = new ItemController();
Object.freeze(itemController);

module.exports = itemController;
