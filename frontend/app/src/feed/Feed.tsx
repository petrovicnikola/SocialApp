import { useEffect, useRef, useState } from "react";
import { useUserContext } from "../hooks/useUserContext";
import StatusAdd from "../status_add/StatusAdd";
import styles from './Feed.module.css';
import StatusList from "../status_list/StatusList";
import { UPDATE } from "../contexts/UserContext";

const Feed = (): JSX.Element => {
    const { state, dispatch } = useUserContext();
    const user = state.user;
    const [data, setData] = useState(null);
    const [fetchData, setFetchData] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File>();
    const [filename, setFileName] = useState<string | undefined>(user?.photo);
    const dialogRef = useRef<HTMLDialogElement | null>(null);

    const statusAddedCallback = () => {
        setFetchData(!fetchData);
    }

    const handleUploadPhoto = async () => {
        if (selectedFile && user){
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('username', user?.username);

            const response = await fetch('http://localhost:4000/users/upload', {
                method: 'POST',
                body: formData
            });

            const json = await response.json();
            dispatch({type: UPDATE, payload: json['filename']});
            setFileName(json['filename']);
        }

        if (dialogRef && dialogRef.current)
            dialogRef.current.close();
    }

    const handleFileChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        if (ev.target.files){
            setSelectedFile(ev.target.files[0]);
        }
    }

    useEffect(() => {
        fetch('http://localhost:4000/statuses')
        .then(res => {
            if (!res.ok){
                throw new Error('The data could not be fetched!');
            }
            return res.json();
        })
        .then(data => {
            setData(data);
        })
        .catch(err => {

        })
    }, [fetchData]);

    const showDialog = () => {
        if(dialogRef && dialogRef.current){
            dialogRef.current.showModal();
        }
    }

    const closeDialog = () => {
        if (dialogRef && dialogRef.current){
            dialogRef.current.close();
        }
    }

    return (
        <>
            {   user && (
                <div className={styles.container}>
                    <div className={styles.profile}>
                        <dialog ref={dialogRef}>
                            <input type="file" onChange={(ev) => handleFileChange(ev)}/>
                            <button onClick={handleUploadPhoto}>Upload</button>
                            <button className = {styles.cancelButton} onClick={closeDialog}>Cancel</button>
                        </dialog>
                        {user.photo && <img src={`http://localhost:4000/uploads/${user.photo}`} onClick={showDialog}/>}
                        {(!user.photo || user.photo === '') && <img src={`${process.env.PUBLIC_URL}/default.jpg`} onClick={showDialog}/>}
                        <h2>My Profile</h2>
                    </div>
                    <div className={styles.statusContainer}>
                        <StatusAdd userName = {user.name} callback={statusAddedCallback}/>
                        {data && <StatusList statuses={data}></StatusList>}
                    </div>
                </div>
                )
            }
        </>
    );
}

export default Feed;