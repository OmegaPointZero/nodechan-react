import React, { Component } from 'react';
import Footer from './Footer';
import BoardMenu from './BoardMenu';
import Banner from './Banner';
import Post from './Post';
const request = require('superagent');

class Board extends Component {
    constructor(props){
        super(props);
        this.state = { 
            posts: null,
            board: props.match.params.board,
            thread: props.match.params.thread,  
            boards: null,
        }
    }

    renderPosts = (posts) => {
        var p = []
        posts.forEach(function(post){
            p.push(<Post post={post} />)
        })
        return p
    }


    componentDidMount(){

        // Get boards data for menu and for the title
        request.get('http://127.0.0.1:8080/api/boardList')
        .end((err,response)=>{
            var res = response.body
            this.setState({boards:res})
        })

        var apiURI = 'http://127.0.0.1:8080/api/thread/'+this.state.board+'/'+this.state.thread
        request.get(apiURI)
        .end((err,response)=>{
            var res = response.body
            this.setState({posts:res})
        })
    };

    render(){
        if(!this.state.posts){
            return <div>Loading...</div>
        } else {
            return(
                <div>
                    <BoardMenu boards={this.state.boards} />
                    <div className="topBanner">
                        <hr className="abovePostForm" />
                        <Banner />
                    </div>
                    <hr />
                    {this.renderPosts(this.state.posts)}
                    <BoardMenu boards={this.state.boards} />
                    <Footer />
                </div>
            )
        }
    } 
}

export default Board;
