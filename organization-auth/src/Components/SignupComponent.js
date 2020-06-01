import React from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, makeStyles, ThemeProvider, Container } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import theme from '../Theme'
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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function SignupComponent(props) {
    const classes = useStyles();
    const [orgName, setOrgName] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [pass, setPass] = React.useState("")

    function handleSubmit(event) {
        event.preventDefault();
        axios({ url: "https://changecharity.io/api/orgs/signup",
        data: JSON.stringify({
            name: orgName,
            email: email,
            password: pass,
            ein: 12345822,
            plaid_public_token: "ssdfdsfsssd",
            plaid_account_id: "adfdfdss"
        }),
        method: "POST",
        withCredentials: true}).then(response => {
            console.log(response);
            if(response.data.startsWith("eyJhbGciOi"))
            window.location.href = '/confirm';
        }).catch(error => {
            console.log(error)
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
                    Sign up
          </Typography>
                <form className={classes.form} onSubmit={handleSubmit} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                autoComplete="fname"
                                name="orgName"
                                variant="outlined"
                                value={orgName}
                                onChange={e=> setOrgName(e.target.value)}
                                required
                                fullWidth
                                id="orgName"
                                label="Organization Name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                value={email}
                                onChange={e=> setEmail(e.target.value)}
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                value={pass}
                                onChange={e=> setPass(e.target.value)}
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label="I want to receive inspiration, marketing promotions and updates via email."
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                </form>
            </div>
            </div>
    );
}

export default function CustomStyles() {
    return (
      <ThemeProvider theme={theme}>
        <SignupComponent />
      </ThemeProvider>
    );
  }