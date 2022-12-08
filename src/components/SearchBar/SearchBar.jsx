import React, { useState, useRef } from 'react';
import { IoSearch } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import SearchFilter from '../SearchFilter/SearchFilter';
import styles from './SearchBar.module.css';

// 검색창 컴포넌트
// 엔터 버튼 누르면 검색결과 페이지로 연결되게끔 이벤트 핸들러 추가해야 함
// navbar안에 위치할 경우 사이즈 조정에 대한 작업도 필요

const SearchBar = ({ isInMainPage, setPage, setFirstPage }) => {
    const inputRef = useRef();
    const [searchFilterOpen, setSearchFilterOpen] = useState(false);
    const [searchWay, setSearchWay] = useState("keyword");

    const navigate = useNavigate();

    const handleKeyDownEnter = (e) => {
        let userInput = inputRef.current.value;

        if (e.key !== "Enter" || !userInput) {
            return;
        }
        
        if (setFirstPage && setPage) {
            setFirstPage(1);
            setPage(1);
        }

        if (searchWay === "keyword") {
            const keyword = userInput.replaceAll(" ", "+");
            navigate(`/boards/search?keyword=${keyword}`);
            return;
        }

        const writerName = userInput;
        navigate(`/boards/search?writer_name=${writerName}`)
    }

    const handleClickInput = () => {
        setSearchFilterOpen(true);
    }

    return(
        <div className={`${styles.search_bar} ${isInMainPage?styles.in_main:styles.not_in_main}`}>
            <IoSearch className={styles.search_icon}/>
            <input 
                onClick={handleClickInput}
                onKeyDown={handleKeyDownEnter}
                className={styles.search} 
                placeholder='궁금한 토픽을 검색해보세요'
                type="text" 
                name='query'
                ref={inputRef}
            />
            <SearchFilter 
                isOpen={searchFilterOpen} 
                setSearchFilterOpen={setSearchFilterOpen} 
                isInMainPage={isInMainPage} 
                setSearchWay={setSearchWay} 
                inputRef={inputRef}
            />
        </div>
    )
}

export default SearchBar;