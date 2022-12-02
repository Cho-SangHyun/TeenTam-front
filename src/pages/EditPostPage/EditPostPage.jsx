import React, { useContext, useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import WritePostBar from '../../components/WritePostBar/WritePostBar';
import { AUTH, CRUD } from '../../app';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './EditPostPage.module.css';

const EditPostPage = (props) => {
    const crudService = useContext(CRUD);
    const authService = useContext(AUTH);
    const navigate = useNavigate();
    const location = useLocation();

    const boardsCategory = location.state?.category;
    const boardsId = location.state?.id;

    const [user, setUser] = useState(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        async function keepLogin(){
            const userData = localStorage.getItem("user");
            if(!userData){
                alert("로그인이 필요한 페이지입니다");
                navigate("/login");
            }
            else{
                const res = await authService.refreshAccessToken();
                if(res){
                    setUser(JSON.parse(userData));
                    const userId = JSON.parse(userData).id;
                    crudService.getOldPost(boardsCategory, boardsId, userId, setTitle, setContent);
                }
                else{
                    alert("로그인이 만료됐습니다. 다시 로그인해주세요");
                    navigate("/login");
                }
            }
        }
        keepLogin();
    }, [navigate, boardsCategory, boardsId, authService, crudService]);

    const handleChangeTitle = (e) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
    }
    // content조정 및 자동으로 textArea 높이 조정 
    const handleChangeContent = (e) => {
        const newContent = e.target.value;
        setContent(newContent);
        e.target.style.height = "auto";
        e.target.style.height = e.target.scrollHeight + "px";
    }
    // 글 작성 
    const handleClickWrite = (e) => {
        e.preventDefault();
        
        if(validation(title, content)){
            crudService.updatePost(
                boardsId, 
                user.id, 
                title, 
                content, 
                navigate
            );
        }
    }
    // 유효성검사
    const validation = (title, content) => {
        if(!title){
            alert("제목을 입력해주세요");
            return false;
        }
        else if(!content){
            alert("본문을 입력해주세요");
            return false;
        }
        return true;
    }

    return(
        <div className={styles.write_post_page}>
            <Navbar />
            <form className={styles.write_post_form}>
                <div className={styles.write_post_input_box}>
                    <select className={styles.category_input} value={boardsCategory} disabled={true}>
                        <option value="" >카테고리</option>
                        <option value="1">아이돌</option>
                        <option value="2">친구</option>
                        <option value="3">가족</option>
                        <option value="4">썸/연애</option>
                        <option value="5">학교</option>
                        <option value="6">진로</option>
                        <option value="7">스타일</option>
                    </select>
                </div>
                <div className={styles.write_post_input_box}>
                    <input 
                        onChange={handleChangeTitle}
                        placeholder='제목' 
                        className={styles.title_input} 
                        id={styles.title} 
                        type="text" 
                        name="title"
                        value={title}
                    />
                </div>
                <div className={styles.write_post_input_box}>
                    <textarea 
                        onChange={handleChangeContent}
                        placeholder='본문을 입력해 주세요' 
                        className={styles.content_input} 
                        id={styles.content} 
                        type="text" 
                        name="content"
                        rows={1}
                        value={content}
                    >
                    </textarea>
                </div>
            </form>
            <WritePostBar handleWrite={handleClickWrite} />
        </div>
    )
}

export default EditPostPage;