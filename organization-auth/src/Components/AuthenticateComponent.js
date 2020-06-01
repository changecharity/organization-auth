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

function AuthenticateComponent() {
    const classes = useStyles();
    const [key, setKey] = React.useState("")
    function handleSubmit(event) {
      event.preventDefault();
      axios.post("https://changecharity.io/api/orgs/updatesignup", JSON.stringify({
        key: parseInt(key, 10),
      })).then(response => {
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
              value={key}
              onChange={e=> setKey(e.target.value)}
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
        </div>
    );
  }

  export default function CustomStyles() {
    return (
      <ThemeProvider theme={theme}>
        <AuthenticateComponent />
      </ThemeProvider>
    );
  }