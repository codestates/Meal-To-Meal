module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'store_review',
      [
        {
          id: 1,
          review_content: '사장님이 맛있고 음식이 미쳤어요',
          store_id: 1,
          reviewer_id: 3,
          review_image: '../../images',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          review_content: '여기에 제 뼈를 묻겠습니다',
          store_id: 1,
          reviewer_id: 1,
          review_image: '../../images',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 3,
          review_content: '알콜의 중심에서 세상을 외치다',
          store_id: 2,
          reviewer_id: 4,
          review_image: '../../images',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 4,
          review_content: '기부해주셔서 감사합니다',
          store_id: 2,
          reviewer_id: 5,
          review_image: '../../images',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 5,
          review_content: '쌀국수 쌀국수 너무나 맛있어 너와 같이 먹으면 더 맛있어... 오늘도 역시 쌀국수',
          store_id: 6,
          reviewer_id: 4,
          review_image: '../../images',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('store_review', null, {});
  },
};
