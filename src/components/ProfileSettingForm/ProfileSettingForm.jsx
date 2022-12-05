import React, { useState, useRef, useContext } from 'react';
import { AUTH } from '../../app';
import { getSchoolInfo } from '../../services/school_lunch';
import styles from './ProfileSettingForm.module.css';

const ProfileSettingForm = ({ user }) => {
    const authService = useContext(AUTH);

    const [username, setUsername] = useState(user.username);
    const [schoolName, setSchoolName] = useState(user.school || "");
    const [grade, setGrade] = useState("0");

    const [isUsernameChecked, setIsUsernameChecked] = useState(true);
    const [isSchoolNameChecked, setIsSchoolNameChecked] = useState(true);

    const errorRef = {
        usernameErrorRef: useRef(),
        schoolNameErrorRef: useRef(),
        gradeErrorRef: useRef()
    }

    const handleChangeUsername = (e) => {
        const newUsername = e.target.value;
        setUsername(newUsername);
    }

    const handleChangeSchoolName = (e) => {
        const newSchoolName = e.target.value.trim();
        setSchoolName(newSchoolName);
    }

    const handleChangeGrade = (e) => {
        const newGrade = e.target.value;
        setGrade(newGrade);
    }

    const handleBlurUsernameInput = async (e) => {
        if (username === user.username) {
            setIsUsernameChecked(true);
            return;
        }
        if (!username) {
            setIsUsernameChecked(false);
            errorRef.usernameErrorRef.current.classList.remove(styles.done_check);
            errorRef[e.target.name + 'ErrorRef'].current.innerText = "닉네임은 반드시 입력해야 합니다";
            return;
        }
        
        const checkResult = await authService.checkUsername(username);

        if(checkResult){
            setIsUsernameChecked(true);
            errorRef.usernameErrorRef.current.classList.add(styles.done_check);
            errorRef[e.target.name + 'ErrorRef'].current.innerText = "✔ 사용가능한 닉네임입니다";
        }
        else{
            setIsUsernameChecked(false);
            errorRef.usernameErrorRef.current.classList.remove(styles.done_check);
            errorRef[e.target.name + 'ErrorRef'].current.innerText = "사용할 수 없는 닉네임입니다";
        }
    }

    const handleBlurSchoolNameInput = async (e) => {
        if (!schoolName) {
            setIsSchoolNameChecked(true);
            return;
        }
        if (schoolName.slice(-4) !== "고등학교") {
            setIsSchoolNameChecked(false);
            errorRef.schoolNameErrorRef.current.classList.remove(styles.done_check);
            errorRef[e.target.name + 'ErrorRef'].current.innerText = "입력하신 학교명이 올바르지 않습니다";    
            return;
        }
        if (user.school && schoolName === user.school) {
            return;
        }

        try {
            const checkResult = await getSchoolInfo(schoolName);
            setIsSchoolNameChecked(true);
            errorRef.schoolNameErrorRef.current.classList.add(styles.done_check);
            errorRef[e.target.name + 'ErrorRef'].current.innerText = "✔ 입력하신 학교에 대한 정보가 존재합니다";
        } catch (error) {
            setIsSchoolNameChecked(false);
            errorRef.schoolNameErrorRef.current.classList.remove(styles.done_check);
            errorRef[e.target.name + 'ErrorRef'].current.innerText = "입력하신 학교에 대한 정보가 존재하지 않습니다";    
        }
    }

    //  인풋태그 에러메시지를 지우는 함수
    const cleanErrorMessage = (refName) => {
        errorRef[refName].current.innerText = "";
    }

    // 인풋태그 클릭하면 해당 인풋과 관련된 오류메시지를 지움
    const handleFocusInput = (e) => {
        const refName = e.target.name + 'ErrorRef';
        cleanErrorMessage(refName);
    }
    
    const handleClickProfileSetting = (e) => {
        e.preventDefault();
        
        if (!isUsernameChecked || !isSchoolNameChecked) {
            return;
        }

        const res = window.confirm("저장하시겠습니까?");
        if (res) {
            settingUsername();
            settingSchoolName();
            settingGrade();
        }
    }

    const settingUsername = () => {
        if (username !== user.username) {
            console.log("닉네임 변경 완료");
        }
    }

    const settingSchoolName = () => {
        if (!schoolName && !user.school) {
            return;
        }
        if (schoolName === user.school) {
            return;
        }
        console.log("학교명 변경 완료");
    }

    const settingGrade = () => {
        console.log("학년 정보 변경 완료");
    }

    return(
        <form className={styles.profile_setting_form}>
            <div className={styles.profile_setting_input_box}>
                <label className={styles.label} htmlFor={styles.username}>닉네임</label>
                <input
                    onFocus={handleFocusInput}
                    onChange={handleChangeUsername}
                    onBlur={handleBlurUsernameInput}
                    placeholder='닉네임'
                    value={username}  
                    className={styles.profile_setting_input} 
                    id={styles.username} 
                    type="text" 
                    name="username"
                />
                <p className={styles.error_message} ref={errorRef.usernameErrorRef}></p>
            </div>
            <div className={styles.profile_setting_input_box}>
                <label className={styles.label} htmlFor={styles.email}>이메일</label>
                <input 
                    value={user.email}
                    disabled={true}
                    className={styles.profile_setting_input} 
                    id={styles.email} 
                    type="email" 
                    name="email"
                />
            </div>
            <div className={styles.profile_setting_input_box}>
                <label className={styles.label} htmlFor={styles.schoolName}>학교</label>
                <input
                    value={schoolName}
                    onFocus={handleFocusInput}
                    onChange={handleChangeSchoolName}
                    onBlur={handleBlurSchoolNameInput}
                    className={styles.profile_setting_input} 
                    id={styles.schoolName} 
                    type="text" 
                    name="schoolName"
                />
                <p className={styles.error_message} ref={errorRef.schoolNameErrorRef}></p>
            </div>
            <div className={styles.profile_setting_input_box}>
                <label className={styles.label} htmlFor={styles.grade}>학년</label>
                <select id={styles.grade} className={styles.profile_setting_input} onChange={handleChangeGrade} value={grade}>
                    <option value="0">선택 안 함</option>
                    <option value="1">1학년</option>
                    <option value="2">2학년</option>
                    <option value="3">3학년</option>
                </select>
            </div>
            <div className={styles.profile_setting_button_box}>
                <button className={styles.profile_setting_button} onClick={handleClickProfileSetting} >변경 완료</button>
            </div>
        </form>
    )
}

export default ProfileSettingForm;