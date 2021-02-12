import React, { useState, useEffect } from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import Header from './Header';
import BookList from './BookList';
import { get } from '../services/http-service';

const useStyles = makeStyles((theme) => ({
    text:{
        width:'85%'
    },
    button: {
        marginTop:'1%',
        marginLeft:'5%',
        height:'3.5rem'
    }
  }));

export default function () {

    const classes = useStyles();

    const [search,setSearch] = useState("");

    const [book, setBook] = useState([]);

    useEffect(async () => {
        let result = await get('user/get-available-books');
        if (result)
            setBook(result.data);
    }, []);
    
    const handleChange = (e) => {
        setSearch(e.target.value);
    }

    const searchBooks = async (e) => {
        e.preventDefault();
        let result = await get('user/search-books?keyword='+search);
        if (result)
            setBook(result.data);
    }

    return (
        <div >
            <Header />
            <form onSubmit={searchBooks}>
                <TextField className={classes.text}
                    value={search}
                    onChange={handleChange}
                    variant="outlined"
                    margin="normal"
                    required
                    id="search"
                    label="search"
                    placeholder="search by book, author, publisher name"
                    name="search"
                    autoComplete="search"
                    autoFocus
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                >search</Button>
            </form>
            <BookList data={book} />
        </div>
    );
}