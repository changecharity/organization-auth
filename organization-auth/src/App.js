import React, { useState } from 'react';
import { Avatar, Button,CircularProgress, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, makeStyles, ThemeProvider, Container } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Copyright from './Components/CopyrightComponent'
import SigninComponent from './Components/SigninComponent'
import SignupComponent from './Components/SignupComponent'
import AuthenticateComponent from './Components/AuthenticateComponent'
import ForgotPasswordComponent from './Components/ForgotPasswordComponent'
import ValidateForgotPasswordCode from './Components/ValidateForgotPasswordCode'
import EnterNewPassword from './Components/EnterNewPassword'

import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios'
import axios from 'axios'
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
const API_ROOT = require('./app-settings.json')['API_ROOT']
const BASE_URL = API_ROOT + "/orgs/"
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials:true
});

function App() {
  const classes = useStyles();
  const [imageFile, setImageFile] = React.useState(null)
  const [isConfirm, setIsConfirm] = React.useState(false)
  console.log("HEy this worked")
  console.log("And this")
  console.log("Third time")
  
  return (
  <AxiosProvider instance={axiosInstance}>
    <Post url={"checklogin"} >
      {
        (error, response, isLoading, makeRequest, axios) => {
          if (error) {
            console.log(error)
            console.log(error.response)
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
                  {
                    isConfirm===false ? <SignupComponent setIsConfirm={setIsConfirm}  /> :
                    <AuthenticateComponent />
                  }
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
            )
          } else if (isLoading) {  
            return (
              <ThemeProvider theme={theme}>
                <div style={{display:"flex", height:"100%", alignItems:"center", justifyContent:"center"}}>
                  <CircularProgress></CircularProgress>
                </div>
              </ThemeProvider>
            )
          } else if (response!=null) { 
            console.log(response)
            if (response["data"] === "success") {
              window.location.href = 'https://dashboard.changecharity.io/'
            } 
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
                  {
                    isConfirm===false ? <SignupComponent setIsConfirm={setIsConfirm}  /> :
                    <AuthenticateComponent />
                  }
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
            )
          }
          return (
            <ThemeProvider theme={theme}>
              <div style={{display:"flex", height:"100%", alignItems:"center", justifyContent:"center"}}>
                <CircularProgress></CircularProgress>
              </div>
            </ThemeProvider>
          )

        }
      }
    </Post>
  </AxiosProvider>
  )
}

export default function CustomStyles() {
  return (
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  );
}

