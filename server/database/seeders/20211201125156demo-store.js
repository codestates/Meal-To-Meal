module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'store',
      [
        {
          id: 1,
          user_id: 1,
          store_name: '9와 3/4번지 피자',
          store_image: 'client/src/img/dummy/원조할매국밥.png',
          store_order_quantity: '21',
          store_description:
            '남산 공원 근처에 위치한 이탈리안 피자집입니다. 나폴리 스타일의 화덕피자를 굽는 집으로 매장에 오시면 화덕을 직접 구경하실 수 있습니다. 대표메뉴로는 불고기 피자와 베지터리언 손님분들이 식사 가능한 베지터블 피자가 있습니다',
          store_address: '서울특별시 용산구 용산2가동 남산공원길 105 7층',
          store_category: '양식',
          store_lat: 37.550976488284654,
          store_lng: 126.99095582962613,
          business_hour: '11:00 ~ 23:00',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          user_id: 2,
          store_name: '샐러디',
          store_image: 'client/src/img/dummy/store1.png',
          store_order_quantity: '7',
          store_description:
            '강북에 8개의 매장을 갖추고 있는 샐러드 체인점입니다. 가장 유명한 메뉴는 아보카도 샐러드 입니다. 아보카도가 큼직하게 올라갔고, 병아리 콩과 각종 채소, 퀴노아까지 들어가있어 다이어트를 하셔서 식단 조절을 하셔야 하는 분들도 긴 포만감을 느끼실 수 있을겁니다',
          store_address: '서울특별시 마포구 합정동 396-14',
          store_category: '양식',
          store_lat: 37.543709,
          store_lng: 126.904409,
          business_hour: '11:30 ~ 22:00',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 3,
          user_id: 1,
          store_name: '한잔할래',
          store_image: 'client/src/img/dummy/store2.png',
          store_order_quantity: '10',
          store_description:
            '소주 한잔과 함께할 수 있는 음식을 팔고 있는 한잔할래 입니다. 골뱅이 비빔면, 감자탕 등 안주용으로 먹을 수 있는 다양한 음식들이 준비되어 있으니 친구 분들과 함께 방문하셔서 즐겨보세요~',
          store_address: '서울특별시 종로구 사직동 효자로 37',
          store_category: '한식',
          store_lat: 37.577698,
          store_lng: 126.976881,
          business_hour: '10:00 ~ 23:00',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 4,
          user_id: 3,
          store_name: '떡볶이 묵을래?',
          store_image: 'client/src/img/dummy/store4.png',
          store_order_quantity: '17',
          store_description:
            '가성비 갑!!!! 코드여고 앞에서 20년간 자리를 지켜온 식당입니다.저렴한 가격에 김밥과 비빔밥 등 간단한 음식들을 즐길 수 있습니다. 대표 메뉴로는 매운 불닭 돈까스가 있습니다. 이 메뉴를 10분 안에 드시는 분께는 비빔밥 한그릇을 다음 방문 때 무료로 제공해드립니다.',
          store_address: '서울특별시 서초구 서초동 서운로 133 2층',
          store_category: '분식',
          store_lat: 37.496511,
          store_lng: 127.02483,
          business_hour: '10:00 ~ 21:00',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 5,
          user_id: 4,
          store_name: 'K-타운',
          store_image: 'client/src/img/dummy/store5.png',
          store_order_quantity: '30',
          store_description:
            '뭐니뭐니 해도 한식이 최고!! BTS의 인기에 힘입어 많은 외국인 손님들께서 방문해주고 계십니다.',
          store_address: '서울특별시 중구 남대문로5가 581',
          store_category: '한식',
          store_lat: 37.555388,
          store_lng: 126.970782,
          business_hour: '11:30 ~ 21:00',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 6,
          user_id: 5,
          store_name: '프랑스파슷하',
          store_image: 'client/src/img/찌개.png',
          store_order_quantity: '5',
          store_description:
            '다채로운 생면 파스타의 세계에 오신 걸 환영합니다! 이탈리아 요리학교를 수료하고 미슐랭 3스타 레스토랑에서 경험을 쌓고오신 임현성 쉐프님께서 직접 만드신 파스타를 즐기실 수 있습니다. 현장방문은 이용이 힘드시고, 최소 3일전에 전화로 예약을 해주셔야 저희 레스토랑 음식들을 즐기실 수 있습니다. 불편을 드려 죄송합니다.',
          store_address: '서울특별시 중구 남대문로5가 581',
          store_category: '양식',
          store_lat: 37.559498,
          store_lng: 126.973151,
          business_hour: '11:30 ~ 21:00',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 7,
          user_id: 1,
          store_name: '버거401',
          store_image: 'client/src/img/찌개.png',
          store_order_quantity: '14',
          store_description:
            '요즘에 흔한 프랜차이즈와는 다릅니다!! 원산지표시는 확실하게 가게 내에 표시해놓고 있습니다. 걱정하지 마시고 와서 수제버거를 즐겨보세요!!',
          store_address: '서울특별시 중구 남대문로5가 581',
          store_category: '패스트푸드',
          store_lat: 37.50393,
          store_lng: 127.009644,
          business_hour: '11:30 ~ 16:30',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 8,
          user_id: 2,
          store_name: '앳하노이',
          store_image: 'client/src/img/찌개.png',
          store_order_quantity: '24',
          store_description:
            '베트남에서 온 요리사가 직접 만들어주는 베트남 쌀국수와 가정식을 즐겨보세요!! 대표 메뉴로는 양지 쌀국수와 스프링롤, 소프트크랩 튀김 등이 있습니다.',
          store_address: '서울특별시 중구 남대문로5가 581',
          store_category: '한식',
          store_lat: 37.506462,
          store_lng: 126.963802,
          business_hour: '11:00 ~ 20:30',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 9,
          user_id: 3,
          store_name: '덕수궁',
          store_image: 'client/src/img/찌개.png',
          store_order_quantity: '8',
          store_description:
            '이태원에서 인기를 끌었던 덕수궁이 이전했습니다!! 올해 초복은 7월 11일 일요일, 중복은 7월 21일 수요일, 말복은 8월 10일 화요일인데요. 더운 여름 복날에 삼계탕으로 몸보신하러 많이많이 찾아주세요~',
          store_address: '서울특별시 중구 남대문로5가 581',
          store_category: '한식',
          store_lat: 37.555893,
          store_lng: 127.04148,
          business_hour: '11:00 ~ 21:00',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 10,
          user_id: 4,
          store_name: '크리스마스엔',
          store_image: 'client/src/img/찌개.png',
          store_order_quantity: '15',
          store_description:
            '최근 슬기로운 코딩생활 드라마에 나오는 맛집입니다. 트러플 뇨끼와 양고기 스테이크가 대표 메뉴입니다',
          store_address: '서울특별시 중구 남대문로5가 581',
          store_category: '양식',
          store_lat: 37.529628,
          store_lng: 126.967185,
          business_hour: '10:30 ~ 20:30',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 11,
          user_id: 4,
          store_name: '옛날 할무니 짜장',
          store_image: 'client/src/img/찌개.png',
          store_order_quantity: '15',
          store_description:
            '인기에 힘입어 리모델링을 하며 홍콩감성으로 돌아왔습니다!! 최근 tv 예능 프로그램 자면 뭐하니에도 출연하여 큰 화제가 되었었습니다. 1980년대 홍콩 영화를 모티브로 한 인테리어와 함꼐 맛있는 중식을 즐겨보세요. 음식을 먹고 인증샷을 찍어 인스타그램에 태그와 함께 올려주신 분에게는 추첨을 통해 탕수육 공짜 쿠폰을 보내드립니다. 많은 관심 부탁드립니다!!',
          store_address: '서울특별시 중구 남대문로5가 581',
          store_category: '양식',
          store_lat: 37.629628,
          store_lng: 126.867185,
          business_hour: '10:30 ~ 20:30',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('store', null, {});
  },
};
