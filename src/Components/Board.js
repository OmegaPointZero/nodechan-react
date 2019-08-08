import React, { Component } from 'react';
import Footer from './Footer';
import BoardMenu from './BoardMenu';
import ReactHtmlParser from 'react-html-parser';
const request = require('superagent');

class Board extends Component {
    constructor(props){
        super(props);
        this.state = { posts: null }
    }

    componentDidMount(){

        const makePost = function(post){
            
            var p = '<div class="catalogPreviewContainer"><div class="catalogContainer" id="p'+post.OP+'">'
            p += '<div class="file"><div class="FileInfo"></div><div class="thumbnail"><a href="/'+post.preview[0].board+'/thread/'+post.OP+'"><img src="http://127.0.0.1:8080/s'+post.preview[0].fileName+'" alt="'+post.preview[0].fileSize+'" class="catalogThumb"></a></div></div>'
            p += '<div class="catalogMessage"><div class="catContents"><div style="font-size:11px;">R: <b>'+(post.posts-1)+'</b> I: <b>'+(post.images-1)+'</div>'+post.preview[0].body+'</div><br></div></div></div></div>'
            return p
        }

        var loc = window.location.pathname;
        var board = loc.split('/')[2];
        var apiURI = 'http://127.0.0.1:8080/api/catalog/'+board;
        console.log("Component did mount, calling fetch...")
        request.get(apiURI)
        .end((err,response)=>{
            var res = response.body
            var postContainer = []
            for(var i=0;i<res.length;i++){
                postContainer.push(makePost(res[i]))
            }/*
            this.setState({posts:JSON.stringify(res[0].preview[0])})*/
            this.setState({posts:postContainer})
        })
    };

    render(){

        return(
            <div>
                <BoardMenu />
                <div className="posts">{ReactHtmlParser(this.state.posts)}</div>
                <BoardMenu />
                <Footer />
            </div>
        )
    } 
}

export default Board;
