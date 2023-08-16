import { Link, useNavigate } from "react-router-dom";
import styles from './Navbar.module.css';
import { useUserContext } from "../hooks/useUserContext";
import { LOGOUT } from "../contexts/UserContext";

const Navbar = (): JSX.Element => {
    const { dispatch } = useUserContext();
    const navigate = useNavigate();


    const handleLogout = () => {
        dispatch({type: LOGOUT, payload: undefined});
        navigate("/");
    }

    return (
        <header>
            <div className={styles.container}>
                <Link to="/feed">
                    <h1>The Social App</h1>
                </Link>
                <div style={{color: "white", cursor: "pointer"}} onClick={handleLogout}>
                    logout
                </div>
            </div>
        </header>
    )
}

export default Navbar;