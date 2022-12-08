import React, { useState } from 'react';
import MyPageContent from '../MyPageContent/MyPageContent';
import MyPageTabBar from '../MyPageTabBar/MyPageTabBar';
import styles from './MyPageCard.module.css';

const MyPageCard = (props) => {
    const [tabMenu, setTabMenu] = useState("profile");

    return(
        <section className={styles.mypage_card}>
            <h1 className={styles.mypage_card_title}>마이페이지</h1>
            <section className={styles.mypage_section}>
                <MyPageTabBar setTabMenu={setTabMenu}/>
                <MyPageContent tabMenu={tabMenu}/>
            </section>
        </section>
    )
}

export default MyPageCard;