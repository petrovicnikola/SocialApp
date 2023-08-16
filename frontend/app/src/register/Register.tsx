import { FormEvent, useState } from "react";
import styles from './Register.module.css';
import { useNavigate } from "react-router-dom";

const Register = (): JSX.Element => {
    const [name, setName] = useState<string>('');
    const [surname, setSurname] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [password2, setPassword2] = useState<string>('');
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    const isEmpty = (str: string): boolean => {
        if (str === '')
            return true;
        return false;
    }

    const handleSubmit = async (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault();

        if (isEmpty(name) || 
            isEmpty(surname) ||
            isEmpty(email) || 
            isEmpty(password) || 
            isEmpty(username) || 
            isEmpty(password2)
            ){
                setError("All fields are needed!");
                return;
        }

        if (password !== password2){
            setError("Passwords are not matching!");
            return;
        }

        setError('');

        const user = {name, surname, username, email, password};

        const response = await fetch('http://localhost:4000/users/register', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json();

        if (json['message'] !== 'ok'){
            if (json['message'] === 'exists')
                setError('User with these credentials already exists!');   
        }
        else {
            setError('');
            setName('');
            setSurname('');
            setEmail('');
            setPassword('');
            setPassword2('');
            setUsername('');
            alert('Successfully registered!');
            navigate("/");
        }

    }

    return (
        <div className={styles.register}>
            <h2>Register a New Account</h2>
            <form className={styles.form} onSubmit={(ev) => handleSubmit(ev)}>

                <label>Name</label>
                <input
                    type="text"
                    onChange={(ev) => setName(ev.target.value)}
                />

                <label>Surname</label>
                <input
                    type="text"
                    onChange={(ev) => setSurname(ev.target.value)}
                />


                <label>Username</label>
                <input 
                    type="text"
                    onChange={(ev) => setUsername(ev.target.value)}
                />

                <label>Email</label>
                <input 
                    type="email"
                    onChange={(ev) => setEmail(ev.target.value)}
                />


                <label>Password</label>
                <input
                    type="password"
                    onChange={(ev) => setPassword(ev.target.value)}
                />

                <label>Confirm password</label>
                <input 
                    type="password"
                    onChange={(ev) => setPassword2(ev.target.value)}
                />

                <button 
                    className={styles.btn}>
                    Register
                </button>
            </form>
            {error && <div className={styles.error}>{error}</div>}
        </div>
    );
}

export default Register;