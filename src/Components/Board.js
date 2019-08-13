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
            boards: null, 
            board: props.match.params.board, 
            page: props.match.params.page,    
            threads: null, 
            thisBoard: null,
        }
    }

    renderThreads = (threads, props) => {
        var p = []
        threads.forEach(function(t){
            var meta = {
                "OP":t.OP,
                "board": props.match.params.board,
                "lastBump": t.lastBump,
                "images":t.images,
                "posts":t.posts,
                "sticky":t.sticky,
                "locked":t.locked,
            }
            var threadArr = []
            var preview = t.preview;
            preview.forEach(function(post){
                var bvop = (post.OP === post.postID)
                threadArr.push(<Post post={post} boardViewOP={bvop} meta={meta}/>)
            })
            threadArr.push(<hr />)
            p.push(threadArr)
        })
        return p
    }

    componentDidMount(){

        // Get boards data for menu and for the title
        request.get(process.env.REACT_APP_SERVER+'/api/boardList')
        .end((err,response)=>{
            var res = response.body
            this.setState({boards:res})
            var thisBoard = this.state.boards.find(board => board.boardCode === this.state.board);
            this.setState({thisBoard: thisBoard})
        })

        var page = this.state.page;
        if(page===undefined){
            page = 1;
            this.setState({page:''})
        }
        var apiURI = process.env.REACT_APP_SERVER+'/api/board/'+this.state.board+'/'+page
        request.get(apiURI)
        .end((err,response)=>{
            var res = response.body
            this.setState({threads: res})
        })
    };

    render(){

        var catalogButtonTarget = "/catalog/"+this.state.board;
        var refreshButtonTarget = "/boards/"+this.state.board+"/"+this.state.page 

        const threadNav = function(position,state){
            if(position==="top"){
                return(
                <div className="overboard" id="top">
                    &nbsp;
                    <div className="threadNav">
                        [<a href={refreshButtonTarget}>Refresh</a>]
                        [<a href="#footer">Bottom</a>] 
                        [<a href={catalogButtonTarget}>Catalog</a>]
                    </div>
                </div>
                )
            } else {
                return(
                <div className="overboard" id="bottom">
                    &nbsp;
                    <div className="threadNav">
                        [<a href={refreshButtonTarget}>Refresh</a>]
                        [<a href="#Top">Top</a>] 
                        [<a href={catalogButtonTarget}>Catalog</a>]
                    </div>
                </div>

                )
            }
        }

        const navPage = function(state){
            var arr = [] 
            var page = state.page;
            if(page===''){
                page = 1
            }
            for(var i = 1; i < 11; i++){
                var link = "/boards/"+state.board+"/"+i
                if(i===page){
                    arr.push(<span>[<a href={link} className="pageLink"><b>{i}</b></a>]</span>)
                } else {
                    arr.push(<span>[<a href={link} className="pageLink">{i}</a>]</span>)
                }
            } 
            var nURL = "/boards/"+state.board+"/"+(Number(page)+1)
            arr.push(<a href={nURL}><button>Next</button></a>)
            return arr
        }

        if(!this.state.threads){
            return(<div>Loading...</div>)
        } else {
            return(
                <div>
                    <BoardMenu boards={this.state.boards} />
                    <div className="topBanner">
                        <hr className="abovePostForm" />
                        <Banner />
                    </div>
                    <h1 className="boardTitle"> /{this.state.thisBoard.boardCode}/ - {this.state.thisBoard.boardTitle} </h1>
                    <hr className="abovePostForm" />
                    <PostForm type="newThread" board={this.state.board} thread={null}/>
                    <hr />
                    {threadNav("top",this.state)}
                    <hr />
                    <div className="threadPreviewContainer">
                        {  this.renderThreads(this.state.threads, this.props)}
                    </div>
                    <div className="footMenu">
                        <div className="pageTab">
                            {navPage(this.state)}
                        </div>
                        <hr />
                        {threadNav("bottom",this.state)}
                        <div className="bottomCtrl">
                            <span className="deleteForm">
                                <input type="hidden" name="mode" value="userDelete" />
                                    Delete Post: [<input type="checkbox" name="deleteImageOnly" className="deleteImageOnly" value="true" /> File Only ]
                                <input type="submit" id="delete" value="Delete" />
                            </span>
                        </div>
                    </div>
                    <hr />
                    <BoardMenu boards={this.state.boards} />
                    <Footer />
                </div>
            )
        }
    } 
}

export default Board;
