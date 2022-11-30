import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../Pagination/Pagination';
import PostCard from '../PostCard/PostCard';
import styles from './PostList.module.css';

const PostList = ({category, firstPage, postCount, postList, setFirstPage, setPage, setOrder, keyword}) => {
    const [orderName, setOrderName] = useState("최신순");

    const handleSelectOrder = (e) => {
        if(e.target.tagName === "LI"){
            setOrder(e.target.dataset.value);
            switch(e.target.dataset.value) {
                case 'pub_date':  
                    setOrderName("최신순");
                    break;
                case 'hit':  
                    setOrderName("조회순");
                    break;
                case 'like':
                    setOrderName("좋아요순");
                    break;
                default:
                    break;    
            }
        }
    }

    return(
        <section className={styles.post_list_section}>
            <div className={styles.button_list}>
                <div className={styles.dropdown_order_menu}>
                    <button className={styles.set_order_button}>{orderName}</button>
                    <ul className={styles.order_list} onClick={handleSelectOrder} >
                        <li className={styles.order} data-value="pub_date">최신순</li>
                        <li className={styles.order} data-value="hit">조회순</li>
                        <li className={styles.order} data-value="like">좋아요순</li>
                    </ul>
                </div>
                <Link to="/write-post" className={styles.go_to_write_post}>게시글 작성하기</Link>
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
                    category={category}
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

export default PostList;