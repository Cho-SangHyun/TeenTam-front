import React from 'react';
import { Link } from 'react-router-dom';
import ProfileImage from '../ProfileImage/ProfileImage';
import styles from './MainPageProfile.module.css';

// 메인페이지 우측 MainPageSideSection 컴포넌트에서 프로필을 보여주는 컴포넌트
// 로그인 전 / 후로 다른 모습을 보여주도록 해야 함 o
// 마이페이지에서 보이는 프로필은 MyPageProfile이란 이름으로 따로 만드는 게 좋을 듯 함

const MainPageProfile = ({ user }) => {
    return(
        <div className={`${styles.main_page_profile} ${user ? styles.has_user : styles.has_no_user}`}>
            {
                user ? (
                    <>
                        <div className={styles.profile}>
                            <span className={styles.profile_image}>
                                <ProfileImage userId={user.id} />
                            </span>
                            <span className={styles.intro_message}>안녕하세요,<br/>{user.username}님!</span>
                        </div>
                        <div className={styles.user_info}>
                            <div className={styles.school_info}>
                                <p className={styles.school_name_info}><b>학교 정보</b><span className={styles.school_name}>정보 없음</span></p>
                                <p className={styles.grade_info}><b>학년</b><span className={styles.grade}>정보 없음</span></p>
                            </div>
                            <div className={styles.activity_info}>
                                <div className={styles.level_info}>내 레벨<span className={styles.value}>LV.1</span></div>
                                <div className={styles.post_info}>작성한 글<span className={styles.value}>-</span></div>
                                <div className={styles.comment_info}>작성한 댓글<span className={styles.value}>-</span></div>
                            </div>
                        </div>
                        <Link to='/mypage' className={`${styles.button} ${styles.profile_edit_button}`}>프로필 수정하기</Link>
                    </>
                ) : (
                    <>
                        <div className={styles.profile}>
                            <span className={styles.profile_image}></span>
                            <span className={styles.intro_message}>로그인 후 이용 가능합니다.</span>
                        </div>
                        <Link to='/login' className={`${styles.button} ${styles.login_button}`}>로그인하기</Link>
                    </>
                )
            }
        </div>
    )
}

export default MainPageProfile;