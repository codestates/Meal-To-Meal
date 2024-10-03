# Meal-To-Meal
## 🍰 About


내가 먹은 맛있는 한 끼를 다른 사람에게도 나눌 수 있는

지도 기반 음식 기부 플랫폼 `Meal To Meal` 입니다
<div>
 <img src="https://user-images.githubusercontent.com/83822798/147181108-e17903b3-8c7a-4878-88a6-9d79113dd641.png" width=300 height=300>
<img src="https://github.com/user-attachments/assets/5b72ae77-66aa-4a8c-9edf-aa6f5b257b9d" width=600 height=333>
</div>

## Requirements

- 유저는 지도에서 가게명 또는 주소, 카테고리로 가게를 검색할 수 있어요
- 기부자는 원하는 메뉴를 고르고 장바구니에 담아 기부할 수 있어요
- 기부를 받는 사람은 음식을 주문하고 가게에 가서 내역을 보여주면 식사를 할 수 있어요
- 기부를 받는 사람은 음식을 먹고나서 리뷰를 작성하여 감사를 표현할 수 있어요
- 유저는 내가 기부한 음식 내역과, 작성한 리뷰를 모아볼 수 있어요
- 사장님이라면 음식점을 등록하고 기부/주문 내역을 확인할 수 있어요

