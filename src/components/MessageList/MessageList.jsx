import React from 'react';
import styles from './MessageList.module.css';

const MessageList = ({ oppenentList, setOpponent }) => {
    const handleClickOpponent = (e) => {
        if(e.target.tagName === "LI"){
            setOpponent(e.target.dataset.value);
        }
    }


    return(
        <ul className={styles.message_list} onClick={handleClickOpponent}>
            {
                oppenentList.map((item, index) => {
                    return(
                        <li key={index} className={styles.list_item} data-value={item.name}>
                            <span className={styles.opponent_name}>{item.name}</span>
                        </li>
                    ) 
                })
            }
        </ul>
    )
}

export default MessageList;