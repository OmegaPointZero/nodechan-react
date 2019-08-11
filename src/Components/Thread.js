import React, { Component } from 'react';
import Footer from './Footer';
import BoardMenu from './BoardMenu';
import Banner from './Banner';
import Post from './Post';
import ReactHtmlParser from 'react-html-parser';
const postgen = require('../tools/postmaker.js');
const request = require('superagent');

class Board extends Component {
    constructor(props){
        super(props);
        this.state = { posts: null }
    }

    renderPosts = (posts) => {
        var p = []
        posts.map(function(post){
            p.push(<Post post={post} />)
        })
        return p
    }


    componentDidMount(){
        var loc = window.location.pathname.split('/');
        var apiURI = 'http://127.0.0.1:8080/api/thread/'+loc[1]+'/'+loc[3];
        request.get(apiURI)
        .end((err,response)=>{
            var res = response.body
            var postContainer = []
            postContainer.push('<div class="thread" id="t'+res[0].postID+'">')
            for(var i=0;i<res.length;i++){
                postContainer.push(postgen.makePost(res[i]))
            }
            postContainer.push('</div>')
            var pc = postContainer.join('')
            this.setState({createdPosts:pc, posts:res})
        })
    };

    render(){

        return(
            <div>
                <BoardMenu />
                <div className="topBanner">
                    <Banner />
                </div>
                <hr />
                {this.renderPosts(this.state.posts)}
                <BoardMenu />
                <Footer />
            </div>
        )
    } 
}

export default Board;
