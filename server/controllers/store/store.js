const { store } = require('../../database/models');

module.exports = {
  post: data => {},
  getOne: async (req, res) => {
    try {
      const { storeid } = req.params;
      const storeInfo = await store.findOne({ where: { id: storeid } });
      res.status(200).json({ storeInfo: storeInfo });
    } catch (err) {
      res.status(400).json({ message: '잘못된 요청입니다' });
    }
  },
  getStoreList: async (req, res) => {
    try {
      const storeList = await store.findAll();
      res.status(200).json({ storeList: storeList });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  put: data => {},
  delete: data => {},
};
