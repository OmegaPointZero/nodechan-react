import React, { Component } from 'react';
import Footer from './Footer';
import BoardMenu from './BoardMenu';
import Banner from './Banner';
import ReactHtmlParser from 'react-html-parser';
const request = require('superagent');
const postgen = require('../tools/postmaker.js');

class Board extends Component {
    constructor(props){
        super(props);
        this.board = props.match.params.board
        this.page = props.match.params.page
        this.state = { board: this.board, page: this.page, threads: null }
    }

    componentDidMount(){
        var page;
        !this.props.page ? page = this.props.page : page = 1; 
        var apiURI = 'http://127.0.0.1:8080/api/board/'+this.props.board+'/'+page;
        request.get(apiURI)
        .end((err,response)=>{
            var res = response.body
            console.log('Response from server:')
            console.log(res)
            var threadsContainer = []
            for(var i=0;i<res.length;i++){
                var thread = res[i];
                var postContainer = []
                postContainer.push('<div class="threadPreviewContainer">')
                for(var j=0;j<thread.preview.length;j++){
                    postContainer.push(postgen.makePost(thread.preview[j]))
                }
                postContainer.push('</div><hr>')
                threadsContainer.push(postContainer)
            }
            this.setState({threads:threadsContainer})
        })
    };

    render(){

        return(
            <div>
                <BoardMenu />
                <div className="topBanner">
                    <hr className="abovePostForm" />
                    <Banner />
                </div>
                <div>{ReactHtmlParser(this.state.threads)}</div>
                <BoardMenu />
                <Footer />
            </div>
        )
    } 
}

export default Board;
