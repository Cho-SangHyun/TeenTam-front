import React, { useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiLike } from "react-icons/bi";
import { AiOutlineEye } from "react-icons/ai";
import { BsChatDots } from "react-icons/bs";
import { getElapsedTime } from '../../services/times';
import { TbDotsVertical } from "react-icons/tb";
import { CRUD } from '../../app';
import styles from './PostContent.module.css';
import ProfileImage from '../ProfileImage/ProfileImage';

const PostContent = ({post, setPost, category}) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const crudService = useContext(CRUD);

    const moreRef = useRef();
    const navigate = useNavigate();
    // 좋아요
    const handleClickLike = () => {
        crudService.updatePostLike(user.id, post.boards_id, setPost);
    }
    // 더보기 클릭 시(점 세개짜리)
    const handleClickMore = () => {
        moreRef.current.classList.toggle(styles.show_more);
    }
    // 수정 or 삭제 클릭 시. 수정은 추후 더 구현이 필요
    const handleClickEditOrDelete = (e) => {
        if(e.target.tagName === "LI"){
            switch(e.target.dataset.value){
                case "edit":
                    navigate("/edit-post", {
                        state: {
                            category,
                            id: post.boards_id
                        }
                    })
                    break;
                case "delete":
                    crudService.deletePost(user.id, post.boards_id, navigate);
                    break;
                default:
                    break;
            }
        }
    }

    return(
        <section className={styles.post_content_section}>
            <h1 className={styles.post_title}>{post?.title}</h1>
            {
                user?.id === post?.boards_writer && (
                    <>
                        <TbDotsVertical className={styles.click_more} onClick={handleClickMore} />
                        <ul className={styles.edit_or_delete} ref={moreRef} onClick={handleClickEditOrDelete}>
                            <li className={styles.edit} data-value="edit">수정하기</li>
                            <li className={styles.delete} data-value="delete">삭제하기</li>
                        </ul>
                    </>
                )
            }
            <div className={styles.post_info}>
                <span className={styles.post_writer_icon}>
                    <ProfileImage userId={post.boards_writer} />
                </span>
                <span className={styles.post_writer}>{post?.writer_username}</span>
                <span className={styles.post_pub_date}>{getElapsedTime(post?.pub_date)}</span>
                <span className={styles.view_info}>
                    <AiOutlineEye className={styles.view_icon} />
                    <span className={styles.view_count}>{post?.hit}</span>
                </span>
                <span className={styles.like_info}>
                    <BiLike className={styles.like_icon} />
                    <span className={styles.like_count}>{post?.like}</span>
                </span>
                <span className={styles.comment_info}>
                    <BsChatDots className={styles.comment_icon} />
                    <span className={styles.comment_count}>{post?.comments_num}</span>
                </span>
            </div>
            <div className={styles.empty_box}></div>
            <pre className={styles.post_content}>{post?.content}</pre>
            <button className={styles.like_button} onClick={handleClickLike} >
                <BiLike className={styles.like_icon} /> &nbsp;공감
            </button>
        </section>
    )
}

export default PostContent;