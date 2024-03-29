import React, { useEffect, useState } from "react";
import styles from "./styles";
import { AppBar, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import images from "../../images/lol.png";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from 'react-router-dom'
import { LOGOUT } from "../../actions/auth";
import { useTranslation } from 'react-i18next';

const Navbar = () => {

    const classes = styles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [user, SetUser] = useState(JSON.parse(localStorage.getItem("UserProfile")));

    useEffect(() => {
        SetUser(JSON.parse(localStorage.getItem('UserProfile')));
    }, [location])

    const Logout = () => {
        window.location.reload(true);
        dispatch(LOGOUT());
        navigate("/");
        SetUser(null);
    }


    const { i18n } = useTranslation();

    function changeLanguage(e) {
        i18n.changeLanguage(e.target.value);
    }

    return (
        <AppBar className={classes.appBar} position="static" color="inherit" >
            <div className={classes.brandContainer}>
                <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Memories</Typography>
                <img className={classes.image} src={images} alt="icon" height="60" />
            </div>
            <p>{user ? "Welecome: " + user.userName : " "}</p>
            {/* <Button variant="contained"  component={Link} to="/allUsers" size="small" color="secondary">All Users</Button> */}

            {user ?
                <Button variant="contained" className={classes.logout} onClick={Logout} color="error">Logout</Button>
                : <Button component={Link} to="/auth" variant="contained" color="warning">Sign In</Button>}

            <button onClick={changeLanguage} value='en'>English</button>
            <button onClick={changeLanguage} value='ar'>عربى</button>

        </AppBar>
    )
}

export default Navbar