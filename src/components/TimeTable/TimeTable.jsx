import React from 'react';
import styles from './TimeTable.module.css';

const TimeTable = (props) => {
    return(
        <section className={styles.time_table}>
            <div className={styles.day_of_the_week}>
                <div className={styles.table_item}>교시</div>
                <div className={styles.table_item}>월</div>
                <div className={styles.table_item}>화</div>
                <div className={styles.table_item}>수</div>
                <div className={styles.table_item}>목</div>
                <div className={styles.table_item}>금</div>
            </div>
            <div className={styles.table_item}>1</div>
            <div className={styles.table_item}></div>
            <div className={styles.table_item}></div>
            <div className={styles.table_item}></div>
            <div className={styles.table_item}></div>
            <div className={styles.table_item}></div>
            <div className={styles.table_item}>2</div>
            <div className={styles.table_item}></div>
            <div className={styles.table_item}></div>
            <div className={styles.table_item}></div>
            <div className={styles.table_item}></div>
            <div className={styles.table_item}></div>
            <div className={styles.table_item}>3</div>
            <div className={styles.table_item}></div>
            <div className={styles.table_item}></div>
            <div className={styles.table_item}></div>
            <div className={styles.table_item}></div>
            <div className={styles.table_item}></div>
            <div className={styles.table_item}>4</div>
            <div className={styles.table_item}></div>
            <div className={styles.table_item}></div>
            <div className={styles.table_item}></div>
            <div className={styles.table_item}></div>
            <div className={styles.table_item}></div>
            <div className={styles.lunch_item}>🍱🍣🍝🍌🥛</div>
            <div className={styles.table_item}>5</div>
            <div className={styles.table_item}></div>
            <div className={styles.table_item}></div>
            <div className={styles.table_item}></div>
            <div className={styles.table_item}></div>
            <div className={styles.table_item}></div>
            <div className={styles.table_item}>6</div>
            <div className={styles.table_item}></div>
            <div className={styles.table_item}></div>
            <div className={styles.table_item}></div>
            <div className={styles.table_item}></div>
            <div className={styles.table_item}></div>
            <div className={styles.table_item}>7</div>
            <div className={styles.table_item}></div>
            <div className={styles.table_item}></div>
            <div className={styles.table_item}></div>
            <div className={styles.table_item}></div>
            <div className={styles.table_item}></div>
        </section>
    )
}

export default TimeTable;