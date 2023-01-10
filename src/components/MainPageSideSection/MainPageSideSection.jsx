import React, { useState } from 'react';
import MainPageProfile from '../MainPageProfile/MainPageProfile';
import MiniTimeTable from '../MiniTimeTable/MiniTimeTable';
import SchoolLunchCard from '../SchoolLunchCard/SchoolLunchCard';
import styles from './MainPageSideSection.module.css';

// MainPage 우측 SideSection컴포넌트

const MainPageSideSection = (props) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

    return(
        <section className={styles.main_page_side_section}>
            <section className={styles.side_menus}>
                <MainPageProfile user={user} />
                <SchoolLunchCard user={user} />
                <MiniTimeTable user={user} />
            </section>
        </section>
    )
}

export default MainPageSideSection;