import React, { useState, useRef, useCallback, useEffect } from 'react';
import { IoCloseOutline } from "react-icons/io5";
import styles from "./MessageModal.module.css";

const MessageModal = ({ closeModal, receiver }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const modalRef = useRef();

    const [content, setContent] = useState("");

    const closeModalByESC = useCallback((e) => {
        if(e.key === 'Escape'){
            closeModal();
        }
    }, [closeModal]);

    const closeModalByOutsideClick = useCallback(e => {
        if(!modalRef.current.contains(e.target)){
            closeModal();
        }
    }, [closeModal]);

    const handleChange = (e) => {
        setContent(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content) {
            alert("내용을 입력해주세요");
            return;
        }
        console.log("보낸이 : ", user.id);
        console.log("받는이 : ", receiver);
    };

    useEffect(() => {
        document.body.style.cssText = `
          position: fixed; 
          top: -${window.scrollY}px;
          overflow-y: scroll;
          width: 100%;`;
        document.addEventListener('keydown', closeModalByESC);
        document.addEventListener("click", closeModalByOutsideClick);
        return () => {
            document.removeEventListener('keydown', closeModalByESC);
            document.removeEventListener("click", closeModalByOutsideClick);
            const scrollY = document.body.style.top;
            document.body.style.cssText = '';
            window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
        };
    }, [closeModalByESC, closeModalByOutsideClick]);
      
    return(
        <div className={styles.modal_background}>
            <div className={styles.messageModal} ref={modalRef}>
                <span className={styles.send_message_title}>쪽지 보내기</span>
                <span className={styles.closeModal} onClick={closeModal}><IoCloseOutline/></span>
                <form className={styles.messageForm} onSubmit={handleSubmit}>
                    <textarea className={styles.formInput} value={content} name="note" placeholder='내용을 작성하세요' onChange={handleChange} ></textarea>
                    <button className={styles.send_button}>전송</button>
                </form>
            </div>
        </div>
    )
}

export default MessageModal;