import React from 'react';
import TimeTable from '../TimeTable/TimeTable';
import { BsFillPlusSquareFill } from "react-icons/bs";
import styles from './TimeTableBoard.module.css';

const TimeTableBoard = ({ openModal, tableItems, setTableItems }) => {
    return(
        <section className={styles.time_table_board}>
            <h1 className={styles.time_table_board_title}>시간표</h1>
            <BsFillPlusSquareFill className={styles.add_button} onClick={openModal} />
            <TimeTable tableItems={tableItems} setTableItems={setTableItems} />
        </section>
    )
}

export default TimeTableBoard;