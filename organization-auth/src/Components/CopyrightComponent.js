import React from 'react';
import {Typography, Link} from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar';

function Copyright() {
    return (
      <div>
      <Avatar style={{height: "70px", width: "70px", display: "block", marginLeft: "auto", marginRight: "auto", marginBottom: "10px"}} alt="Remy Sharp" src="/favicon.ico" />
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          Change
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
      </div>
    );
  }

  export default Copyright