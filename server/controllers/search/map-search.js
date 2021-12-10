const { store } = require('../../database/models');
const sequelize = require('sequelize');
const Op = sequelize.Op;

module.exports = async (req, res) => {
  try {
    let keyword = req.query.keyword;
    keyword = keyword.trim();

    const searchResult = await store
      .findAll({
        where: {
          [Op.or]: [
            {
              store_name: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              store_address: {
                [Op.like]: `%${keyword}%`,
              },
            },
          ],
        },
        order: [['store_name', 'ASC']],
      })
      .catch(err => console.log(err));

    res.status(200).json({ searchResult });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