## Ui & Flow
[Miro 링크](https://miro.com/app/board/o9J_lh0mMz4=/)

## Features

[API Docs](https://seojung19.gitbook.io/meal-to-meal_api-docs)

 #### User
  - 회원 가입, 로그인, 로그아웃, 회원탈퇴
  - 이메일 중복 체크, 닉네임 중복 체크
  - 회원 정보 조회, 회원 정보 수정
 
 #### Auth
  - 휴대폰 인증
  - 이메일 인증
  - 카카오 로그인
  - 유저 토큰 인증
 
 #### Menu
  - 메뉴 등록, 조회, 삭제
 
 #### Review
  - 리뷰 등록, 조회
 
 #### Store
  - 가게 등록, 조회, 수정, 삭제

 #### Payment
  - 아임포트 결제 내역 생성
 
 #### Cart
  - 기부하기
    - 결제 API 호출 성공 시 기부 내역 생성
    - 가게의 메뉴별 기부 주문 수량 증가
    - 유저의 기부 횟수를 메뉴 단위로 업데이트
    - 유저의 총 기부액을 업데이트
  - 기부 내역 조회
 
 #### User-meal
  - 주문 내역 생성
    * 휴대폰 인증된 사용자만 주문 가능
    * 한 번에 한 메뉴만 주문 가능
    * 하루에 한 번만 주문 가능
    * 실방문 후 리뷰를 작성해야 다음 주문 가능
    * 가게의 사장님은 해당 가게 메뉴 주문 불가
    * 주문 성공 시 해당 메뉴의 기부된 수량 차감
  - 주문 내역 조회
    * 주문 내역은 하나씩만 조회 가능
 
 #### Search
  - 키워드로 가게 검색
 


## 사용 기술

![image](https://github.com/user-attachments/assets/a44b9636-5cc1-41a5-87ba-89da09f63c7a)

## ERD
<img width="906" alt="스크린샷 2024-10-03 오후 6 43 35" src="https://github.com/user-attachments/assets/676b4ef9-3861-49f3-8853-70bfbd558130">

[dbdiagram 링크](https://dbdiagram.io/d/619b1efb02cf5d186b615228)

## 🍔 서비스 미리보기

### 랜딩페이지
<img src="https://user-images.githubusercontent.com/83822798/146705634-f0d28217-7b99-4d60-92c2-420bb5fd3df7.gif" />

### Maps페이지
<img src="https://user-images.githubusercontent.com/83822798/146715705-a87b94f6-c476-4819-8d69-db95ed5bb5f1.gif" />

### Search Bar
<img src="https://user-images.githubusercontent.com/83822798/146716723-fe4850de-69c5-438b-94be-98ea8e650fdc.gif" />

### 가게정보 페이지
<img src="https://user-images.githubusercontent.com/83822798/146716865-80b98413-6380-489a-9c8a-9ef33ef9db49.gif" />

### LogIn 로그인
<img src="https://user-images.githubusercontent.com/83822798/146716482-e7d52d0a-472b-40c8-9dcc-ab000b69850c.gif" />

### SignUp 회원가입
<img src="https://user-images.githubusercontent.com/83822798/146716822-92156a9f-3730-45a1-a58d-c56abd081415.gif" />

### 휴대폰 인증
<img src="https://user-images.githubusercontent.com/83822798/146871182-8d14feb0-0e18-406a-a565-3b4adf77e834.gif" />

### ShareCart 나눔카트
<img src="https://user-images.githubusercontent.com/83822798/146716795-345e68da-3abf-45ea-8dd1-7dbf1ff456e7.gif" />

### Payment 결제
<img src="https://user-images.githubusercontent.com/83822798/146716610-52d49544-2ffd-4106-a6f7-d2fab5d6f0a2.gif" />

### UserMeal 예약
<img src="https://user-images.githubusercontent.com/83822798/146715928-b2e0c31b-c5bf-463d-8f5f-c96788a6078b.gif" />

<img src="https://user-images.githubusercontent.com/83822798/146716904-2c97461c-d3d7-44ac-ab80-ab8400b9f811.gif" />

### ReviewUpload 리뷰 등록
<img src="https://user-images.githubusercontent.com/83822798/146716687-5ba806c4-29ed-41d5-8e8c-2859afa9d142.gif" />

### MyPage 마이페이지 (회원정보 수정)
<img src="https://user-images.githubusercontent.com/83822798/146716582-cc58a37c-b884-4ca3-b387-4bfd981ee6b0.gif" />

### Withdrawal 회원탈퇴
<img src="https://user-images.githubusercontent.com/83822798/146716950-13b75178-a58c-4454-a172-1b2a7b7dad2d.gif" />

### 사장님 가게 페이지
<img src="https://user-images.githubusercontent.com/83822798/146716551-b49d49a1-e0fb-44cc-8f5e-91844e1ce50d.gif" />

### 사장님 가게 정보 수정/삭제
<img src="https://user-images.githubusercontent.com/83822798/146716343-e4f08c1b-31fd-4bfb-92d7-04a2434d4adf.gif" />

## LOGO



## 💻 팀원 소개

### ☀️ 박정현

[![](https://img.shields.io/badge/Github-jamiep9rk-%230099FF?style=for-the-badge&logo=github)](https://github.com/jamiep9rk)

#### 🙋 About: 두목님, 과로사 억제기

#### 🔨 Position: Front-End

#### 📝 Stack:

<li>JavaScript
<li>SASS
<li>React
<li>React S3
<li>KAKAO LOGIN API
<li>GOOGLE MAPS API
<li>AXIOS
<li>UUID

#### 💯 Contributions

<details>
 <summary>Works</summary>
  <div markdown="1">
    <div>
        <details>
        <summary>SR</summary>
            <div markdown="1">
                <ul> 
                    <li>RESTful API 문서 작성 </li>  </li>
                    <li>와이어프레임 </li>  </li>
                    <li>워크 플로우 작성 </li>  </li>
                    <li>DB Schema 작성 </li>  </li>
                    <li>System Architecture 작성 </li>  </li>
                </ul>
            </div>
        </details>
    </div>
    <div>
        <details>
        <summary>Frontend</summary>
            <div markdown="1">
                <ul>
                    <li>Google Maps API </li>
                    <ul>
                        <li>지도를 화면에 랜더링 </li>
                        <li>가게 카테고리에 맞게 지도에 마커 띄우기 </li>
                    </ul>
                    <li>카카오 소셜 로그인 </li>
                    <ul>
                        <li>클라이언트에서 토큰 받아오고 리다이렉트 시키는 기능 구현 </li>
                    </ul>
                    <li>StoreInfo 가게 정보 페이지 </li>
                    <ul>
                        <li>페이지 구성 및 css 반응형 </li>
                        <li>가게 정보 조회 기능 구현 </li>
                        <li>리뷰 내역 조회 기능 구현 </li>
                    </ul>
                    <li>ShareCart 나눔카트 페이지 </li>
                    <ul>
                        <li>페이지 구성 및 css 반응형 </li>
                        <li>나눔카트 정보 조회 기능 구현 </li>
                    </ul>
                    <li>Policy 이용약관 모달 </li>
                    <ul>
                        <li>페이지 구성 및 css 반응형 </li>
                    </ul>
                    <li>Withdrawal 회원탈퇴 페이지 </li>
                    <ul>
                        <li>페이지 구성 및 css 반응형 </li>
                        <li>회원탈퇴 기능 구현 </li>
                    </ul>
                    <li>ReviewUploadModal 리뷰 등록 모달 </li>
                    <ul>
                        <li>페이지 구성 및 css 반응형 </li>
                        <li>리뷰 등록 기능 구현
                    </ul>
                    <li>MyPage 마이페이지 </li>
                    <ul>
                        <li>리뷰 내역 조회 기능 구현 </li>
                        <li>휴대폰 인증 모달 구성 및 css 반응형 </li>
                        <li>휴대폰 인증 등록 기능 구현 </li>
                        <li>휴대폰 인증 상태 유지 </li>
                     </ul>
                    <li>Management 사장님 가게 페이지 </li>
                    <ul>
                        <li>사장님 가게 등록 기능 구현 </li>
                        <li>사장님 가게 수정 기능 구현 </li>
                        <li>사장님 가게 삭제 기능 구현 </li>
                    </ul>
                    <li>UserMeal 페이지 </li>
                    <ul>
                        <li>css 반응형  </li>
                        <li>주문내역이 없을 시의 조회 기능 구현  </li>
                    </ul>
                    <li>MyDonation 페이지 </li>
                    <ul>
                        <li>페이지 구성 및 css 반응형 </li>
                        <li>기부 내역 조회 기능 구현  </li>
                    </ul>
                </ul>
            </div>
        </details>
    </div>
  </div>
</details>

---

### ⚡ 진성준

[![](https://img.shields.io/badge/Github-Jin--sungjun-%23AAF0D1?style=for-the-badge&logo=github)](https://github.com/Jin-sungjun)

#### 🙋 About: 우린 깐부잖아...! 우리의 백엔드

#### 🔨 Position: Back-End

#### 📝 Stack:

<li>Node.js[express,Jwt]
<li>MySQL,Sequelize
<li>AWS[+EC2,RDS,S3,Route53,CloudFront]
<li>I'mport

#### 💯Contributions

<details>
 <summary>Works</summary>
  <div markdown="1">
    <div>
        <details>
        <summary>SR</summary>
            <div markdown="1">
                <ul> 
                    <li>RESTful API 문서 작성 </li>  </li>
                    <li>와이어프레임 </li>  </li>
                    <li>워크 플로우 작성 </li>  </li>
                    <li>DB Schema 작성 </li>  </li>
                    <li>System Architecture 작성 </li>  </li>
                </ul>
            </div>
        </details>
    </div>
    <div>
        <details>
        <summary>Server</summary>
            <div markdown="1">
                <ul>
                    <li>배포 </li>
                    <ul>
                        <li>AWS Route53 과 CloudFront 를 이용한 Https 배포 환경 작성 </li>
                        <li>EC2를 이용한  서버 배포 </li>
                        <li>S3로  이용한 정적  웹사이트 빌드 및 배포 </li>
                        <li>S3로 이용한 이미지 업로드 기능 구현 </li>
                        <li>RDS로 DB 구축 </li>
                    </ul>
                    <li>결제 시스템 </li>
                    <ul>
                        <li>결제 페이지 데이터 전송 </li>
                        <li>결제 정보 검증 및 검증 성공, 실패시 DB 저장되는 로직 구현 </li>
                    </ul>
                    <li>Review 컨트롤러 </li>
                    <ul>
                        <li>리뷰 등록 구현 </li>
                    </ul>
                    <li>Menu 컨트롤러 </li>
                    <ul>
                        <li>메뉴 등록 구현 </li>
                        <li>메뉴 삭제 구현 </li>
                    </ul>
                    <li>Store 컨트롤러 </li>
                    <ul>
                        <li>가게 신규등록 및 등록시 메뉴까지 같이 추가하게 변경 </li>
                        <li>가게 정보 수정 구현 및 가게 정보 수정시 가게정보와 메뉴정보도 같이 수정할수있게 구현 </li>
                        <li>가게 삭제 구현 </li>
                    </ul>
                    <li>카카오 소셜로그인 </li>
                    <ul>
                        <li>카카오 소셜로그인 회원가입 구현 </li>
                        <li>정보 제공동의에서 이메일을 제공하지 않을때의 일반회원과 구분하여 로그인 하는 기능 구현 </li>
                    </ul>
                    <li>Seed 작성 </li>
                    <ul>
                        <li>유저 Seed 작성 </li>
                        <li>가게 Seed 작성 </li>
                        <li>메뉴 Seed 작성 </li>
                        <li>가게 Review Seed 작성 </li>
                    </ul>
                </ul>
            </div>
        </details>
    </div>
  </div>
</details>

---

### ❄️ 노서정

[![](https://img.shields.io/badge/Github-anniemon-%23660099?style=for-the-badge&logo=github)](https://github.com/anniemon)

#### 🙋 About: 떠오르는 빌런계의 다크호스, 뼈발자

#### 🔨 Position: Back-End

#### 📝 Stack:

<li>Sequelize
<li>Node JS
<li>Express
<li>Bcrpyt
<li>JWT
<li>MySQL
<li>AWS S3
<li>Twilio
<li>Axios

#### 💯 Contributions

<details>
  <summary>Works</summary>
  <div markdown="1">
    <div>
      <details>
        <summary>SR</summary>
        <div markdown="1">
          <ul>
            <li>RESTful API 문서 작성 </li>
            <li>와이어프레임 </li>
            <li>워크 플로우 작성 </li>
            <li>DB Schema 작성 </li>
            <li>System Architecture 작성 </li>
          </ul>
        </div>
      </details>
    </div>
    <div>
      <details>
        <summary>Backend</summary>
        <div markdown="1">
          <ul>
            <li>구조 작성 </li>
            <ul>
                <li> 라우터, 컨트롤러 구성 </li>
                <li> sequelizerc 설정, migrations, models, seeders 구성, associations 설정 </li>
            </ul>
            <li>auth 컨트롤러 </li>
            <ul>
                <li> jwt를 사용한 토큰 검증  </li>
                <li> kakao oauth 소셜 로그인  </li>
                <li> twilio를 사용한 휴대폰 인증  </li>
            </ul>
            <li> 카트 컨트롤러 </li>
            <ul>
                <li> 카트 등록  </li>
                <li> 카트 조회  </li>
            </ul>
            <li> 메뉴 컨트롤러  </li>
            <ul>
                <li> 메뉴 조회  </li>
            </ul>
            <li> 리뷰 컨트롤러  </li>
            <ul>
                <li> 리뷰 등록  </li>
                <li> 리뷰 조회  </li>
            </ul>
            <li> 서치 컨트롤러  </li>
            <ul>
                <li> 지도 서치바에서 가게명, 주소, 카테고리로 검색 기능  </li>
            </ul>
            <li> 스토어 컨트롤러  </li>
            <ul>
                <li> 가게 조회  </li>
                <li> 사장님 페이지 가게 조회  </li>
                <li> 사장님 페이지 가게 수정 시 메뉴 삭제  </li>
            </ul>
            <li> 유저 컨트롤러  </li>
            <ul>
                <li> 회원가입, 로그인, 로그아웃, 회원탈퇴  </li>
                <li> 마이 페이지  </li>
                <li> 이메일, 닉네임 중복 검사  </li>
                <li> 비밀번호 수정, 닉네임 수정  </li>
            </ul>
            <li> 유저밀(예약내역) 컨트롤러  </li>
            <ul>
                <li> 유저밀 등록  </li>
                <li> 유저밀 조회  </li>
            </ul>
            <li> 이벤트 스케줄러  </li>
            <ul>
                <li> 유저 today_used 컬럼 자정에 초기화되게 이벤트 스케줄러 등록  </li>
            </ul>
          </ul>
        </div>
      </details>
    </div>
    <div>
      <details>
        <summary>FrontEnd</summary>
        <div markdown="1">
          <ul>
            <li>React-S3로 클라이언트 사이드에서 s3 버킷에 이미지 업로드 </li>
            <li>이미지 조회 </li>
            <li>이미지 삭제 </li>
          </ul>
        </div>
      </details>
    </div>
  </div>
</details>

---

### ☔ 임현성

[![](https://img.shields.io/badge/Github-Hendrix1995-%23DD4A68?style=for-the-badge&logo=github)](https://github.com/Hendrix1995)

#### 🙋 About: 브레이크 없는 폭주족, CSS 빌런, 잠이 뭐예요??

#### 🔨 Position: Front-End

#### 📝 Stack:

<li>JavaScript
<li>SASS
<li>React
<li>React S3
<li>KAKAO LOGIN API
<li>GOOGLE MAPS API
<li>AXIOS
<li>UUID

#### 💯 Contributions

<details>
 <summary>Works</summary>
  <div markdown="1">
    <div>
        <details>
        <summary>SR</summary>
            <div markdown="1">
                <ul> 
                    <li>RESTful API 문서 작성 </li>
                    <li>와이어프레임 </li>
                    <li>워크 플로우 작성 </li>
                    <li>DB Schema 작성 </li>
                </ul>
            </div>
        </details>
    </div>
    <div>
        <details>
        <summary>Frontend</summary>
            <div markdown="1">
                <ul>
                    <li>Google Maps API </li>
                        <ul>
                            <li>WindowInfo 디자인 및 기능 구현 </li>
                            <li>등록된 가게 좌표를 이용한 마커 렌더 </li>
                            <li>마커 클릭 시 zoom 및 화면 이동 </li>
                        </ul>
                    <li>Alert </li>
                        <ul>
                            <li>디자인 및 표시될 메시지를 변경시켜 사용할 수 있도록 구현 </li>
                            <li>상황에 맞는 Alert 애니메이션 변경(성공, 실패, 자신의 가게에서 먹기 버튼을 누를 경우, 결제 감사) </li>
                        </ul>
                    <li>로그인 및 회원가입 </li>
                        <ul>
                            <li>로그인, 회원가입 모달 디자인 및 반응형 레이아웃 </li>
                            <li>로그인, 회원가입 유효성 검사 구현 </li>
                            <li>로그인, 회원가입 서버 연결 </li>
                        </ul>
                    <li>이미지 업로드 </li>
                        <ul>
                            <li>이미지 업로드 시 미리보기 구현 </li>
                        </ul>
                    <li>SharaCart 나눔카트 페이지 </li>
                        <ul>
                            <li>페이지 디자인 및 반응형 레이아웃 </li>
                            <li>장바구니 상품 추가 및 수량 조절, 삭제 구현 </li>
                            <li>장바구니가 비어 있을 때 애니메이션 추가 </li>
                        </ul>
                    <li>AddStore 가게 등록 페이지 </li>
                        <ul>
                            <li>페이지 디자인 및 반응형 레이아웃 </li>
                            <li>카카오 API를 이용한 주소 검색기능 </li>
                        </ul>
                    <li>FIxStore 가게 수정 페이지 </li>
                        <ul>
                            <li>페이지 디자인 및 반응형 레이아웃 </li>
                            <li>카카오 API를 이용한 주소 검색 기능 </li>
                        </ul>
                    <li>Landing 페이지 </li>
                        <ul>
                            <li>페이지 디자인 및 반응형 레이아웃 </li>
                        </ul>
                    <li>Management 사장님 페이지 </li>
                        <ul>
                            <li>페이지 디자인 및 반응형 레이아웃 </li>
                            <li>가게 정보 서버 연결 </li>
                        </ul>
                    <li>Maps 지도 페이지 </li>
                        <ul>
                            <li>가게 검색 Input 기능 구현 및 디자인 </li>
                            <li>가게 검색 Sidebar 디자인 </li>
                            <li>가게 검색 기능 구현 </li>
                            <li>검색된 가게 클릭 시 해당 가게로 화면 이동 및 zoom </li>
                        </ul>
                    <li>MyDonation 나의 기부내역 페이지 </li>
                        <ul>
                            <li>페이지 디자인 및 반응형 레이아웃 </li>
                            <li>기부 현황, 내 기부내역 서버 연결 </li>
                        </ul>
                    <li>MyPage 내 정보 페이지 </li>
                        <ul>
                            <li>페이지 디자인 및 반응형 레이아웃 </li>
                            <li>회원 정보 수정 유효성 검사 구현 </li>
                            <li>회원 정보 수정 토글 디자인 및 기능 구현 </li>
                        </ul>
                    <li>NotFound 404 페이지 </li>
                        <ul>
                            <li>페이지 디자인 및 반응형 레이아웃 </li>
                        </ul>
                    <li>StoreInfo 가게 상세정보 페이지 </li>
                        <ul>
                            <li>페이지 디자인 및 반응형 레이아웃 </li>
                            <li>가게 정보 서버 연결 </li>
                        </ul>
                    <li>UserMeal 페이지 </li>
                        <ul>
                            <li>페이지 디자인 및 반응형 레이아웃 </li>
                            <li>예약된 가게 정보와 주문한 유저 정보 서버 연결 </li>
                            <li>음식점 리뷰 모달 창 디자인 및 반응형 레이아웃 </li>
                        </ul>
                    <li>Withdrawal 회원 탈퇴 페이지 </li>
                        <ul>
                            <li>페이지 디자인 및 반응형 레이아웃 </li>
                        </ul>
                    <li>Footer </li>
                        <ul>
                            <li>디자인 및 반응형 레이아웃 </li>
                        </ul>
                    <li>Header Sidebar </li>
                        <ul>
                            <li>로그인 상황에 따른 Sidebar 구현 및 디자인 </li>
                            <li>Header 디자인 및 반응형 레이아웃 </li>
                        </ul>
                    <li>Loading </li>
                        <ul>
                            <li>페이지 디자인 및 반응형 레이아웃 </li>
                        </ul>
                    <li>결제 시스템 </li>
                        <ul>
                            <li>결제 시스템 데이터 전송 </li>
                        </ul>
                    <li>모바일 내비게이션 </li>
                        <ul>
                            <li>디자인 및 모바일 버전일 때에만 렌딩 </li>
                            <li>스와이프 기능 구현 </li>
                        </ul>
                    <li>디자인 요소 </li>
                        <ul>
                            <li>버튼 및 Input 반응 이벤트 구현 </li>
                            <li>검색 혹은 렌딩된 요소의 상태(ex: 검색 결과가 없을 때)에 따른 애니메이션 컴포넌트 구현 </li>
                            <li>팀 로고 및 프로젝트 로고 디자인 </li>
                        </ul>
                </ul>
            </div>
        </details>
    </div>
  </div>
</details>
