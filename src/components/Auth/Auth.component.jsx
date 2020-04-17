import React, {Component} from 'react'
import {connect} from 'react-redux'
import {loginUser} from '../../ducks/reducer'
import Axios from 'axios'

import './auth.styles.css'

class Auth extends Component {
    constructor() {
        super()
        this.state={
            username:'',
            password:''
        }
    }

    handleChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleRegister = () =>{
        console.log("register user", this.props)
        const body= {username: this.state.username, password: this.state.password, profile_pic:'https://robohash.org/'}
        Axios.post('/auth/register', body).then(res => {
            const {id, username, profile_pic} = res.data
            this.props.loginUser(id, username, profile_pic)
            this.props.history.push('./dashboard')
        }).catch(()=>alert('Unable to create an account'))
    }

    handleLogin = () => {
        console.log('logging user in', this.props)
        const body= {username: this.state.username, password: this.state.password}
        Axios.post('/auth/login', body).then(res => {
            const {id, username, profile_pic} = res.data
            this.props.loginUser(id, username, profile_pic)
            this.props.history.push('./dashboard')
        }).catch((err)=>alert(err,'Unable to create an account'))
    }
    render(){
        return(
            <div className='login-card'>
                <p>Username</p>
                <input name='username' type='text' onChange={(e)=>this.handleChange(e)}/>
                <p>Password</p>
                <input name='password' type='password' onChange={(e)=>this.handleChange(e)}/>
                <button onClick={()=>this.handleLogin()}>Login</button>
                <button onClick={()=>this.handleRegister()}>Register</button>
            </div>
        )
    }
}

export default connect(null, {loginUser})(Auth)