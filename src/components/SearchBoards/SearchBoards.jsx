import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { CRUD } from '../../app';
import QueryString from 'qs';
import styles from './SearchBoards.module.css';
import SearchResultList from '../SearchResultList/SearchResultList';

const POSTS_PER_PAGE = 10;
const ORDER = "pub_date";

const SearchBoards = ({page, setPage, firstPage, setFirstPage}) => {
    const crudService = useContext(CRUD);
    const location = useLocation();
    const queryData = QueryString.parse(location.search, { ignoreQueryPrefix: true });
    const writerName = queryData.writer_name;
    const keyword = queryData.keyword;

    const [categoryName, setCategoryName] = useState("전체 게시판");
    const [postList, setPostList] = useState([]);
    const [postCount, setPostCount] = useState(0);

    useEffect(() => {
        crudService.getPostListBySearch(ORDER, page, POSTS_PER_PAGE, keyword, writerName, 
            categoryName, setPostList, setPostCount);
    }, [crudService, page, keyword, writerName, setPostList, setPostCount, categoryName])

    return(
        <section className={styles.boards_section}>
            <h1 className={styles.boards_section_title}>
                {
                    keyword && `"${keyword}"에 대한 검색 결과`
                }
                {
                    writerName && `"${writerName}"님이 작성한 글 검색 결과`
                }
            </h1>
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