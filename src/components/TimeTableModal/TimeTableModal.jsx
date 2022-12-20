import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useContext } from 'react';
import { IoCloseOutline } from "react-icons/io5";
import { CRUD } from '../../app';
import styles from "./TimeTableModal.module.css";

const TimeTableModal = ({ closeModal, setTableItems }) => {
    const crudService = useContext(CRUD);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const modalRef = useRef();
    const errorRef = {
        subjectErrorRef: useRef(),
        dayOfWeekErrorRef: useRef(),
        periodErrorRef: useRef(),
    }

    const [subject, setSubject] = useState("");
    const [dayOfWeek, setDayOfWeek] = useState(0);
    const [period, setPeriod] = useState(0);

    const closeModalByESC = useCallback((e) => {
        if(e.key === 'Escape'){
            closeModal();
        }
    }, [closeModal]);

    const handleChangeSubject = (e) => {
        setSubject(e.target.value);
    };

    const handleChangeDayOfWeek = (e) => {
        cleanErrorMessage("dayOfWeekErrorRef");
        setDayOfWeek(e.target.value);
    };

    const handleChangePeriod = (e) => {
        cleanErrorMessage("periodErrorRef");
        setPeriod(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (dayOfWeek === 0) {
            printErrorMessage("dayOfWeek", "요일을 선택해주세요");
            return;
        }
        if (period === 0) {
            printErrorMessage("period", "교시를 선택해주세요");
            return;
        }
        if (!subject) {
            printErrorMessage("subject", "과목명을 입력해주세요");
            return;
        }
        crudService.createTimeTableItem(4, period, dayOfWeek, subject, setTableItems);
    };

    // 인풋태그 클릭하면 해당 인풋과 관련된 오류메시지를 지움
    const handleFocusInput = (e) => {
        const refName = e.target.name + 'ErrorRef';
        cleanErrorMessage(refName);
    }

    // 에러메시지 출력
    const printErrorMessage = (category, message) => {
        const refName = category + "ErrorRef";
        errorRef[refName].current.innerText = message;
    }
    //  인풋태그 에러메시지를 지우는 함수
    const cleanErrorMessage = (refName) => {
        errorRef[refName].current.innerText = "";
    }

    useEffect(() => {
        document.body.style.cssText = `
          position: fixed; 
          top: -${window.scrollY}px;
          overflow-y: scroll;
          width: 100%;`;
        document.addEventListener('keydown', closeModalByESC);
        return () => {
            document.removeEventListener('keydown', closeModalByESC);
            const scrollY = document.body.style.top;
            document.body.style.cssText = '';
            window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
        };
    }, [closeModalByESC]);
      
    return(
        <div className={styles.modal_background}>
            <div className={styles.time_table_modal} ref={modalRef}>
                <span className={styles.add_title}>시간표 추가하기</span>
                <span className={styles.closeModal} onClick={closeModal}><IoCloseOutline/></span>
                <form className={styles.time_table_form} onSubmit={handleSubmit}>
                    <div className={styles.time_table_input_box}>
                        <label className={styles.label} htmlFor={styles.dayOfWeek}>요일</label>
                        <select 
                            id={styles.dayOfWeek} 
                            className={styles.time_table_input} 
                            onChange={handleChangeDayOfWeek} 
                            value={dayOfWeek}
                        >
                            <option value={0}> - </option>
                            <option value={1}>월</option>
                            <option value={2}>화</option>
                            <option value={3}>수</option>
                            <option value={4}>목</option>
                            <option value={5}>금</option>
                        </select>
                        <p className={styles.error_message} ref={errorRef.dayOfWeekErrorRef}></p>
                    </div>
                    <div className={styles.time_table_input_box}>
                        <label className={styles.label} htmlFor={styles.period}>교시</label>
                        <select 
                            id={styles.period} 
                            className={styles.time_table_input} 
                            onChange={handleChangePeriod} 
                            value={period}
                        >
                            <option value={0}> - </option>
                            <option value={1}>1교시</option>
                            <option value={2}>2교시</option>
                            <option value={3}>3교시</option>
                            <option value={4}>4교시</option>
                            <option value={5}>5교시</option>
                            <option value={6}>6교시</option>
                            <option value={7}>7교시</option>
                        </select>
                        <p className={styles.error_message} ref={errorRef.periodErrorRef}></p>
                    </div>
                    <div className={styles.time_table_input_box}>
                        <label className={styles.label} htmlFor={styles.subject}>과목명</label>
                        <input 
                            onFocus={handleFocusInput}
                            onChange={handleChangeSubject}
                            className={`${styles.time_table_input} ${styles.subject_input}`} 
                            id={styles.subject} 
                            type="text" 
                            name="subject"
                            value={subject}
                        />
                        <p className={styles.error_message} ref={errorRef.subjectErrorRef}></p>
                    </div>
                    <button className={styles.add_button}>추가</button>
                </form>
            </div>
        </div>
    )
}

export default TimeTableModal;