import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { CRUD } from '../../app';
import QueryString from 'qs';
import styles from './SearchBoards.module.css';
import SearchResultList from '../SearchResultList/SearchResultList';

const POSTS_PER_PAGE = 10;
const ORDER = "pub_date";

const SearchBoards = (props) => {
    const crudService = useContext(CRUD)
    const location = useLocation();
    const queryData = QueryString.parse(location.search, { ignoreQueryPrefix: true });
    const keyword = queryData.keyword;

    const [categoryName, setCategoryName] = useState("전체 게시판");
    const [postList, setPostList] = useState([]);
    const [postCount, setPostCount] = useState(0);
    const [firstPage, setFirstPage] = useState(1);
    const [page, setPage] = useState(1);

    useEffect(() => {
        setPage(1);
        setFirstPage(1);
    }, [keyword])

    useEffect(() => {
        crudService.getPostListBySearch(ORDER, page, POSTS_PER_PAGE, keyword, categoryName, setPostList, setPostCount);
    }, [crudService, page, keyword, setPostList, setPostCount, categoryName])

    return(
        <section className={styles.boards_section}>
            <h1 className={styles.boards_section_title}>"{keyword}"에 대한 검색 결과</h1>
            <SearchResultList
                firstPage={firstPage}
                postCount={postCount} 
                postList={postList} 
                setFirstPage={setFirstPage}
                setPage={setPage}
                keyword={keyword}
                categoryName={categoryName}
                setCategoryName={setCategoryName}
            />
        </section>
    )
}

export default SearchBoards;