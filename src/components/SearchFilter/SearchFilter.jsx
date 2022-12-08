import React, {useRef, useEffect} from 'react';
import styles from './SearchFilter.module.css';

const SearchFilter = ({isOpen, setSearchFilterOpen, isInMainPage, setSearchWay, inputRef}) => {
    const searchFilterRef = useRef();

    const openSearchFilter = () => {
        searchFilterRef.current.classList.remove(styles.no_visible);
        searchFilterRef.current.classList.add(styles.visible);
    }
    const closeSearchFilter = () => {
        searchFilterRef.current.classList.remove(styles.visible);
        searchFilterRef.current.classList.add(styles.no_visible);
    }

    const handleSelectSearchWay = (e) => {
        if(e.target.tagName === "LI"){
            setSearchWay(e.target.dataset.value);
            searchFilterRef.current.classList.remove(styles.visible);
            searchFilterRef.current.classList.add(styles.no_visible);
            inputRef.current.focus();
        }
    }

    useEffect(() => {
        if (isOpen) {
            openSearchFilter();
            return;
        }
        closeSearchFilter();
    }, [isOpen])

    useEffect(() => {
        // 이벤트 핸들러 함수
        const handler = (e) => {
            // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
            if (searchFilterRef.current && !searchFilterRef.current.contains(e.target)) {
                setSearchFilterOpen(false);
            }
        };
        
        // 이벤트 핸들러 등록
        document.addEventListener('mousedown', handler);
        
        return () => {
            // 이벤트 핸들러 해제
            document.removeEventListener('mousedown', handler);
        };
    });

    return(
        <ul 
            className={`${styles.search_filter} ${styles.no_visible} ${isInMainPage ? styles.in_main : styles.not_in_main}`} 
            ref={searchFilterRef} onClick={handleSelectSearchWay}
        >
            <p className={styles.search_filter_title}>검색 필터</p>
            <li className={styles.search_way} data-value="keyword">제목+내용</li>
            <li className={styles.search_way} data-value="writer_name">작성자</li>
        </ul>
    )
}

export default SearchFilter;