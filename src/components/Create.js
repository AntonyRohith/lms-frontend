import React, { useState, useEffect } from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { get,put } from '../services/http-service';


import Header from './Header';

const useStyles = makeStyles((theme) => ({
    form: {
        position: 'absolute',
        display: 'grid',
        top: '20%',
        left: '40%',
        gridRowGap: '10%'
    }
}));

export default function ({ history }) {

    const classes = useStyles();

    const [key, setKey] = useState("");

    const [name, setName] = useState("");

    const [password, setPassword] = useState("");

    const [isAdmin, setIsAdmin] = useState(false);

    const [author, setAuthor] = useState(0);

    const [publisher, setPublisher] = useState(0);

    const [authors, setAuthors] = useState([]);

    const [publishers, setPublishers] = useState([]);

    const handleName = (e) => {
        setName(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleAuthor = (e) => {
        setAuthor(e.target.value);
    }

    const handlePublisher = (e) => {
        setPublisher(e.target.value);
    }

    const handleIsAdmin = (e) => {
        setIsAdmin(e.target.checked);
    }

    const handleCreate = async (e) =>{
        e.preventDefault();
        let data = getData();
        let result = await put('admin/create-'+key,data);
        if(result)
            alert(result.message);
        history.push('/manage/'+key);
    }

    const getData = ()=>{
        switch(key){
            case 'user':
                return {name,password,isAdmin:isAdmin?'Y':'N'};
            case 'book':
                return {name,author,publisher};
            default:
                return {name};
        }
    }

    useEffect(async() => {
        let path = window.location.pathname.split("/")[2];
        setKey(path);
        if(path=='book'){
            let authorList = await get('admin/get-all-authors');
            let publisherList = await get('admin/get-all-publishers');
            if(authorList)
                setAuthors(authorList.data);
            if(publisherList)
                setPublishers(publisherList.data);
        }
    }, []);

    return (
        <div >
            <Header history={history}/>
            <form className={classes.form} onSubmit={handleCreate}>
                <TextField
                    value={name}
                    variant="outlined"
                    margin="normal"
                    required
                    id="name"
                    label="name"
                    name="name"
                    onChange={handleName}
                    autoComplete="username"
                    autoFocus
                />
                {
                    key == 'user'
                        ?
                        <React.Fragment>
                            <TextField
                                value={password}
                                variant="outlined"
                                margin="normal"
                                required
                                name="password"
                                label="password"
                                type="password"
                                id="password"
                                onChange={handlePassword}
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={isAdmin}
                                        onChange={handleIsAdmin}
                                        name="checkedB"
                                        color="primary"
                                    />
                                }
                                label="Admin User"
                            />
                        </React.Fragment>
                        : null
                }
                {
                    key == 'book'
                        ?
                        <React.Fragment>
                            <FormControl variant="outlined">
                                <InputLabel htmlFor="outlined-age-native-simple">Author</InputLabel>
                                <Select
                                    native
                                    required
                                    value={author}
                                    onChange={handleAuthor}
                                    label="Author"
                                    inputProps={{
                                        name: 'Author',
                                        id: 'Author',
                                    }}
                                >
                                    <option aria-label="None" value="" />
                                    {
                                        authors.map((data)=><option value={data.id}>{data.name}</option>)
                                    }
                                </Select>
                            </FormControl>
                            <FormControl variant="outlined">
                                <InputLabel htmlFor="outlined-age-native-simple">Publisher</InputLabel>
                                <Select
                                    native
                                    required
                                    value={publisher}
                                    onChange={handlePublisher}
                                    label="Publisher"
                                    inputProps={{
                                        name: 'Publisher',
                                        id: 'Publisher',
                                    }}
                                >
                                    <option aria-label="None" value="" />
                                    {
                                        publishers.map((data)=><option value={data.id}>{data.name}</option>)
                                    }
                                </Select>
                            </FormControl>
                        </React.Fragment>
                        : null
                }

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                >
                    create {key}
                </Button>
            </form>
        </div>
    );
}