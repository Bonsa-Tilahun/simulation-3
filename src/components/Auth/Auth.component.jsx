import React, {Component} from 'react'
import {connect} from 'react-redux'
import {loginUser} from '../../ducks/reducer'
import Axios from 'axios'
import Logo from '../../assets/helo_logo.png'

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
            <div className='login-card-container'>
                <div className='login-card'>
                    <img className='login-logo' src={Logo} alt="Logo"/>
                    <h1 className='login-name'>Helo</h1>
                    <form className='login-form'>
                        <label htmlFor="username">Username:</label>
                        <input name='username' type='text' onChange={(e)=>this.handleChange(e)}/> <br/>
                        <label htmlFor="password">Password:</label>
                        <input name='password' type='password' onChange={(e)=>this.handleChange(e)}/>
                    </form>
                    
                    <button className='login-btn' onClick={()=>this.handleLogin()}>Login</button>
                    <button className='login-btn' onClick={()=>this.handleRegister()}>Register</button>
                </div>
            </div>
        )
    }
}

export default connect(null, {loginUser})(Auth)