import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Status } from "../models/Status";
import styles from './StatusComments.module.css';
import StatusDetails from "../status_details/StatusDetails";
import { Comment } from "../models/Comment";
import { useUserContext } from "../hooks/useUserContext";
import CommentDetails from "../status_comment_details/CommentDetails";

const StatusComments = (): JSX.Element => {
    const { state } = useUserContext();
    const user = state.user;
    const idParam = useParams<{id: string}>();
    const [status, setStatus] = useState<Status | null>(null);
    const [text, setText] = useState<String>('');
    const [disabled, setDisabled] = useState<boolean>(true);
    const [commented, setCommented] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            let body = {id: idParam.id}; 
            const response = await fetch('http://localhost:4000/statuses/getWithId', {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json' 
                }
            });

            const json = await response.json();

            if (response.ok){
                setStatus(json);
            }
            else {
                console.log('Error fetching data!');
            }
        }

        fetchData();
    }, []);

    const handleTextChange = (ev: ChangeEvent<HTMLTextAreaElement>) => {
        ev.preventDefault();
        setText(ev.target.value);
        if (ev.target.value !== '')
            setDisabled(false);
        else
            setDisabled(true);
    }

    const postComment = async () => {
        const comment = {username: user?.username, text: text, id: idParam.id};

        const response = await fetch('http://localhost:4000/statuses/comment', {
            method: 'POST',
            body: JSON.stringify(comment),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json();

        if (response.ok && status){
            status.comments = json;
            console.log(json);
            setCommented(!commented);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.status}>
                {status && <StatusDetails status={status} showButtons={false}/>}
            </div>
            <div className={styles.commentsArea}>
                <textarea placeholder='Write a comment.' onChange={(ev) => handleTextChange(ev)}/>
                {!disabled && <button className={styles.btn} onClick={postComment}>Post</button>}
                {disabled && <button className={styles.disabledBtn} disabled={disabled}>Post</button>}
                <div className={styles.divider}></div>
                {/*Comments*/}
                <div className={styles.commentsList}>
                    {status && status.comments.map((comment: Comment) => (
                        <div className={styles.commentContainer}>
                            <CommentDetails comment={comment}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      );
}

export default StatusComments;