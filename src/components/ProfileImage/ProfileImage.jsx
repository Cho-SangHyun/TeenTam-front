import React, { useState, useContext } from 'react';
import { useEffect } from 'react';
import { CRUD } from '../../app';
import styles from './ProfileImage.module.css';

const ProfileImage = ({ userId }) => {
    const [imageURL, setImageURL] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
    const crudService = useContext(CRUD);

    useEffect(() => {
        crudService.getProfileImageURL(userId, setImageURL);
    }, [crudService, userId, setImageURL])

    return(
        <>
            <img 
                src={imageURL} alt="프로필" 
                className={styles.avatar}
            />
        </>
    )
}

export default ProfileImage;