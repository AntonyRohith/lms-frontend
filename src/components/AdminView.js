import React from 'react';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import Header from './Header';

const useStyles = makeStyles((theme) => ({
    buttons: {
        position: 'absolute',
        display: 'grid',
        top: '20%',
        left: '40%',
        gridRowGap: '30%'
    }
}));

export default function ({ history }) {

    const classes = useStyles();

    return (
        <div >
            <Header history={history}/>
            <div className={classes.buttons}>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={() => history.push('/search')}
                >Search
                </Button>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={() => history.push('/manage/author')}
                >manage author
                </Button>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={() => history.push('/manage/publisher')}
                >manage publisher
                </Button>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={() => history.push('/manage/book')}
                >manage book
                </Button>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={() => history.push('/manage/user')}
                >manage user
                </Button>
            </div>
        </div>
    );
}