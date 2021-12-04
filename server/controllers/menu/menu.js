const { menu } = require('../../database/models');

module.exports = {
  post: async (req, res) => {},
  get: async (req, res) => {
    try {
      const { storeid } = req.params;
      const menuList = await menu.findAll({ where: { store_id: storeid } });
      res.status(200).json({ menuList: menuList });
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: '잘못된 요청입니다' });
    }
  },
  delete: data => {},
};
