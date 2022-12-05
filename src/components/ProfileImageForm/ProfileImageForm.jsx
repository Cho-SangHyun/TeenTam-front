import React, { useState, useRef } from 'react';
import styles from './ProfileImageForm.module.css';

const ProfileImageForm = (props) => {
    const [imageURL, setImageURL] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
    const inputRef = useRef();

    return(
        <form className={styles.profile_image_form}>
            <img 
                src={imageURL} alt="프로필" 
                className={styles.avatar}
            />
            <label className={styles.profile_upload} htmlFor={styles.profile_input}>프로필 변경</label>
            <input
                ref={inputRef}
                id={styles.profile_input}
                type="file"
                accept="image/*"
                name="profile_image"
            />
        </form>
    )
}

export default ProfileImageForm;