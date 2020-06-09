import React from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, makeStyles, ThemeProvider, Container } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import theme from '../Theme'
import cookie from 'react-cookies'
import axios from 'axios'
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import { Link as RouterLink } from "react-router-dom"

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    resendButton: {
        marginTop: theme.spacing(0),
        marginBottom: "10px"
    }
}));

function EnterNewPassword() {
    const classes = useStyles();
    const [newPass, setNewPass] = React.useState("")
    const [error, setError] = React.useState(false)
    const [errorDes, setErrorDes] = React.useState("")

    function handleSubmit(event) {
        event.preventDefault();
        if (newPass.length >= 8) {
            axios({
                url: "https://api.changecharity.io/orgs/forgotpass",
                data: JSON.stringify({
                    password: newPass,
                    key: parseInt(cookie.load('passkey'), 10),
                }),
                method: "POST",
                withCredentials: true
            }).then(response => {
                console.log(response)
            }).catch(error => {
                console.log(error)
                setError(true)
                setErrorDes(error.response)
            })
        } else {
            setError(true)
            setErrorDes("Password must be at least 8 characters")
        }
    }

    return (
        <div>
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Enter New Password
                 </Typography>
                <form className={classes.form} onSubmit={handleSubmit} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        error={error}
                        helperText={errorDes}
                        required
                        value={newPass}
                        onChange={e=> 
                            {
                            setNewPass(e.target.value)
                            setError(false)
                            setErrorDes("")
                            }
                          }
                        fullWidth
                        label="New Password"
                        type="password"
                        id="password"
                        name="password"

                        autoFocus
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Confirm
            </Button>
                </form>
            </div>
            <Grid container>
                <Grid item>
                    <RouterLink to='/'>
                        <Link className={classes.link} variant="body2">
                            {"Home"}
                        </Link>
                    </RouterLink>
                </Grid>
            </Grid>
        </div>
    );
}

export default EnterNewPassword