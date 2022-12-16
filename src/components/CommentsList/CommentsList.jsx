import React from 'react';
import Comment from '../Comment/Comment';
import styles from './CommentsList.module.css';

const CommentsList = ({ commentsList, setCommentsList, openModal, setReceiverId }) => {
    const onDelete = (deleteCommentId) => {
        const newCommentsList = commentsList.map(comment => {
            if (comment.id === deleteCommentId) 
                comment.delete_date = "1";
            return comment;
        });
        setCommentsList(newCommentsList);
    }

    return(
        <section className={styles.comments_list_section}>
            <h1 className={styles.comments_info}>댓글 {commentsList.length}개</h1>
            <div className={styles.comments_list}>
            {
                commentsList.map(comment => {
                    return <Comment 
                        key={comment.id} 
                        comment={comment} 
                        onDelete={onDelete} 
                        openModal={openModal} 
                        setReceiverId={setReceiverId} 
                    />
                })
            }
            </div>
        </section>
    )
}

export default CommentsList;