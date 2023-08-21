import { MouseEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUserContext } from "../hooks/useUserContext";
import styles from './Profile.module.css';
import { CiLocationOn } from 'react-icons/ci';
import { BsCardText } from 'react-icons/bs';
import { User } from "../models/User";
import Dialog from "./Dialog";
import { UPDATE_BIO, UPDATE_LOCATION } from "../contexts/UserContext";
import StatusList from "../status_list/StatusList";

const Profile = (): JSX.Element => {
    const { state, dispatch } = useUserContext();
    const user = state.user;
    const [isOwnProfile, setIsOwnProfile] = useState<boolean>(false);
    const [showBioDialog, setShowBioDialog] = useState<boolean>(false);
    const [showLocationDialog, setShowLocationDialog] = useState<boolean>(false);
    let [currUser, setCurrUser] = useState<User | undefined>(undefined);
    const [data, setData] = useState([]);
    const usernameParam = useParams();


    const handleLocationDialogOpen = (ev: MouseEvent<HTMLSpanElement, globalThis.MouseEvent>) => {
        ev.preventDefault();
        setShowLocationDialog(true);
    }

    const handleBioDialogOpen = (ev: MouseEvent<HTMLSpanElement, globalThis.MouseEvent>) => {
        ev.preventDefault();
        setShowBioDialog(true);
    }

    const handleLocationUpdate = (value?: string) => {
        setShowLocationDialog(false);
        updateField('location', value);
    }

    const handleBioUpdate = (value?: string) => {
        setShowBioDialog(false);
        updateField('bio', value);
    }

    const updateField = async (fieldName: string, value?: String) => {
        const body = {
            username: user?.username,
            fieldName: fieldName,
            data: value
        }
        const response = await fetch('http://localhost:4000/users/updateField', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json();

        if (response.ok){
            if (fieldName === 'bio'){
                dispatch({type: UPDATE_BIO, payload: json['bio']});
            }
            else if (fieldName === 'location')
                dispatch({type: UPDATE_LOCATION, payload: json['location']});
        }
    }

    const fetchUser = async (username: string) => {
        const body = {
            username: username
        }

        const response = await fetch('http://localhost:4000/users/getWithUsername', {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json();

        if (response.ok){
            setCurrUser(json);
        }
    }

    const fetchStatusesForUser = async (username: string) => {
        const body = {username: username};

        const response = await fetch('http://localhost:4000/statuses/getForUser', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json();

        if (response.ok){
            setData(json);
        }

    }

    useEffect(() => {
        const username = usernameParam.username;
        console.log(username);
        let userStr = localStorage.getItem('user');
        let usr;
        if (userStr){
            usr = JSON.parse(userStr);
        }
        if (username === user?.username || username === usr.username)
            setIsOwnProfile(true);
        if (username){
            fetchUser(username);
            fetchStatusesForUser(username);
        }
    }, [])

    return (
        <>
            {isOwnProfile && 
            <div className={styles.container}>
                <div className={styles.profileInfo}>
                    <img src={`http://localhost:4000/uploads/${user?.photo}`} className={styles.img}></img>
                    <div className={styles.name}>{user?.name} {user?.surname}</div>
                    <div className={styles.username}>@{user?.username}</div>
                    <div className={styles.location}>
                        <CiLocationOn style={{fontSize: '1.5em'}}/> 
                        <span className={styles.locationText} onClick={(ev) => handleLocationDialogOpen(ev)}>{user?.location || <div className={styles.addLocation}>Add location.</div>}</span>
                    </div>
                    <div className={styles.bio}>
                        <BsCardText style={{ fontSize: '1.5em' }} />
                        <span className={styles.bioText} onClick={(ev) => handleBioDialogOpen(ev)}>{user?.bio || <div className={styles.addBio}>Add bio.</div>}</span>
                    </div>
                </div>

                <div className={styles.statusContainer}>
                    {user && <StatusList statuses={data}></StatusList>}
                </div>

                {showBioDialog && (
                    <Dialog
                        title="Edit Bio"
                        onClose={() => setShowBioDialog(false)}
                        onSave={handleBioUpdate}
                        defaultValue={user?.bio}
                        isOpen={showBioDialog}
                    />
                )}

                {showLocationDialog && (
                    <Dialog
                        title="Edit Location"
                        onClose={() => setShowLocationDialog(false)}
                        onSave={handleLocationUpdate}
                        defaultValue={user?.location}
                        isOpen={showLocationDialog}
                    />
                )}
            </div>
            }
            
            {!isOwnProfile && 
            <div className={styles.container}>
                <div className={styles.profileInfo}>
                    <img src={`http://localhost:4000/uploads/${currUser?.photo}`} className={styles.img}></img>
                    <div className={styles.name}>{currUser?.name} {currUser?.surname}</div>
                    <div className={styles.username}>@{currUser?.username}</div>
                    <div className={styles.location}>
                        <CiLocationOn style={{fontSize: '1.5em'}}/> 
                        <span className={styles.locationText}>{currUser?.location}</span>
                    </div>
                    <div className={styles.bio}>
                        <BsCardText style={{ fontSize: '1.5em' }} />
                        <span className={styles.bioText}>{currUser?.bio}</span>
                    </div>
                </div>

                <div className={styles.statusContainer}>
                    {user && <StatusList statuses={data}></StatusList>}
                </div>

            </div>
          }
        </>
    )
}

export default Profile;
