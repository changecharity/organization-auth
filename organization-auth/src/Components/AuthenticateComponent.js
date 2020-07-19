import React from 'react';
import cookie from 'react-cookies'
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
    resendButton: {
      marginTop: theme.spacing(0),
      marginBottom: "10px"
    }
  }));

function AuthenticateComponent(props) {
    const classes = useStyles();
    const [key, setKey] = React.useState("")
    const [error, setError] = React.useState(false)
    const [errorDes, setErrorDes] = React.useState("Invalid Code")

    function handleSubmit(event) {
      event.preventDefault();
      console.log(key)
      axios({
      url: "https://api.changecharity.io/orgs/updatesignup",
      data: JSON.stringify({
          key: parseInt(key, 10)
      }),
      method: "POST",
      withCredentials: true}).then(response => {
          console.log(response)
          if (response["data"].includes("incorrect")) {
            setError(true)
            setErrorDes("Invalid Code")
          } else if (response["status"]==200) {
            let formData = new FormData()
            fetch(cookie.load('orgLogo'))
            .then(res => res.blob())
            .then(blob => {
            const file = new File([blob], 'logoFile.png', blob)
            console.log(file)
            formData.name = "logoFile"
            formData.append('logoFile',file)
            axios({
              url: "https://api.changecharity.io/orgs/uploadlogo",
              method: "POST",
              data: formData,
              withCredentials: true,
            }).then(response => {
              console.log(response)

              window.location.href = 'https://dashboard.changecharity.io/'
        
            }).catch(error => {
              console.log(error.response)
            })
            })
            
            
          }
      }).catch(error => {
          console.log(error)
      })
    }

    function resendAuthCode(e) {
      e.preventDefault();
      console.log("i guess")
      axios({
      url: "https://api.changecharity.io/orgs/resendemailkey",
      data: JSON.stringify({

      }),
      method: "POST",
      withCredentials: true}).then(response => {
          console.log(response)
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
              value={key}
              onChange={e=> 
                {
                setKey(e.target.value)
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
          <Grid item xs>
          <RouterLink to='/forgotpass'>
            <Link className={classes.link} variant="body2">
                {"Forgot Password?"}
              </Link>
            </RouterLink>
          </Grid>
          <Grid item>
          <RouterLink>
          <Link onClick={ e => resendAuthCode(e)} className={classes.link} variant="body2">
              {"Resend Code"}
            </Link>
          </RouterLink>
          </Grid>
        </Grid>
        </div>
    );
  }

  export default AuthenticateComponent