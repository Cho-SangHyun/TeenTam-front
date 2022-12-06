import React from 'react';
import PasswordChangeForm from '../PasswordChangeForm/PasswordChangeForm';
import ProfileImageForm from '../ProfileImageForm/ProfileImageForm';
import ProfileSettingForm from '../ProfileSettingForm/ProfileSettingForm';
import styles from './MyPageContent.module.css';

const MyPageContent = ({ tabMenu }) => {
    const user = JSON.parse(localStorage.getItem("user"));

    return(
        <section className={styles.mypage_content_section}>
            {
                tabMenu === "profile" ? (
                    <>
                        <ProfileImageForm />
                        <ProfileSettingForm />
                    </>
                ) : (
                    <PasswordChangeForm userId={user.id}/>
                )
            }
        </section>
    )
}

export default MyPageContent;