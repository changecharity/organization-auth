import React, { useState } from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, makeStyles, ThemeProvider, Container } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Copyright from './Components/CopyrightComponent'
import SigninComponent from './Components/SigninComponent'
import SignupComponent from './Components/SignupComponent'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Link as RouterLink } from "react-router-dom"
import theme from './Theme'

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
  link: {
    color: "#3f51b5"
  }
}));

function App() {
  const classes = useStyles();
  const [signinActive, setSignInActive] = useState(true)

  return (
    <Router>
      <Container component="main" maxWidth="xs">
      <Switch>
        <Route path="/signin">
          <SigninComponent />
        </Route>
        <Route path="/signup">
          <SignupComponent />
        </Route>
        <Route path="/">
          <SigninComponent />
        </Route>
      </Switch>
      
        <Grid container>
          <Grid item xs>
          <RouterLink to='/'>
            <Link onClick={ e => setSignInActive(false)} className={classes.link} variant="body2">
                {"Forgot Password?"}
              </Link>
            </RouterLink>
          </Grid>
          <Grid item>
          {
            signinActive ? (
              <RouterLink to='/signup'>
            <Link onClick={ e => setSignInActive(false)} className={classes.link} variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </RouterLink>
            ) : (
            <RouterLink to='/signin'>
              <Link onClick={ e => setSignInActive(true)} className={classes.link} variant="body2">
                  {"Already have an account? Sign in"}
              </Link>
            </RouterLink>
            )
          }
          </Grid>
        </Grid>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </Router>

  );
}

export default function CustomStyles() {
  return (
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  );
}

