import React, { useRef, useEffect } from 'react';
import { BsChevronDoubleLeft, BsChevronLeft, BsChevronRight, BsChevronDoubleRight } from "react-icons/bs";
import { range } from '../../services/util';
import styles from './Pagination.module.css';

// 한 페이지에 보이는 포스트 개수
const POSTS_PER_PAGE = 10;
// 한 번에 보여주는 페이지 개수
const PAGES_PER_VIEW = 5;

// 마지막 페이지 번호와 마지막 페이지가 보이는 뷰의 첫 페이지 번호를 리턴
const getLastFirstPage = (totalPosts) => {
    // 전체 포스트 개수를 한 페이지에 보여주는 개수(10)개로 나눈 값을 올림처리 -> 마지막 페이지 번호
    const lastPage = Math.ceil(totalPosts / POSTS_PER_PAGE);
    // lastFirstPage = lastPage가 나오는 뷰의 첫 페이지 번호
    const lastFirstPage = 1 + 5 * parseInt((lastPage - 1) / PAGES_PER_VIEW);

    return [lastPage, lastFirstPage];
}
// paginator에 있는 버튼에 입혀진 스타일을 지움
// 근데 이미 current가 적용된 애를 찾아 지우는게 힘드니까 그냥 죄다 지운다
const removeStyleFromButton = (target) => {
    for(const li of target.parentNode.children){
        li.classList.remove(styles.current);
    }
}
// paginator에서 특정 버튼에게 current스타일을 입힌다
const addStyleToButton = (target) => {
    removeStyleFromButton(target);
    target.classList.add(styles.current);
}

// 숫자페이지 버튼을 만들어주는 함수.
// 단 firstPage에 해당하는 페이지버튼은 firstPageRef에 의해 참조되므로 이 함수에서 만들지 않음
const PageButtons = ({firstPage, lastPage, }) => {
    // endPage = 한 뷰에서 보일 마지막 페이지. 
    const endPage = Math.min(firstPage + PAGES_PER_VIEW - 1, lastPage);
    // pageRage = 한 뷰에서 2번째 페이지버튼의 페이지번호 ~ 마지막 페이지버튼의 페이지번호
    const pageRange = range(firstPage + 1, endPage + 1);

    return(
        <>
            {
                pageRange.map((pageNum) => {
                    return (
                        <li key={pageNum} className={`${styles.button} ${styles.page_button}`} >
                            {pageNum}
                        </li>
                    )
                })
            }
        </>
    )
}

const Pagination = ({category, firstPage, postCount, setFirstPage, setPage, keyword, categoryName}) => {
    const [lastPage, lastFirstPage] = getLastFirstPage(postCount);
    const firstPageRef = useRef();

    const handleClickButton = (e) => {
        // 숫자 적힌 페이지버튼 클릭 시
        if(e.target.classList.contains(styles.page_button)){
            const newPage = parseInt(e.target.innerText);
            // 페이지 설정
            setPage(newPage);
            // 클릭된 페이지버튼에 css입히기
            addStyleToButton(e.target);
        }
        // 뷰 이동 버튼 클릭 시
        else{
            // 자식 요소를 갖는 li태그는 e.target이 li가 안 되고 자식이 될 때가 있어(자식이 있는 영역 클릭시), li태그를 이런 방법으로 선택하게끔 구현함
            const clickedButton = e.target.tagName === "LI" ? e.target : e.target.closest("li");
            switch(clickedButton.dataset.value){
                case "first":
                    if(firstPage !== 1){
                        setFirstPage(1);
                        setPage(1);
                    }
                    break;
                case "prev":
                    if(firstPage - PAGES_PER_VIEW >= 1){
                        setFirstPage(firstPage - PAGES_PER_VIEW);
                        setPage(firstPage - PAGES_PER_VIEW);
                    }
                    break;
                case "next":
                    if(firstPage + PAGES_PER_VIEW <= lastFirstPage){
                        setFirstPage(firstPage + PAGES_PER_VIEW);
                        setPage(firstPage + PAGES_PER_VIEW);
                    }
                    break;
                case "last":
                    if(firstPage !== lastFirstPage){
                        setFirstPage(lastFirstPage);
                        setPage(lastFirstPage);
                    }
                    break;
                default:
                    break;

            }
        }
    }
    // firstPage가 바뀔 때마다 버튼스타일이 firstPage에 입혀지게끔
    useEffect(() => {
        const newCurrent = firstPageRef.current;
        removeStyleFromButton(newCurrent);
        addStyleToButton(newCurrent);
    }, [category, firstPage, keyword, categoryName])

    return(
        <ul className={styles.pagination} onClick={handleClickButton} >
            <li className={`${styles.button}`} data-value={"first"}><BsChevronDoubleLeft /></li>
            <li className={`${styles.button}`} data-value={"prev"}><BsChevronLeft /></li>
            <li className={`${styles.button} ${styles.page_button}`} ref={firstPageRef}>{firstPage}</li>
            <PageButtons firstPage={firstPage} lastPage={lastPage} />
            <li className={`${styles.button}`} data-value={"next"}><BsChevronRight /></li>
            <li className={`${styles.button}`} data-value={"last"}><BsChevronDoubleRight /></li>
        </ul>
    )
}

export default Pagination;