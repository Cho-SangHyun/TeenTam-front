import React from 'react';
import Pagination from '../Pagination/Pagination';
import PostCard from '../PostCard/PostCard';
import styles from './MyPostList.module.css';

const MyPostList = ({firstPage, postCount, postList, setFirstPage, setPage}) => {
    return(
        <section className={styles.post_list_section}>
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
                />
            </div>
        </section>
    )
}

export default MyPostList;