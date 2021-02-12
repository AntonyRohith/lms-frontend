import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';

import logo from '../images/logo-full.png';

const useStyles = makeStyles((theme) => ({
    header: {
        '& .MuiAppBar-root': {
            height: '3rem',
        }
    },
    image: {
        zIndex: 5000,
        position: 'absolute',
        height: '3rem'
    },
    user:{
        position: 'absolute',
        right:'5%',
        color:'white'
    }
}));

export default function ({history}) {
    const classes = useStyles();

    return (
        <div className={classes.header}>
            <img src={logo} className={classes.image} onClick={()=>history?history.push('/manage'):null}/>
            <h3 className={classes.user}>{localStorage.getItem('UserName')}</h3>
            <AppBar position="static">
            </AppBar>
        </div>
    );
}