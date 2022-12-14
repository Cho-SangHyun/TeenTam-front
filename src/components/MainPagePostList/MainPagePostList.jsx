import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { BsChatDots } from "react-icons/bs";
import { CRUD } from '../../app';
import styles from './MainPagePostList.module.css';

const CATEGORY_NAME = {
    1: "μμ΄λπ",
    2: "μΉκ΅¬π­",
    3: "κ°μ‘±πͺ",
    4: "μΈ/μ°μ π",
    5: "νκ΅π«",
    6: "μ§λ‘π",
    7: "μ€νμΌπ",
    8: "κ³΅μ§μ¬ν­βοΈ",
}

const MainPagePostList = ({category}) => {
    const [postList, setPostList] = useState([]);
    const crudService = useContext(CRUD);

    useEffect(() => {
        const order = "pub_date";
        const page = 1;
        const offset = 5;
        crudService.getPostList(category, order, page, offset, setPostList);
    }, [category, crudService, setPostList])

    return(
        <>
            <div className={styles.board_header}>
                {CATEGORY_NAME[category]}
                <Link className={styles.go_more} to="/boards" state={{category}}>λλ³΄κΈ° &#62;</Link>
            </div>
            <ul className={styles.board_body}>
                {
                    postList.map(post => {
                        return(
                            <li key={post.id}>
                                <Link to={`/boards/${category}/id/${post.id}/`} className={styles.board_content}>
                                    {post.title}
                                    <span className={styles.content_info}>
                                        <BsChatDots className={styles.comment_icon} />
                                        <span className={styles.comment_count}>{post.comments_num}</span>
                                    </span>
                                </Link>
                            </li>   
                        )
                    })
                }
            </ul>    
        </>
    )
}
        
export default MainPagePostList;