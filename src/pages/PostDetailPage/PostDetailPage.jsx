import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AUTH, CRUD } from '../../app';
import CommentCreateForm from '../../components/CommentCreateForm/CommentCreateForm';
import CommentsList from '../../components/CommentsList/CommentsList';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import PostContent from '../../components/PostContent/PostContent';
import styles from './PostDetailPage.module.css';

const PostDetailPage = (props) => {
    const [post, setPost] = useState({});
    const [commentsList, setCommentsList] = useState([]);

    const crudService = useContext(CRUD);
    const authService = useContext(AUTH);

    const navigate = useNavigate();

    const params = useParams();
    
    const boardsCategory = params.boards_category;
    const boardsId = params.boards_id;

    const onCreaateComentsList = (commentsList) => {
        setCommentsList(commentsList);
        setPost({
            ...post,
            comments_num: commentsList.length
        });
    }

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
                    const userId = JSON.parse(userData).id;
                    crudService.getPost(boardsCategory, boardsId, userId, setPost, setCommentsList);
                }
                else{
                    alert("로그인이 만료됐습니다. 다시 로그인해주세요");
                    navigate("/login");
                }
            }
        }
        keepLogin();
    }, [authService, navigate, crudService, boardsCategory, boardsId, setPost, setCommentsList])

    return(
        <div className={styles.post_detail_page}>
            <Navbar />
            <PostContent post={post} setPost={setPost} category={boardsCategory} />
            <CommentCreateForm boardsId={boardsId} onCreate={onCreaateComentsList}/>
            <CommentsList commentsList={commentsList} setCommentsList={setCommentsList} />
            <Footer />
        </div>
    )
}

export default PostDetailPage;