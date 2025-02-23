import React from 'react';
import {Avatar, Button, CssBaseline, TextField,FormControlLabel,Checkbox,Link,Grid,Box,Typography,makeStyles,ThemeProvider, Container} from '@material-ui/core'
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
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  const API_ROOT = require('../app-settings.json')['API_ROOT']

function SigninComponent() {
    const classes = useStyles();
    const [email, setEmail] = React.useState("")
    const [pass, setPass] = React.useState("")
    const [emailError, setEmailError] = React.useState(false)
    const [passError, setPassError] = React.useState(false)
    const [passHelperText, setPassHelperText] = React.useState("")
    const [emailHelperText, setEmailHelperText] = React.useState("")
    function handleSubmit(event) {
      event.preventDefault();
      axios({
        url: API_ROOT + "/orgs/login",
        data: JSON.stringify({
            email: email,
            password: pass
        }),
        method: "POST",
        withCredentials: true
    }).then(response => {
          console.log(response)
          if (response["status"] == 206) {
            console.log("errr")
            console.log(response["data"])
            if (response["data"].includes("Password")) {
              setPassError(true)
              setPassHelperText("Incorrect Password")
            } else if (response["data"].includes("Email")) {
              setEmailError(true)
              setEmailHelperText("Email Not Recognized")
            }
          } else if (response["status"]==200) {
              window.location.href = 'https://dashboard.changecharity.io/'
          }
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
            Organization Sign In
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              error={emailError}
              helperText={emailHelperText}
              value={email}
              onChange={e=>
                {
                setEmail(e.target.value)
                setEmailError(false)
                setEmailHelperText("")
                }
              }
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              error={passError}
              helperText={passHelperText}
              value={pass}
              onChange={e=>
                {
                setPass(e.target.value)
                setPassError(false)
                setPassHelperText("")
                }
              }
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>

          </form>
        </div>
        <Grid container>
          <Grid item xs>
          <RouterLink to='/forgotpass'>
            <Link className={classes.link} variant="body2">
                {"Forgot Password?"}
              </Link>
            </RouterLink>
          </Grid>
          <Grid item>
          <RouterLink to='/signup'>
          <Link  className={classes.link} variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </RouterLink>
          </Grid>
        </Grid>
        </div>
    );
  }

  export default SigninComponent