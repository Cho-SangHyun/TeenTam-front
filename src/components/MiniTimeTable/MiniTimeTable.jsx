import React, { useContext, useState, useEffect }  from 'react';
import { BiErrorCircle } from "react-icons/bi";
import { CRUD } from '../../app';
import styles from './MiniTimeTable.module.css';

const DAY_LABEL = {
    0: "일",
    1: "월",
    2: "화",
    3: "수",
    4: "목",
    5: "금",
    6: "토",
}

const createTable = (tableItems) => {
    const dayOfWeek = new Date().getDay();
    const validTableItems = tableItems.filter(item => (item.subject && item.day === dayOfWeek));
    const table = [];

    for (let i = 1; i <= 7; i++) {
        const item = validTableItems.filter(item => item.period === i)[0];
        if (item) {
            table.push(<li key={i}>{`${i}교시 : ${item.subject}`}</li>)
            continue;
        }
        table.push(<li key={i}>{`${i}교시 : - `}</li>)
    }


    return table;
}

const MiniTimeTable = ({user}) => {
    const crudService = useContext(CRUD);
    const [tableItems, setTableItems] = useState([]);
    const [today, setToday] = useState(new Date());

    useEffect(() => {
        crudService.getTimeTableItems(user.id, setTableItems);
    }, [user, crudService])

    return(
        <div className={styles.mini_time_table}>
            {
                user === null ? <div className={styles.backdrop}>
                    <BiErrorCircle className={styles.warning} />
                    <span className={styles.login_message}>로그인 후 이용 가능합니다.</span>
                </div> : null
            }
            <h2 className={styles.mini_time_table_title}>📅 오늘의 시간표</h2>
            <span className={styles.today_info}>
                {`${today.getFullYear() % 100}년 ${today.getMonth() + 1}월 ${today.getDate()}일 ${DAY_LABEL[today.getDay()]}요일`}
            </span>
            <ul className={styles.table_items}>
                {createTable(tableItems)}
            </ul>
        </div>
    );
}

export default MiniTimeTable;