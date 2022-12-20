import React, { useContext, useState } from 'react';
import { CRUD } from '../../app';
import TableItem from '../TableItem/TableItem';
import styles from './TimeTable.module.css';

const tablesBeforeLunch = (tableItems, setTableItems, modifyItem) => {
    const res = [];
    let period = 0;
    for (let i = 0; i < 24; i++) {
        if (i % 6 === 0) {
            period += 1;
            res.push(<div key={i} className={styles.table_item}>{period}</div>);
            continue;
        }
        const day = i % 6;
        let match = false;
        for (const item of tableItems) {
            if (item.period === period && item.day === day && item.subject) {
                res.push(<TableItem 
                    key={i} 
                    period={period} 
                    day={day} 
                    subject={item.subject} 
                    setTableItems={setTableItems}
                />);
                match = true;
                break;
            }
        }
        if (!match) {
            res.push(<div 
                key={i} 
                className={styles.table_item}
                data-period={period} 
                data-day={day}
                onDragOver={(e) => {e.preventDefault();}}
                onDrop={modifyItem} ></div>)
        }
    }
    return res;
}

const tablesAfterLunch = (tableItems, setTableItems, modifyItem) => {
    const res = [];
    let period = 4;
    for (let i = 24; i < 42; i++) {
        if (i % 6 === 0) {
            period += 1;
            res.push(<div key={i} className={styles.table_item}>{period}</div>);
            continue;
        }
        const day = i % 6;
        let match = false;
        for (const item of tableItems) {
            if (item.period === period && item.day === day && item.subject) {
                res.push(<TableItem 
                    key={i} 
                    period={period} 
                    day={day} 
                    subject={item.subject} 
                    setTableItems={setTableItems}
                />);
                match = true;
                break;
            }
        }
        if (!match) {
            res.push(<div 
                key={i} 
                className={styles.table_item}
                data-period={period} 
                data-day={day}
                onDragOver={(e) => {e.preventDefault();}}
                onDrop={modifyItem} ></div>)
        }
    }
    return res;
}

const TimeTable = ({tableItems, setTableItems}) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const crudService = useContext(CRUD);

    const modifyItem = (e) => {
        const subject = e.dataTransfer.getData("subject");
        const oldPeriod = e.dataTransfer.getData("oldPeriod");
        const oldDay = e.dataTransfer.getData("oldDay");
        const newPeriod = e.target.dataset.period;
        const newDay = e.target.dataset.day;

        crudService.modifyTimeTableItem(user.id, subject, oldPeriod, oldDay, newPeriod, newDay, setTableItems);
    }

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
                tablesBeforeLunch(tableItems, setTableItems, modifyItem)
            }
            <div className={styles.lunch_item}>🍱🍣🍝🍌🥛</div>
            {
                tablesAfterLunch(tableItems, setTableItems, modifyItem)
            }
        </section>
    )
}

export default TimeTable;