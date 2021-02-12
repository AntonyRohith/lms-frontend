import {useState,useEffect} from 'react';

import Header from './Header';
import CustomTable from './CustomTable';

import { get } from '../services/http-service';

export default function ({history}) {

    const [book,setBook] =  useState([]);

    useEffect(async()=>{
        let result = await get('admin/get-all-books');
        if(result)
            setBook(result.data);
    },[]);

    const headers = [{
        id:"name",
        label:"Book Name"
    },{
        id:"active",
        label:"Active"
    }];

    return (
        <div >
            <Header history={history}/>
            <CustomTable headers={headers} data={book} property={{label:"Book Mangement",key:"book",history}}/>
        </div>
    );
}