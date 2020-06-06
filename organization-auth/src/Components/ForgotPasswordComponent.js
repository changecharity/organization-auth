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

function ForgotPasswordComponent() {
    const classes = useStyles();
    const [email, setEmail] = React.useState("")
    function handleSubmit(event) {
      event.preventDefault();
      axios({ url: "https://api.changecharity.io/orgs/sendforgotpass",
        data: JSON.stringify({
            email: email
        }),
        method: "POST",
        withCredentials: true}).then(response => {
          console.log(response)
          window.location.href = '/forgotpassvalidate';

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
            Forgot Password
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              value={email}
              onChange={e=> setEmail(e.target.value)}
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Send Temporary Passcode
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

  export default ForgotPasswordComponent