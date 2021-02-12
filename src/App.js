import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import AuthRouter from './components/AuthRouter'
import AdminAuthRouter from './components/AdminAuthRouter'
import Login from './components/Login';
import UserView from './components/UserView';
import AdminView from './components/AdminView';
import AuthorMangement from './components/AuthorMangement';
import PublisherManagement from './components/PublisherManagement';
import BookManagement from './components/BookManagement';
import UserMangement from './components/UserMangement';
import Create from './components/Create';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Login} />
        <AuthRouter exact path='/search' component={UserView} />
        <AdminAuthRouter exact path='/manage' component={AdminView} />
        <AdminAuthRouter exact path='/manage/author' component={AuthorMangement} />
        <AdminAuthRouter exact path='/manage/publisher' component={PublisherManagement} />
        <AdminAuthRouter exact path='/manage/user' component={UserMangement} />
        <AdminAuthRouter exact path='/manage/book' component={BookManagement} />
        <AdminAuthRouter path='/create/' component={Create} />
        <Redirect to='/' />
      </Switch>
    </BrowserRouter>
  );
}

export default App;