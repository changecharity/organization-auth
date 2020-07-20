import React from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, makeStyles, ThemeProvider, Container } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import theme from '../Theme'
import axios from 'axios'
import cookie from 'react-cookies'
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

const API_ROOT = require('../app-settings.json')['API_ROOT']

function ValidateForgotPasswordCode(props) {
    const classes = useStyles();
    const [forgotPasswordCode, setForgotPasswordCode] = React.useState("")
    const [error, setError] = React.useState(false)
    const [errorDes, setErrorDes] = React.useState("")
    function handleSubmit(event) {
        event.preventDefault();
        axios({
            url: API_ROOT + "/orgs/validkey",
            data: JSON.stringify({
                key: Number(forgotPasswordCode)
            }),
            method: "POST",
            withCredentials: true
        }).then(response => {
            if (response["data"].includes("incorrect")) {
                setError(true)
                setErrorDes("Invalid Code")
            } else {
            cookie.save('passkey', forgotPasswordCode, { path: '/' })
            window.location.href = '/enternewpass';
            }
        }).catch(error => {
            console.log(error)
            console.log(error.response)
        })
    }

    return (
        <div>
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Enter Code
          </Typography>
                <Typography component="h5">
                    A 6 digit code was sent to your email.
          </Typography>
                <form className={classes.form} onSubmit={handleSubmit} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        error={error}
                        helperText={errorDes}
                        value={forgotPasswordCode}
                        onChange={e=>
                            {
                            setForgotPasswordCode(e.target.value)
                            setError(false)
                            setErrorDes("")
                            }
                          }
                        fullWidth
                        id="code"
                        label="6 digit code"
                        name="key"

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

export default ValidateForgotPasswordCode