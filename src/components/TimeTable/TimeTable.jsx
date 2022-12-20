import React from 'react';
import TableItem from '../TableItem/TableItem';
import styles from './TimeTable.module.css';

const tablesBeforeLunch = (tableItems, setTableItems) => {
    const res = [];
    let period = 0;
    for (let i = 0; i < 24; i++) {
        if (i % 6 === 0) {
            period += 1;
            res.push(<div key={i} className={styles.table_item}>{period}</div>);
            continue;
        }
        const dayOfWeek = i % 6;
        let match = false;
        for (const item of tableItems) {
            if (item.row === period && item.col === dayOfWeek) {
                res.push(<TableItem 
                    key={i} 
                    period={period} 
                    dayOfWeek={dayOfWeek} 
                    subject={item.subject} 
                    setTableItems={setTableItems}
                />);
                match = true;
                break;
            }
        }
        if (!match) {
            res.push(<div key={i} className={styles.table_item} data-row={period} dara-col={dayOfWeek}></div>)
        }
    }
    return res;
}

const tablesAfterLunch = (tableItems, setTableItems) => {
    const res = [];
    let period = 4;
    for (let i = 24; i < 42; i++) {
        if (i % 6 === 0) {
            period += 1;
            res.push(<div key={i} className={styles.table_item}>{period}</div>);
            continue;
        }
        const dayOfWeek = i % 6;
        let match = false;
        for (const item of tableItems) {
            if (item.row === period && item.col === dayOfWeek) {
                res.push(<TableItem 
                    key={i} 
                    period={period} 
                    dayOfWeek={dayOfWeek} 
                    subject={item.subject} 
                    setTableItems={setTableItems}
                />);
                match = true;
                break;
            }
        }
        if (!match) {
            res.push(<div key={i} className={styles.table_item} data-row={period} dara-col={dayOfWeek}></div>)
        }
    }
    return res;
}

const TimeTable = ({tableItems, setTableItems}) => {
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
            {
                tablesBeforeLunch(tableItems, setTableItems)
            }
            <div className={styles.lunch_item}>🍱🍣🍝🍌🥛</div>
            {
                tablesAfterLunch(tableItems, setTableItems)
            }
        </section>
    )
}

export default TimeTable;