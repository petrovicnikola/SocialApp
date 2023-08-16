import { FormEvent, useState } from "react";
import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../models/User";
import { useUserContext } from "../hooks/useUserContext";
import { LOGIN } from "../contexts/UserContext";

const Login = (): JSX.Element => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    const { dispatch } = useUserContext();


    const handleSubmit = async (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault();

        if (username === '' || password === ''){
            setError("All fields are needed!");
            return;
        }

        setError('');

        const response = await fetch('http://localhost:4000/users/login', {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json();

        if (!response.ok){
            setError('User not found!');
        }
        else {
            setError('');
            setUsername('');
            setPassword('');
            const user: User = createUser(json);
            dispatch({type: LOGIN, payload: user});
            navigate('/feed');
        }
    }

    const createUser = (json: any) => {
        let path;
        if (json.photo && json.photo !== '')
            path = json.photo.split('\\')[1];
        else 
            path = ''
        const user: User = {
            username: json.username,
            password: json.password,
            name: json.name,
            surname: json.surname,
            email: json.email,
            gender: json.gender,
            bio: json.bio,
            photo: path
        }

        return user;
    }

    return (
        <div className={styles.login}>
            <h2>Log Into The Social App</h2>
            <form className={styles.form} onSubmit={(ev) => handleSubmit(ev)}>
                <label>Username</label>
                <input
                    type="text"
                    onChange={(ev) => setUsername(ev.target.value)}
                    />
                <label>Password</label>
                <input 
                    type="password"
                    onChange={(ev) => setPassword(ev.target.value)}
                />
                <button>Log in</button>
            </form>
            <div style={{marginTop: "10px"}}>Don't have an account? Register <Link to={'/register'} style={{textDecoration: "none", color: "var(--secondary-color)"}}>here.</Link></div>
            {error && <div className={styles.error}>{error}</div>}
        </div>
    );
}

export default Login;