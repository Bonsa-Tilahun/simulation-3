import React, {Component} from 'react'
import axios from 'axios'
import searchLogo from '../../assets/search_logo.png'
import { Link } from 'react-router-dom'

import './dashboard.styles.css'

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
        axios.get(`/api/posts?userposts=${this.state.myPost}&search=${this.state.searchInput}`)
        .then(res => {
            this.setState({
                posts: res.data
            })
            // console.log(res.data)
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
        axios.get(`/api/posts?userposts=${this.state.myPost}&search=${this.state.searchInput}`)
        .then(res => {
            this.setState({
                posts: res.data
            })
        })
    }

    render(){
        const posts = this.state.posts.map((post, i) => {
           return (<Link className='post-inner-container' key={i} to={`/post/${post.post_id}`}>
                        <div className='post-title'>
                            <h3>{post.title}</h3>
                         </div>
                        <div className='post-info'>
                            <p>by {post.username}</p>
                            <img className='post-profile-img' src={post.profile_pic + post.id + '?set=set2&size=50x50'} alt="UserIcon"/>
                        </div>
                    </Link>
                )
            }
        )
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

export default Dashboard