import React, { Component } from 'react';
import Footer from './Footer';
import BoardMenu from './BoardMenu';
import Banner from './Banner';
import Post from './Post';
import PostForm from './PostForm';
const request = require('superagent');

class Board extends Component {
    constructor(props){
        super(props);
        this.state = { 
            posts: null,
            board: props.match.params.board,
            thread: props.match.params.thread,  
            boards: null,
            thisBoard: null,
            replies: null,
            images: null,
            posters: null
        }
    }

    renderPosts = (posts) => {
        var p = []
        posts.forEach(function(post){
            p.push(<Post post={post} />)
        })
        return p
    }

    countImages = (posts) => {
        var images = 0;
        for(var i=0;i<posts.length;i++){
            var thisPost = posts[i]
            if(thisPost.fileSize !== undefined){
                images++
            }
        }
        return images
    }

    getUnique = (array,item) => {
        var allitems = array.map(a=>a[item])
        var uniqueItems = allitems.filter(function(post,position){
            return allitems.indexOf(post) === position
        })
        return uniqueItems.length
    }

    componentDidMount(){

        // Get boards data for menu and for the title
        request.get('http://127.0.0.1:8080/api/boardList')
        .end((err,response)=>{
            var res = response.body
            this.setState({boards:res})
            var thisBoard = this.state.boards.find(board => board.boardCode === this.state.board);
            this.setState({thisBoard: thisBoard})
        })

        var apiURI = 'http://127.0.0.1:8080/api/thread/'+this.state.board+'/'+this.state.thread
        request.get(apiURI)
        .end((err,response)=>{
            var res = response.body
            var images = this.countImages(res);
            var posters = this.getUnique(res,'userID');
            this.setState({posts:res, replies: res.length, images: images, posters:posters})
        })
    };

    render(){
        if(!this.state.posts){
            return <div>Loading...</div>
        } else {
            var returnButtonTarget = "/boards/"+this.state.board+"/";
            var catalogButtonTarget = "/catalog/"+this.state.board;
            var refreshButtonTarget = "/"+this.state.board+"/thread/"+this.state.thread;
            var threadNav = function(position){
                if(position==="top"){
                    return(<div className="threadNav">[<a href={returnButtonTarget}>Return</a>] [<a href={catalogButtonTarget}>Catalog</a>] [<a href="#footer">Bottom</a>] [<a href={refreshButtonTarget}>Update</a>]</div>)
                } else {
                    return(<div className="threadNav">[<a href={returnButtonTarget}>Return</a>] [<a href="#footer">Top</a>] [<a      href={refreshButtonTarget}>Refresh</a>]</div>)
                }
            }

            return(
                <div>
                    <BoardMenu boards={this.state.boards} />
                    <div className="topBanner">
                        <hr className="abovePostForm" />
                        <Banner />
                    </div>
                    <h1 className="boardTitle"> /{this.state.thisBoard.boardCode}/ - {this.state.thisBoard.boardTitle} </h1>
                    <hr className="abovePostForm" />
                    <PostForm type="newPost" />
                    <hr />
                    <div className="overboard" id="top">
                        &nbsp;{threadNav("top")}
                        <div className="metadata"> 
                            / <span className="threadMetaData" id="replies" title="Replies">{this.state.replies}</span> / <span className="threadMetaData" id="images" title="Images">{this.state.images}</span> / <span className="threadMetaData" id="posters" title="Posters">{this.state.posters}</span> / 
                        </div>
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
