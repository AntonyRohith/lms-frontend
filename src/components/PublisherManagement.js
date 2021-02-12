import {useState,useEffect} from 'react';

import Header from './Header';
import CustomTable from './CustomTable';

import { get } from '../services/http-service';

export default function ({history}) {

    const [publisher,setPublisher] =  useState([]);

    useEffect(async()=>{
        let result = await get('admin/get-all-publishers');
        if(result)
            setPublisher(result.data);
    },[]);

    const headers = [{
        id:"name",
        label:"Publisher Name"
    },{
        id:"active",
        label:"Active"
    }];

    return (
        <div >
            <Header history={history}/>
            <CustomTable headers={headers} data={publisher} property={{label:"Publisher Mangement",key:"publisher",history}}/>
        </div>
    );
}