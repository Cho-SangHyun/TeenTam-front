![logo](https://user-images.githubusercontent.com/65762283/223078765-a58a1f2c-a7c1-4971-8a37-04d62b358c20.png)  <br />  

## 📌 요약
**오직 10대들을 위한 커뮤니티로 활용할 수 있는 웹사이트**입니다. 대학생들이 자주 사용하는 커뮤니티로는 에브리타임, 직장인들이 자주 사용하는 커뮤니티로는 블라인드 등이 있는 반면 1대 학생들은 주로 카카오톡 오픈채팅방을 활용해서 소통한다는 말([링크](https://www.20slab.org/Archives/37890))을 듣고, 그들을 위한 정형화된 형식의 커뮤니티를 만들어 10대를 위한 소통의 창구를 만들자는 생각으로 개발했습니다.  
<br />  

### 주요 기능
- ✅ 원하는 카테고리(아이돌, 친구, 진로 등..)의 게시글 생성 / 조회 / 수정 / 삭제, 댓글 작성 및 좋아요 
- ✅ 원하는 게시글 검색(작성자명 & 글/본문 내용 별)
- ✅ 본인 학교에 맞는 급식 조회
- ✅ 게시글 작성자 및 댓글 작성자에게 쪽지 전송 및 쪽지 확인 기능 등
- ✅ 각자에 맞는 시간표 생성 기능
- ✅ 이 외 프로필 이미지 수정 기능 등..
<br />  

## 🔍 느낀 점
단순히 온라인 강의 내용을 따라 하며 배우던 `React.js`를 이용한 첫 팀 프로젝트 경험이 된 웹사이트입니다. 무언가를 만들어보며 그때마다 필요한 걸 공부해가는 야생학습이 효과가 좋다고 생각해 무작정 시작한 팀 프로젝트였습니다. 

또한, 개념적으로만 알고 있던 `JWT`를 처음 사용해보는 계기도 됐습니다.  


## 🔨 기술스택
- Frontend : `React.js`, `React Router`, `PostCSS`
- Backend : `Django`, `Apache`
- Database : `SQLite`
<br />  

## 👀 둘러보기
### 메인페이지 (로그인 전, 로그인 후)  

![image.jpg1](https://user-images.githubusercontent.com/65762283/223095482-83093cff-9049-41a6-bc76-c5ccff287f22.png) |![image.jpg2](https://user-images.githubusercontent.com/65762283/223096234-d4d81eae-2c25-4772-af9f-0d8e1b063c89.png)
--- | --- | 

### 로그인 / 회원가입 페이지
  
![image.jpg1](https://user-images.githubusercontent.com/65762283/223097336-e391b4d2-5955-4fe0-a221-a5ede738b89e.png) |![image.jpg2](https://user-images.githubusercontent.com/65762283/223097420-ec0dd7db-5c93-4be2-9ec9-411a03b30ead.png)
--- | --- |

### 게시글 목록 페이지
<p align="center"><img src="https://user-images.githubusercontent.com/65762283/223100866-32e8b3ed-dc3b-4643-ba9b-dfcf0ff6e943.png" width="65%"/></p>

### 게시글 상세 페이지
<p align="center"><img src="https://user-images.githubusercontent.com/65762283/223098582-948e06fa-9df6-4e1a-99da-4ae7902b776a.png" width="65%"/></p>

### 게시글 검색
  
![image.jpg1](https://user-images.githubusercontent.com/65762283/223101083-f6e98a6d-91e7-435c-ab70-f3726c75e1a5.png) |![image.jpg2](https://user-images.githubusercontent.com/65762283/223101072-1404348e-3b75-4535-9e45-268159a0a0e3.png)
--- | --- |
<p align="center"><img src="https://user-images.githubusercontent.com/65762283/223101267-a0c7464c-589e-4b95-a812-874aa2f9b549.png" width="65%"/></p>

### 쪽지 주고받기
  
![image.jpg1](https://user-images.githubusercontent.com/65762283/223102022-5f22c328-5086-4623-b88e-0f23c6020da2.png) |![image.jpg2](https://user-images.githubusercontent.com/65762283/223102032-f6a90dbd-72ca-461d-90dc-d8ea482b0e65.png)
--- | --- |
<p align="center"><img src="https://user-images.githubusercontent.com/65762283/223102031-6cf840d6-b729-457a-ab29-539e2503e3b4.png" width="65%"/></p>

### 시간표 페이지
<p align="center"><img src="https://user-images.githubusercontent.com/65762283/223103427-5470f646-f7f4-4c16-a57e-3500c799b8e9.png" width="65%"/></p>

### 시간표 생성 및 수정
<p align="center"><img src="https://user-images.githubusercontent.com/65762283/223108325-3c6e5545-db19-4e34-ae2e-84f5b7f9ebb0.gif" width="65%"/></p>

### 마이페이지
<p align="center"><img src="https://user-images.githubusercontent.com/65762283/223108943-3a5f1b59-acff-4ef8-ad92-40f2c1bd45fc.png" width="65%"/></p>

<br />  

## ⚙️ 사용방법
1. `Node.js` 설치(LTS버전으로) ([링크](https://nodejs.org/ko/))    
2. 이 레포지토리 클론받기  
```
>> git clone https://github.com/Cho-SangHyun/TeenTam-front.git
```  
3. `package.json`에 적혀있는 패키지들 설치 (아래 명령어 입력, 클론된 폴더 안에서 해야 함)
```
>> npm install
```  
4. `yarn` 설치(패키지 매니저)  
```
>> npm install yarn --global
```  
5. 구동  
```
>> yarn start
```
