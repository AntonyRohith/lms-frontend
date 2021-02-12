import { Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { get } from '../services/http-service';
import Login from './Login';

export default function ({component,...rest}) {

    const [auth, setAuth] = useState(false);

    useEffect(async () => {
        let result = await get('token');
        if (result.data == 1)
            setAuth(true);
    }, []);

    return (
        <Route component={auth ? component : Login} />
    );
}