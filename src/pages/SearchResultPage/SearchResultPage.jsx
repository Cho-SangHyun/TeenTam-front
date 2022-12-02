import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AUTH } from '../../app';
import SearchBoards from '../../components/SearchBoards/SearchBoards';
import Footer from '../../components/Footer/Footer';
import MainPageSideSection from '../../components/MainPageSideSection/MainPageSideSection';
import Navbar from '../../components/Navbar/Navbar';
import styles from './SearchResultPage.module.css';

const SearchResultPage = (props) => {
    const authService = useContext(AUTH);
    const navigate = useNavigate();

    const [firstPage, setFirstPage] = useState(1);
    const [page, setPage] = useState(1);

    useEffect(() => {
        async function keepLogin(){
            const userData = localStorage.getItem("user");
            if(userData){
                const res = await authService.refreshAccessToken();
                if(!res){
                    alert("로그인이 만료됐습니다. 다시 로그인해주세요");
                    navigate("/login");
                }
            }
        }
        keepLogin();
    }, [authService, navigate]);
    
    return(
        <section className={styles.boards_page}>
            <Navbar setPage={setPage} setFirstPage={setFirstPage} />
            <section className={styles.boards_main}>
                <SearchBoards page={page} setPage={setPage} firstPage={firstPage} setFirstPage={setFirstPage} />
                <MainPageSideSection />
            </section>
            <Footer />
        </section>
    );
}

export default SearchResultPage;