import React, { useState } from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { post } from '../services/http-service';

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
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  }
}));

export default function Login({ history }) {

  const classes = useStyles();

  const [data, setData] = useState({ name: "", password: "" });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const validateUser = async (e) => {
    e.preventDefault();
    if (data.name == "" || data.password == "") {
      return;
    }
    let result = await post('login', data, null);
    if (result) {
      localStorage.setItem("Token", result.data.token);
      localStorage.setItem("UserName", result.data.name);
      if (result.data.admin == 'Y')
        history.push('/manage');
      else
        history.push('/search');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={validateUser}>
          <TextField
            value={data.name}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="username"
            name="name"
            onChange={handleChange}
            autoComplete="username"
            autoFocus
          />
          <TextField
            value={data.password}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="password"
            type="password"
            id="password"
            onChange={handleChange}
            autoComplete="current-password"
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
}