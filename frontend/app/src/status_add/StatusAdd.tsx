import { ChangeEvent, FormEvent, useState } from 'react';
import styles from './StatusAdd.module.css';

interface StatusAddProps {
    userName: string; 
    callback: () => void;
  }
  

const StatusAdd = (props: StatusAddProps): JSX.Element => {
    const { userName, callback } = props;

    const [text, setText] = useState<string>('');
    const [disabled, setDisabled] = useState<boolean>(true);

    const handleSubmit = async (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        
        const status = {username: userName, text};

        const response = await fetch('http://localhost:4000/statuses/new', {
            method: 'POST',
            body: JSON.stringify(status),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json();

        if (json['message'] === 'ok'){
            setText('');
            setDisabled(true);
            //dispatch({type: ADD_STATUS,payload: json });
            callback();
        }
    }

    const handleTextChange = (ev: ChangeEvent<HTMLTextAreaElement>) => {
        ev.preventDefault();
        setText(ev.target.value);
        if (ev.target.value !== '')
            setDisabled(false);
        else
            setDisabled(true);
    }

    return (
        <div className={styles.container}>
            <form className={styles.statusForm} onSubmit={(ev) => handleSubmit(ev)}>
                <textarea placeholder={`What's on your mind, ${userName}?`} onChange={(ev) => handleTextChange(ev)}/>
                <div className={styles.divider}></div>
                {!disabled && <button className={styles.btn}>Post</button>}
                {disabled && <button className={styles.disabledBtn} disabled={disabled}>Post</button>}
            </form>
        </div>
    )
}

export default StatusAdd;