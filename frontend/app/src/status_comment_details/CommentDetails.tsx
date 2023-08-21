import { useEffect, useState } from "react";
import { Comment } from "../models/Comment";
import styles from './CommentDetails.module.css';
import { Link } from "react-router-dom";

interface CommentDetailsProps {
    comment: Comment;
}

const CommentDetails = (props: CommentDetailsProps): JSX.Element => {
    const { comment } = props;
    const [userPhoto, setUserPhoto] = useState<string>('');
    
    useEffect(() => {
        const getPhoto = async () => {
            const body = {username : comment.username};

            const response = await fetch('http://localhost:4000/users/getPhoto', {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const json = await response.json();

            if (response.ok){
                setUserPhoto(json);
            }
        }

        getPhoto();
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.firstRow}>
                {userPhoto !== '' && <img src={`http://localhost:4000/uploads/${userPhoto}`} className={styles.img}></img>}
                <Link to={`/profile/${comment.username}`}><b style={{paddingTop: '5px', paddingLeft: '5px'}}>@{comment.username}</b></Link>
            </div>
            <div className={styles.text}>
                <p>{comment.text}</p>
            </div>
        </div>
    )
}

export default CommentDetails;