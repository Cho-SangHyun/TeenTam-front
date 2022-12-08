import React, { useContext, useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import logo from '../../assets/images/logo.png';
import { Link, useLocation } from 'react-router-dom';
import { AUTH } from '../../app';
import SearchBar from '../SearchBar/SearchBar';


// Nabigation Bar역할의 컴포넌트
// 로그인 전 후로 다른 모습 보여주도록 추후 작업이 필요
// 각 메뉴들을 클릭했을 때 해당 페이지로 연결하도록 하는 작업도 필요

const Navbar = ({ setPage, setFirstPage }) => {
    const [user, setUser] = useState(null);
    const authService = useContext(AUTH);

    const location = useLocation();

    const logout = () => {
        authService.logout(() => {
            // navigate: 같은 페이지로 가는 건 이동되지 않음..아래 코드는 /에서도 /로 이동이 됨(새로 고침)
            window.location.replace("/");
        })
    }

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if(userData){
            setUser(JSON.parse(userData));
        }
    }, [setUser])

    return(
        <nav className={styles.navbar}>
            <div className={styles.navbar_contents}>
                <Link to="/"><img className={styles.logo} src={logo} alt="TeenTam" /></Link>
                <ul className={styles.navbar_menu}>
                    <Link to="/boards" className={styles.navbar_menu_name}>커뮤니티</Link>
                    <Link to="/boards" className={styles.navbar_menu_name}>시간표</Link>
                    <Link to="/boards" className={styles.navbar_menu_name}>급식타임</Link>
                </ul>
                {
                    (location.pathname !== "/") && <SearchBar 
                        isInMainPage={false} 
                        setFirstPage={setFirstPage} 
                        setPage={setPage} 
                    />
                }
                <div className={styles.navbar_button_list}>
                    {
                        !user ? (
                            <>
                                <Link to='/login' className={`${styles.navbar_button} ${styles.go_to_login}`}>로그인</Link>
                                <Link to='/signup' className={`${styles.navbar_button} ${styles.go_to_signup}`}>회원가입</Link>       
                            </>
                        ) : (
                            <>
                                <Link to='/mypage' className={`${styles.navbar_button} ${styles.go_to_mypage}`}>마이페이지</Link>
                                <button 
                                    className={`${styles.navbar_button} ${styles.logout_button}`} 
                                    onClick={logout}>로그아웃</button>
                            </>
                        )
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar;