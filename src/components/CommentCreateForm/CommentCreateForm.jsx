import React, { useRef, useState, useContext } from 'react';
import { CRUD } from '../../app';
import styles from './CommentCreateForm.module.css';

const MAX_LENGTH = 1000;

const CommentCreateForm = ({ boardsId, onCreate }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [wordCount, setWordCount] = useState(0);

    const crudService = useContext(CRUD);
    const commentRef = useRef();

    // 글자 수 세서 1000자 이상이면 더 이상 못 써지도록
    const handleChangeComment = () => {
        if(commentRef.current.value.length > MAX_LENGTH){
            commentRef.current.value = commentRef.current.value.substr(0, MAX_LENGTH);
        }
        const comment = commentRef.current.value;
        setWordCount(comment.length);
    }

    const handleClickCreateComment = (e) => {
        e.preventDefault();
        const comment = commentRef.current.value;
        if(validate(comment)){
            crudService.createComment(user.id, boardsId, comment, onCreate);
            commentRef.current.value = "";
        }
    }

    const validate = (comment) => {
        if(comment.length === 0){
            alert("댓글을 입력해주세요");
            return false;
        }
        return true;
    }

    return(
        <form className={styles.comment_create_form}>
            <textarea
                onChange={handleChangeComment} 
                placeholder='댓글 남기기' 
                className={styles.comment_input} 
                type="text" 
                name="comment"
                ref={commentRef}
                maxLength={MAX_LENGTH}
            >
            </textarea>
            <span className={styles.comment_word_count}>{wordCount}/1000자</span>
            <button className={styles.create_comment_button} onClick={handleClickCreateComment}>댓글 등록</button>
        </form>
    )
}

export default CommentCreateForm;