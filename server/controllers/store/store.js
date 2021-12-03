const { store } = require('../../database/models');

module.exports = {
  post: data => {},
  getOne: async (req, res) => {
    try {
      const { storeid } = req.params;
      const storeInfo = await store.findOne({ where: { id: storeid } });
      res.status(200).json({ storeInfo: storeInfo });
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: '잘못된 요청입니다' });
    }
  },
  getStoreList: data => {},
  // storeList 어떻게 보내줄지?
  put: data => {},
  delete: data => {},
};
