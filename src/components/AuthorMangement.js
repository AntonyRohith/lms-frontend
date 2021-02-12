import {useState,useEffect} from 'react';

import Header from './Header';
import CustomTable from './CustomTable';

import { get } from '../services/http-service';

export default function ({history}) {

    const [author,setAuthor] =  useState([]);

    useEffect(async()=>{
        let result = await get('admin/get-all-authors');
        if(result)
            setAuthor(result.data);
    },[]);

    const headers = [{
        id:"name",
        label:"Author Name"
    },{
        id:"active",
        label:"Active"
    }];

    return (
        <div >
            <Header history={history}/>
            <CustomTable headers={headers} data={author} property={{label:"Author Mangement",key:"author",history}}/>
        </div>
    );
}