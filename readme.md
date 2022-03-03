# SUMMONERS WAR Decks

## 모바일게임 서머너즈워 점령전, 길드전 유틸페이지 사이드 프로젝트

    서머너즈워 게임 내 길드간 전투시 상대 길드의 방어 몬스터를 상대할 때 승률이 높은 몬스터를 공유하는 페이지 입니다.
    현재 약 40명의 유저가 사용하고 있습니다.

### Tech Stack

**Front**

[![TypeScript-v4.5.5](https://img.shields.io/badge/TypeScript-v4.5.5-007ACC.svg?logo=typescript)](https://www.typescriptlang.org/)
[![React-v17.0.2](https://img.shields.io/badge/React-v17.0.2-61DAFB.svg?logo=react)](https://reactjs.org/)
[![Redux](https://img.shields.io/badge/Redux-v4.1.2-764ABC.svg?logo=redux)](https://ko.redux.js.org/introduction/getting-started/)
[![Redux-Toolkit](https://img.shields.io/badge/ReduxToolkit-v1.7.1.2-764ABC.svg?logo=redux)](https://ko.redux.js.org/introduction/getting-started/)
[![Redux-Toolkit-Query](https://img.shields.io/badge/ReduxToolkitQuery-v1.7.1.2-764ABC.svg?logo=redux)](https://ko.redux.js.org/introduction/getting-started/)
[![sass](https://img.shields.io/badge/sass-v1.43.5-CC6699.svg?logo=sass)](https://sass-lang.com/dart-sass)
[![Netlify](https://img.shields.io/badge/Netlify-000000.svg?logo=netlify)](https://www.postgresql.org/)

**Backend**

[![NestJS](https://img.shields.io/badge/NestJS-v8.0.0-E0234E.svg?logo=nestjs)](https://docs.nestjs.com/)
[![TypeORM](https://img.shields.io/badge/TypeORM-v0.2.41-E0234E.svg)](https://typeorm.io/#/)
[![Postgresql](https://img.shields.io/badge/PostgreSQL-000000.svg)](https://www.postgresql.org/)
[![Heroku](https://img.shields.io/badge/Heroku-000000.svg?logo=heroku)](https://www.postgresql.org/)

<br />

### File Structure

    📂 config               :   Webpack, babel, prettier, eslint
    📂 src
      📂 api                :   API ( Redux Toolkit Query )
      📂 assets
        📂 images           :   Image files
        📂 styles           :   Scss
          📂 common         :   Button, Input       ... scss
          📂 components     :   Header, Sidebar     ... scss
          📂 layout         :   Layout              ... scss
          📂 utils          :   Mixins, Variables   ... scss
          📄 _reset         :   Reset style             scss
          📄 index          :   Combine Scss            scss
        📂 components       :   React Component         .tsx
        📂 constants        :   Global Constants        .ts
        📂 container        :   Component Container     .tsx
        📂 hooks            :   React Hooks             .tsx
        📂 pages            :   Route Pages             .tsx
        📂 routes           :   React Router            .ts, .tsx
        📂 store            :   Redux Store
          📂 reducer        :   Root Reducer
          📂 slices         :   Redux Toolkit Slices
          📄 index          :   Store, Persist Store
        📂 types            :   Data Types              .ts
        📂 utils            :   Global Util Func        .ts, .tsx

<br />

### Screen

    회원가입 - 입력값 유효성 체크

<p align="center">

<img src="https://user-images.githubusercontent.com/85790271/152686917-62253a84-ea10-4626-ba57-aefc8825657b.gif" alt="회원가입 - 입력값 유효성 체크" />

</p>

    회원가입 - 중복 사용자 체크

<p align="center">

<img src="https://user-images.githubusercontent.com/85790271/152686949-60fec076-a3d0-4930-97c4-140769376998.gif" alt="회원가입 - 중복 사용자 체크" />
    
</p>

    회원가입 - 성공

<p align="center">

<img src="https://user-images.githubusercontent.com/85790271/152686960-c6e79b4c-37d9-425a-8b58-64a591ae3d8e.gif" alt="회원가입 - 성공" />
    
</p>

    로그인 - 사용자의 권한을 확인한 후 가입대기 상태라면 관리자의 접근허용을 대기합니다

<p align="center">

<img src="https://user-images.githubusercontent.com/85790271/152687454-69028b79-49e4-438f-9fb7-6525ec714f86.gif" alt="회원가입 - 대기" />

</p>

---

    사용자 관리 - 사용자의 권한을 변경하거나 계정을 삭제합니다

<p align="center">

<img src="https://user-images.githubusercontent.com/85790271/152687684-06004ee5-6792-47c8-aedd-7524093b695f.gif" alt="사용자 관리 - 사용자의 권한을 변경하거나 계정을 삭제합니다" />
    
<img src="https://user-images.githubusercontent.com/85790271/152687717-3df64d1a-9dc5-42ac-ba90-6627b12f2e30.gif" alt="사용자 관리 - 사용자의 권한을 변경하거나 계정을 삭제합니다" />
    
<img src="https://user-images.githubusercontent.com/85790271/152687700-f0d19353-5866-48a2-ad25-c5779e9f3c9a.gif" alt="사용자 관리 - 사용자의 권한을 변경하거나 계정을 삭제합니다" />
    
</p>

---

    상대방 방어덱 리스트 - 생성한 날짜, 생성한 사용자, 각 몬스터이름을 표기한 리스트 입니다

<p align="center">

<img src="https://user-images.githubusercontent.com/85790271/152687832-5d056f2a-8895-4287-b288-39c6b990acab.gif" alt="상대방 방어덱 리스트 ( 공유덱 리스트 )" />

</p>

    상대방 방어덱 리스트 필터 - 각 필터 키워드를 클릭해서 해당 키워드를 포함한 공유덱 리스트를 가져옵니다.
    ( 해당 키워드를 모두 포함한 리스트 )

<p align="center">

<img src="https://user-images.githubusercontent.com/85790271/152687989-a4f862d8-6959-4fb9-8fd7-8398b5421c5e.gif" alt="상대방 방어덱 리스트 필터 - 각 필터 키워드를 클릭해서 해당 키워드를 포함한 공유덱 리스트를 가져옵니다" />

</p>

    상대방 방어덱 리스트 필터 - 각 필터 키워드를 검색해서 해당 키워드를 포함한 공유덱 리스트를 가져옵니다.
    ( 해당 키워드를 모두 포함한 리스트 )

<p align="center">

<img src="https://user-images.githubusercontent.com/85790271/152688023-81bdab28-1c15-4270-bf67-6cf801ff7945.gif" alt="상대방 방어덱 리스트 필터 - 각 필터 키워드를 검색해서 해당 키워드를 포함한 공유덱 리스트를 가져옵니다" />

</p>

    상대방 방어덱 생성

<p align="center">

<img src="https://user-images.githubusercontent.com/85790271/152687839-8fa7c1d2-37e7-40f5-8377-705a9d0f4a21.gif" alt="상대방 방어덱 생성" />

</p>

    상대방 방어덱 공격몬스터 생성

<p align="center">

<img src="https://user-images.githubusercontent.com/85790271/152688170-75fa8964-9ccd-4f6a-bc8d-cda489975c67.gif" alt="상대방 방어덱 공격몬스터 생성" />

</p>

    상대방 방어덱 공격몬스터 삭제

<p align="center">

<img src="https://user-images.githubusercontent.com/85790271/152688201-6467bdee-94b6-488f-be5c-2dbc80b8bc8f.gif" alt="상대방 방어덱 공격몬스터 생성" />

</p>

---
