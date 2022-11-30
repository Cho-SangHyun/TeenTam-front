import React from 'react';
import Pagination from '../Pagination/Pagination';
import PostCard from '../PostCard/PostCard';
import styles from './SearchResultList.module.css';

const SearchResultList = ({firstPage, postCount, postList, setFirstPage, setPage, keyword, categoryName, setCategoryName}) => {
    const handleSelectCategory = (e) => {
        if(e.target.tagName === "LI"){
            setCategoryName(e.target.dataset.value);
        }
    }

    return(
        <section className={styles.search_result_list_section}>
            <div className={styles.button_list}>
                <div className={styles.dropdown_category_menu}>
                    <button className={styles.set_category_button}>{categoryName}</button>
                    <ul className={styles.category_list} onClick={handleSelectCategory} >
                        <li className={styles.category} data-value="전체 게시판">전체 게시판</li>
                        <li className={styles.category} data-value="아이돌">아이돌</li>
                        <li className={styles.category} data-value="친구">친구</li>
                        <li className={styles.category} data-value="가족">가족</li>
                        <li className={styles.category} data-value="썸/연애">썸/연애</li>
                        <li className={styles.category} data-value="학교">학교</li>
                        <li className={styles.category} data-value="진로">진로</li>
                        <li className={styles.category} data-value="스타일">스타일</li>
                        <li className={styles.category} data-value="공지사항">공지사항</li>
                    </ul>
                </div>
            </div>
            <p className={styles.post_count_introduce}>
                총 <span className={styles.post_count}>{postCount}</span>개의 토픽이 있습니다.
            </p>
            <div className={styles.post_list}>
                {
                    postList.map((post) => {
                        return <PostCard key={post.id} post={post}/>;
                    })
                }
            </div>
            <div className={styles.pagination}>
                <Pagination 
                    firstPage={firstPage} 
                    postCount={postCount} 
                    setFirstPage={setFirstPage} 
                    setPage={setPage}
                    keyword={keyword}
                />
            </div>
        </section>
    )
}

export default SearchResultList;