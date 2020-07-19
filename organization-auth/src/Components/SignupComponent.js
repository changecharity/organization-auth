import React, { useCallback } from 'react';
import { Avatar, Button, Chip, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, makeStyles, ThemeProvider, Container } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import theme from '../Theme'
import axios from 'axios'
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import { Link as RouterLink } from "react-router-dom"
import { usePlaidLink } from 'react-plaid-link';

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
    link: {
        marginTop: "10px",
        marginBottom: "-5px"
    },
    bankChip: {
        marginTop: "10px"
    }
}));

function SignupComponent(props) {
    const classes = useStyles();
    const [acceptedTerms, setAcceptedTerms] = React.useState(false)
    const [orgName, setOrgName] = React.useState("")
    const [bankAccountEntered, setBankAccountEntered] = React.useState(false)
    const [email, setEmail] = React.useState("")
    const [pass, setPass] = React.useState("")
    const [plaidToken, setPlaidToken] = React.useState("")
    const [ein, setEin] = React.useState("")
    const [bankName, setBankName] = React.useState("")
    const [accountId, setAccountId] = React.useState("")
    const [accountMask, setAccountMask] = React.useState("")

    const [openError, setOpenError] = React.useState(false);
    const [passwordError, setPasswordError] = React.useState(false)
    const [errorDes, setErrorDes] = React.useState("")
    const [einError, setEinError] = React.useState(false)
    const [einErrorDes, setEinErrorDes] = React.useState("")
    const [emailError, setEmailError] = React.useState(false)
    const [emailErrorDes, setEmailErrorDes] = React.useState("")
    const onSuccess = useCallback((token, metadata) => {
        // send token to server
        setPlaidToken(token)
        setBankName(metadata["accounts"][0]["verification_status"] == "pending_manual_verification" ? "manual_verify" : metadata["institution"]["name"])
        setCheckingAccountId(metadata["accounts"])
        setBankAccountEntered(true)
    }, []);
    const config = {
        clientName: 'Change',
        env: 'sandbox',
        product: ['auth'],
        publicKey: '014d4f2c01905eafa07cbcd2755ef5',
        onSuccess,
        // ...
    };
    const { open, ready, error } = usePlaidLink(config);

    const handleDelete = () => {
        console.info('You clicked the delete icon.');
        setBankAccountEntered(false)
    };

    const handleClose = (event, reason) => {
        setOpenError(false);
      };

    function setCheckingAccountId(accounts) {
        accounts.forEach(account => {
            if (account["subtype"] == "checking") {
                console.log("gotit")
                setAccountId(account["id"])
                setAccountMask(Number(account["mask"]))
            }
        })
    }
    function handleSubmit(event) {
        event.preventDefault();
        const onlyDigitsEIN = ein.replace(/\D/g, "")
        if ((bankAccountEntered==true) && (acceptedTerms===true) && (onlyDigitsEIN.length==8 || onlyDigitsEIN.length==9) && (!orgName=="") && (!email.length==0) && (pass.length>=8) ) {
            axios({
                url: "http://localhost:8080/orgs/signup",
                data: JSON.stringify({
                    name: orgName,
                    email: email,
                    password: pass,
                    ein: parseInt(onlyDigitsEIN,10),
                    plaid_public_token: plaidToken,
                    plaid_account_id: accountId,
                    mask: accountMask,
                    bank_name: bankName,
                }),
                method: "POST",
                withCredentials: true
            }).then(response => {
                console.log(response);
                if (response["status"] == 206) {
                    if (response["data"].includes("ein")) {
                        setEinError(true)
                        setEinErrorDes("EIN already exists")
                    } else if (response["data"].includes("email")) {
                        setEmailError(true)
                        setEmailErrorDes("Email already exists")
                    }
                } else {
                window.location.href = '/confirm';
                }
                if (response.data.startsWith("eyJhbGciOi")) {

                }
            }).catch(error => {
                console.log("heres where")
                console.log(error)
                setOpenError(true)
            })
        } else {
            if (pass.length < 8) {
                setPasswordError(true)
                setErrorDes("Password must be at least 8 characters")
            }
            setOpenError(true)
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
                                onChange={e => setOrgName(e.target.value)}
                                required
                                fullWidth
                                id="orgName"
                                label="Organization Name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                autoComplete="fname"
                                name="orgEin"
                                error={einError}
                                helperText={einErrorDes}
                                variant="outlined"
                                value={ein}
                                onChange={e => {
                                    setErrorDes("")
                                    setEinError(false)
                                    var eidOnlyNumbers = e.target.value.replace(/[^\d-]/g, '')
                                    if (eidOnlyNumbers.length === 2 && !eidOnlyNumbers.includes("-")) {
                                        setEin(eidOnlyNumbers + "-")
                                    } else {
                                        if (!(eidOnlyNumbers.indexOf("-") != -1 && eidOnlyNumbers.indexOf("-") > 2)) {
                                            setEin(eidOnlyNumbers)
                                        }
                                    }
                                }
                                }
                                required
                                fullWidth
                                id="orgEin"
                                label="Organization EIN"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                error={emailError}
                                helperText={emailErrorDes}
                                fullWidth
                                value={email}
                                onChange={e => {
                                    setEmailErrorDes("")
                                    setEmailError(false)
                                    setEmail(e.target.value)}}
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
                                error={passwordError}
                                helperText={errorDes}
                                value={pass}
                                onChange={e=>
                                    {
                                    setPass(e.target.value)
                                    setPasswordError(false)
                                    setErrorDes("")
                                    }
                                  }
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox color="primary" checked={acceptedTerms} onChange={() => setAcceptedTerms(!acceptedTerms)} />}
                                label="By clicking here you accept our Terms of Service and Privacy Policy"
                            />
                        </Grid>
                    </Grid>
                    {
                        !bankAccountEntered ? (
                            <Button
                                onClick={() => open()}
                                disabled={!ready}
                                fullWidth
                                variant="contained"
                                color="secondary"
                                className={classes.link}
                            >
                                Link Bank Account
                            </Button>
                        ) :
                            (
                                <Chip
                                    className={classes.bankChip}
                                    icon={<AccountBalanceIcon />}
                                    label={bankName}
                                    onDelete={handleDelete}
                                    color="secondary"
                                />
                            )
                    }
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
            <Grid container>
                <Grid item xs>
                    <RouterLink to='/forgotpass'>
                        <Link className={classes.link} variant="body2">
                            {"Forgot Password?"}
                        </Link>
                    </RouterLink>
                </Grid>
                <Grid item>
                    <RouterLink to='/signin'>
                        <Link className={classes.link} variant="body2">
                            {"Already have an account? Sign in"}
                        </Link>
                    </RouterLink>
                </Grid>
            </Grid>
            <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        onClose={handleClose}
        open={openError}
        autoHideDuration={4000}
        message="Please make sure all of your information is filled in correctly."
        />
        </div>
    );
}

export default SignupComponent



String.prototype.removeCharAt = function (i) {
    var tmp = this.split(''); // convert to an array
    tmp.splice(i - 1 , 1); // remove 1 element from the array (adjusting for non-zero-indexed counts)
    return tmp.join(''); // reconstruct the string
}





