// module.exports = {
//   up: async (queryInterface, Sequelize) => {
//     await queryInterface.bulkInsert(
//       'cart',
//       [
//         {
//           id: 1,
//           merchant_uid: '12354',
//           total_price: '123456',
//           //user_id있으면 email이랑 name은 fk로 연결?
//           buyer_email: 'e@gmail.com',
//           buyer_name: 'myname',
//           buyer_tel: '01044445676',
//           buyer_id: 1,
//           created_at: new Date(),
//           updated_at: new Date(),
//         },
//       ],
//       {}
//     );
//   },

//   down: async (queryInterface, Sequelize) => {
//     await queryInterface.bulkDelete('cart', null, {});
//   },
// };
