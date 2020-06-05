import React, { useState } from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, makeStyles, ThemeProvider, Container } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Copyright from './Components/CopyrightComponent'
import SigninComponent from './Components/SigninComponent'
import SignupComponent from './Components/SignupComponent'
import AuthenticateComponent from './Components/AuthenticateComponent'
import ForgotPasswordComponent from './Components/ForgotPasswordComponent'
import ValidateForgotPasswordCode from './Components/ValidateForgotPasswordCode'
import EnterNewPassword from './Components/EnterNewPassword'
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
  return (
    <Router>
      <Container component="main" maxWidth="xs">
      <Switch>
        <Route path="/signin">
          <SigninComponent  />
        </Route>
        <Route path="/enternewpass">
          <EnterNewPassword   />
        </Route>
        <Route path="/forgotpassvalidate">
          <ValidateForgotPasswordCode  />
        </Route>
        <Route path="/forgotpass">
          <ForgotPasswordComponent  />
        </Route>
        <Route path="/signup">
          <SignupComponent  />
        </Route>
        <Route path="/confirm">
          <AuthenticateComponent />
        </Route>
        <Route path="/">
          <SigninComponent />
        </Route>
      </Switch>
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

