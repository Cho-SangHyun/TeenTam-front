import React, { useContext, useState } from 'react';
import ProfileImage from '../ProfileImage/ProfileImage';
import { getElapsedTime } from '../../services/times';
import { BiTrashAlt } from "react-icons/bi";
import { FiSend } from "react-icons/fi";
import { CRUD } from '../../app';
import styles from './Comment.module.css';

const Comment = ({ comment, onDelete }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const crudService = useContext(CRUD);

    const handleClickDelete = async () => {
        await crudService.deleteComment(user.id, comment.id, onDelete);
    }

    const handleClickSend = () => {
        alert("쪽지를 보냅니다!");
    }

    return(
        <div className={styles.comment}>
            <div className={styles.comment_info}>
                {
                    !comment.delete_date && (
                        <>
                            <span className={styles.comment_writer}>{comment.username}</span>
                            <span className={styles.comment_pub_date}>{getElapsedTime(comment.pub_date)}</span>
                            { user.id !== comment.comments_writer && (
                                <FiSend 
                                    className={styles.send_note_icon} 
                                    onClick={handleClickSend}
                                />)
                            }
                            { user.id === comment.comments_writer && (
                                <BiTrashAlt 
                                    className={styles.comment_delete_button} 
                                    onClick={handleClickDelete}
                                />)
                            }
                        </>
                    )
                }
                <div className={styles.comment_writer_image}>
                    <ProfileImage userId={comment.comments_writer} />
                </div>
            </div>
            <pre className={`${styles.comment_content} ${comment.delete_date && styles.delete_message}`}>
                {!comment.delete_date ? comment.content : "삭제된 댓글입니다."}
            </pre>
        </div>
    )
}

export default Comment;