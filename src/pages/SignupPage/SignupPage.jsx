import React from 'react';
import styles from './SignupPage.module.css';

const SignupPage = (props) => {
    return(
        <div className={styles.signup_page}>
            <form className={styles.signup_form}>
                <h1 className={styles.signup_text}>회원가입</h1>
                <div className={styles.signup_input_box}>
                    <label className={styles.label} htmlFor={styles.email}>이메일</label>
                    <input placeholder='사용하실 이메일 주소를 입력해주세요' 
                        className={styles.signup_input} 
                        id={styles.email} 
                        type="email" 
                        name="email"
                    />
                    <p className={`${styles.error_message} ${styles.email_error}`}></p>
                </div>
                <div className={styles.signup_input_box}>
                    <label className={styles.label} htmlFor={styles.password}>비밀번호</label>
                    <input 
                        placeholder='사용하실 비밀번호를 입력해주세요'
                        className={styles.signup_input} 
                        id={styles.password} 
                        type="password" 
                        name="password"
                    />
                    <p className={`${styles.error_message} ${styles.password_error}`}></p>
                </div>
                <div className={styles.signup_input_box}>
                    <label className={styles.label} htmlFor={styles.password_confirm}>비밀번호 확인</label>
                    <input 
                        placeholder='비밀번호를 한 번 더 입력해주세요'
                        className={styles.signup_input} 
                        id={styles.password_confirm} 
                        type="password" 
                        name="password_confirm"
                    />
                    <p className={`${styles.error_message} ${styles.password_confirm_error}`}></p>
                </div>
                <div className={styles.signup_input_box}>
                    <label className={styles.label} htmlFor={styles.username}>닉네임</label>
                    <input 
                        placeholder='사용하실 닉네임을 입력해주세요'
                        className={styles.signup_input} 
                        id={styles.username} 
                        type="text" 
                        name="username"
                    />
                    <p className={`${styles.error_message} ${styles.username_error}`}></p>
                </div>
                <div className={styles.signup_input_box}>
                    <label className={styles.label} htmlFor={styles.birth}>생년월일</label>
                    <input 
                        placeholder='생년월일 8자리를 입력해주세요'
                        className={styles.signup_input} 
                        id={styles.birth} 
                        type="text" 
                        name="birth"
                    />
                    <p className={`${styles.error_message} ${styles.birth_error}`}></p>
                </div>
                <button className={styles.signup_button}>회원가입</button>
                <p className={styles.go_to_login}>이미 회원이신가요? <span className={styles.link_login}>로그인</span></p>
            </form>
        </div>
    )
}

export default SignupPage;