module.exports = {
  post: (req, res) => {
    //이런 식으로 보내준다.
    const cart = [
      {
        menu_id: 5,
        order_quantity: 3,
      },
      {
        menu_id: 3,
        order_quantity: 2,
      },
    ];
    const orderList = req.body.cart;
    const total_price = req.body.total_price;
    // for (let order of orderList) {
    // }
  },
  get: async (req, res) => {},
};
