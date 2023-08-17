import { useNavigate } from "react-router-dom";
import { useUserContext } from "../hooks/useUserContext";
import { Status } from "../models/Status";
import styles from './StatusDetails.module.css';
import { useState } from "react";

interface StatusDetailsProps {
    status: Status;
    showButtons: boolean;
}

const StatusDetails = (props: StatusDetailsProps): JSX.Element => {
    const { status, showButtons } = props;
    const { state } = useUserContext();

    const [liked, setLiked] = useState<boolean>(false);
    const navigate = useNavigate();
    const user = state.user;

    if (!user){
        navigate("/");
    }
    else {
        if (!liked && status.likedBy.includes(user.username))
            setLiked(true);
    }
    let date = status.createdAt.split('T')[0];


    const handleLike = async () => {
        if (user) {
            const body = {username: user.username, _id: status._id};
        
            const response = await fetch('http://localhost:4000/statuses/like', {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const json = await response.json();

            if (response.ok){
                status.likedBy = json;
                setLiked(!liked);
            }
        }
    }

    const handleComment = (_id: string) => {
        navigate(`/comments/${_id}`);
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>@{status.username}</h2>
                <div className={styles.date}>{date}</div>
            </div>
            <div className={styles.body}>
                <p>{status.text}</p>
            </div>
            {!liked && <div className={styles.heart}>&#10084; {status.likedBy.length}</div>}
            {liked && <div className={styles.heartLiked}>&#10084; {status.likedBy.length}</div>}
            {showButtons && <div className={styles.divider}></div>}
            {showButtons && <div className={styles.footer}>
                {!liked && <button onClick={handleLike}>Like</button>}
                {liked && <button className = {styles.likedBtn} onClick={handleLike}>Like</button>}
                <button className={styles.comment} onClick={() => handleComment(status._id)}>Comment</button>
            </div>}
        </div>
    )
}

export default StatusDetails;