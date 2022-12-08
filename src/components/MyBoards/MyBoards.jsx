import React, { useState, useEffect, useContext } from 'react';
import { CRUD } from '../../app';
import MyPostList from '../MyPostList/MyPostList';
import styles from './MyBoards.module.css';

// category : 카테고리
// postList : 포스트 목록
// postCount : 현재 카테고리에서 생성된 전체 포스트 개수
// firstPage : 페이지네이터에서 보이는 5개 버튼 중 제일 왼쪽 버튼의 페이지번호
//             -> 앞으로 페이지네이터에서 지금 보이는 페이지번호들을 한 뷰에 보이는 페이지들 이라고 정의하겠음
// page : 현재 보고 있는 페이지
const POSTS_PER_PAGE = 10;
const ORDER = "pub_date";

const MyBoards = (props) => {
    const crudService = useContext(CRUD)
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

    const [postList, setPostList] = useState([]);
    const [postCount, setPostCount] = useState(0);
    const [firstPage, setFirstPage] = useState(1);
    const [page, setPage] = useState(1);

    useEffect(() => {
        crudService.getMyPostsList(user.id, page, setPostList, setPostCount);
    }, [crudService, page, setPostList, setPostCount])

    return(
        <section className={styles.my_boards_section}>
            <h1 className={styles.my_boards_section_title}>내가 쓴 글</h1>
            <MyPostList 
                firstPage={firstPage}
                postCount={postCount} 
                postList={postList} 
                setFirstPage={setFirstPage}
                setPage={setPage}
            />
        </section>
    )
}

export default MyBoards;