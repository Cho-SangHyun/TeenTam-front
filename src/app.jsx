import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import MainPage from './pages/MainPage/MainPage';
import SignupPage from './pages/SignupPage/SignupPage';
import WritePostPage from './pages/WritePostPage/WritePostPage';
import EditPostPage from './pages/EditPostPage/EditPostPage';
import PostDetailPage from './pages/PostDetailPage/PostDetailPage';
import BoardsPage from './pages/BoardsPage/BoardsPage';
import SearchResultPage from './pages/SearchResultPage/SearchResultPage';
import MyPage from './pages/MyPage/MyPage';
import MyBoardsPage from './pages/MyBoardsPage/MyBoardsPage';
import TimeTablePage from './pages/TimeTablePage/TimeTablePage';
import './app.css';

export const CRUD = React.createContext(null);
export const AUTH = React.createContext(null);

function App({authService, crudService}) {

  return (
    <BrowserRouter>
      <AUTH.Provider value={authService}>
        <CRUD.Provider value={crudService} >
          <Routes>
            <Route path="/" element={<MainPage />}/>
            <Route path="/login" element={<LoginPage authService={authService} />}/>
            <Route path="/signup" element={<SignupPage authService={authService} />}/>
            <Route path="/write-post" element={<WritePostPage />}/>
            <Route path="/edit-post" element={<EditPostPage />}/>
            <Route path="/boards" element={<BoardsPage />}/>
            <Route path="/boards/:boards_category/id/:boards_id" element={<PostDetailPage />}/>
            <Route path="/boards/search" element={<SearchResultPage />}/>
            <Route path="/mypage" element={<MyPage />}/>
            <Route path="/myboardslist" element={<MyBoardsPage />}/>
            <Route path="/timetable" element={<TimeTablePage />}/>
          </Routes>
        </CRUD.Provider>
      </AUTH.Provider>
    </BrowserRouter>
  );
}

export default App;
