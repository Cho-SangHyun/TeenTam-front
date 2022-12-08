import React from 'react';
import { Link } from 'react-router-dom';
import { getElapsedTime } from '../../services/times';
import { AiOutlineEye } from "react-icons/ai";
import { BiLike } from "react-icons/bi";
import { BsChatDots } from "react-icons/bs";
import styles from './PostCard.module.css';
import ProfileImage from '../ProfileImage/ProfileImage';

// 댓글 개수도 가져올 수 있어야 함!

const CATEGORY_NAME = {
    0: "전체",
    1: "아이돌",
    2: "친구",
    3: "가족",
    4: "썸/연애",
    5: "학교",
    6: "진로",
    7: "스타일",
    8: "공지사항",
}

const PostCard = ({ post }) => {
    return(
        <Link to={`/boards/${post.boards_category}/id/${post.id}/`} className={styles.post_card}>
            <div className={styles.related_categories}>
                <div className={styles.category_box}>{CATEGORY_NAME[post.boards_category]}</div>
            </div>
            <h2 className={styles.post_title}>{post.title}</h2>
            <p className={styles.post_content}>{post.content}</p>
            <div className={styles.post_info}>
                <span className={styles.writer_info}>
                    <span className={styles.post_writer_icon}>
                        <ProfileImage userId={post.boards_writer} />
                    </span>
                    <span className={styles.post_writer}>{post.username}</span>
                </span>
                <span className={styles.post_pub_date}>{getElapsedTime(post.pub_date)}</span>
                <span className={styles.count_info}>
                    <span className={styles.view_info}>
                        <AiOutlineEye className={styles.view_icon} />
                        <span className={styles.view_count}>{post.hit}</span>
                    </span>
                    <span className={styles.like_info}>
                        <BiLike className={styles.like_icon} />
                        <span className={styles.like_count}>{post.like}</span>
                    </span>
                    <span className={styles.comment_info}>
                        <BsChatDots className={styles.comment_icon} />
                        <span className={styles.comment_count}>{post.comments_num}</span>
                    </span>
                </span>
            </div>
        </Link>
    )
}

export default PostCard;