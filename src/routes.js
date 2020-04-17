import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard/Dashboard.component'
import Auth from './components/Auth/Auth.component'
import Form from './components/Form/Form.component'
import Post from './components/Post/Post.component'

export default <Switch>
    <Route exact path='/' component={Auth}/>
    <Route path='/dashboard' component={Dashboard}/>
    <Route path='/post/:postid' component={Post}/>
    <Route path='/new' component={Form}/>
</Switch>