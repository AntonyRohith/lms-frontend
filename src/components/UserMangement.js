import {useState,useEffect} from 'react';

import Header from './Header';
import CustomTable from './CustomTable';

import { get } from '../services/http-service';

export default function ({history}) {

    const [user,setUser] =  useState([]);

    useEffect(async()=>{
        let result = await get('admin/get-all-users');
        if(result)
            setUser(result.data);
    },[]);

    const headers = [{
        id:"name",
        label:"User Name"
    },{
        id:"active",
        label:"Active"
    }];

    return (
        <div >
            <Header history={history}/>
            <CustomTable headers={headers} data={user} property={{label:"User Mangement",key:"user",history}}/>
        </div>
    );
}