import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

import {BASE_URL,post} from '../services/http-service';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop:'5%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '100%',
    height: '100%',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

export default function (props) {

  const classes = useStyles();

  const lendHandler = async (e)=>{
    if(e.target.getAttribute("data")=='Y'){
        let result = await post('user/lend-book?bookId='+e.target.getAttribute("id"),'',true);
        if(result)
            alert(result.message);
        window.location.reload(false);

    }
  };

  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList} cols={4}>
        {props.data.map((book) => (
          <GridListTile key={book.id}>
            <img src={BASE_URL+"image/"+book.img} alt={book.book} />
            <GridListTileBar
              title={book.book}
              subtitle={<span>Author: {book.author} &nbsp; Publisher:{book.publisher}</span>}
              actionIcon={<button id={book.id} data={book.available} onClick={lendHandler} style={{background:book.available=='Y'?'green':'red'}}>{book.available=='Y'?'lend':book.time}</button>}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
