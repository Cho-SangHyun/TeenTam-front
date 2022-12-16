import React from 'react';
import ProfileImage from '../ProfileImage/ProfileImage';
import styles from './MessageList.module.css';

const removeStyleFromButton = (target) => {
    for(const li of target.parentNode.children){
        li.classList.remove(styles.selected);
    }
}

const addStyleToButton = (target) => {
    removeStyleFromButton(target);
    target.classList.add(styles.selected);
}


const MessageList = ({ oppenentList, setOpponent }) => {
    const handleClickOpponent = (e) => {
        if(e.target.tagName === "LI"){
            setOpponent(e.target.dataset.value);
            addStyleToButton(e.target);
        }
    }

    return(
        <ul className={styles.message_list} onClick={handleClickOpponent}>
            {
                oppenentList.map((item, index) => {
                    return(
                        <li key={index} className={styles.list_item} data-value={item.name}>
                            <div className={styles.opponent_profile}>
                                <ProfileImage userId={item.id} />
                            </div>
                            <span className={styles.opponent_name}>{item.name}</span>
                        </li>
                    ) 
                })
            }
        </ul>
    )
}

export default MessageList;