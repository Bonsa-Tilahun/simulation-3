import React, {Component} from 'react'
import Post from '../Post/Post.component'
import axios from 'axios'
import searchLogo from '../../assets/search_logo.png'

import './dashboard.styles.css'
import { connect } from 'react-redux'

class Dashboard extends Component {
    constructor() {
        super()
        this.state={
            searchInput:'',
            myPost: true,
            posts:[]
        }
    }
    handleChage = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
            // 
        })
    }
    handleToggel =(e)=>{
        this.setState({
            myPost: !this.state.myPost
        })
    }

    componentDidMount = () =>{
        axios.get(`/api/posts/${this.props.userId}?userposts=${this.state.myPost}&search=${this.state.searchInput}`)
        .then(res => {
            this.setState({
                posts: res.data
            })
            console.log(res.data)
        })
    }

    reset = async ()=>{
        await this.setState({
            searchInput:'',
            myPost: true
        })
        
        this.componentDidMount()
    }

    search = () =>{
        axios.get(`/api/posts/${this.props.userId}?userposts=${this.state.myPost}&search=${this.state.searchInput}`)
        .then(res => {
            this.setState({
                posts: res.data
            })
        })
    }

    render(){
        const posts = this.state.posts.map((post, i) => {
           return <Post key={i} post={post}/>
        })
        return(
            <div className='dashboard-container'>
                <div className='dashboard-inner'>
                    <div className='dashboard-search-container'>
                        <div className='search-area'>
                            <input className="dashboard-search" placeholder='Search by Title' name='searchInput' onChange={(e)=>this.handleChage(e)}
                                type="text" value={this.state.searchInput}
                            />
                            <img onClick={()=>this.search()} className='search-img' src={searchLogo} alt="search"/>
                            <button onClick={()=>this.reset()} className='search-btn'>Reset</button>
                        </div>
                        <div className='dashboard-search-additional-info'>
                            <p>My Post</p>
                            <input type="checkbox" defaultChecked={this.state.myPost} id="checkbox" 
                            onChange={(e)=>this.handleToggel(e)}/>

                        </div>

                    </div>
                    <div className='dashboard-posts'>
                        {posts}
                    </div>

                </div>
               
            </div>
        )
    }
}
const mapStateToDashboard = reduxState => {
    return {userId: reduxState.user.id}
}
export default connect(mapStateToDashboard)(Dashboard)