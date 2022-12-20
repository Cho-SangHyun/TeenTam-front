import React, { useContext, useState } from 'react';
import { BiTrashAlt } from "react-icons/bi";
import { CRUD } from '../../app';
import styles from './TableItem.module.css';

const COLOR_TABLE = {
    1: styles.red,
    2: styles.green,
    3: styles.orange,
    4: styles.blue,
    5: styles.purple,
    6: styles.light_green,
    7 : styles.yellow
}

const hashSubjectToColor = (subject) => {
    let hash = 17;
    for (let i = 0; i < subject.length; i++) {
        hash = (13 * hash * subject.charCodeAt(i)) % 7 + 1;
    }
    return COLOR_TABLE[hash];
}

const TableItem = ({ period, dayOfWeek, subject, setTableItems }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const crudService = useContext(CRUD);
    const remove = () => {
        crudService.removeTimeTableItem(4, period, dayOfWeek, subject, setTableItems);
    }

    return(
        <div className={`${styles.table_item} ${hashSubjectToColor(subject)}`} data-row={period} data-col={dayOfWeek} >
            <BiTrashAlt className={styles.remove_button} onClick={remove} />
            {subject}
        </div>
    )
}

export default TableItem;