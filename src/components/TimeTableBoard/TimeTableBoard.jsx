import React from 'react';
import TimeTable from '../TimeTable/TimeTable';
import styles from './TimeTableBoard.module.css';

const TimeTableBoard = (props) => {
    return(
        <section className={styles.time_table_board}>
            <h1 className={styles.time_table_board_title}>시간표</h1>
            <TimeTable />
        </section>
    )
}

export default TimeTableBoard;