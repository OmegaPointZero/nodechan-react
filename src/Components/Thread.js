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

            var isOP = (post.postID === post.OP)
            var name = post.name;
            if(post.name ===''){
                name = 'Anonymous';
            }

            const generateTime = function(pt){
                var ptime = new Date(pt);
                var time = String(ptime).split(" ")
                var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
                var month = months.indexOf(time[1])+1
                var day = time[2]
                var year = time[3].slice(2)
                if(month<10){ month = String("0"+month) } 
                var t = month+"/"+day+"/"+year+" ("+time[0]+")  "+time[4]
                return t;
            }

            const createFileSize = function(fs){
                var size = '';
                if(fs < 1000 ){
                    size += "("+ fs +"Bytes, " 
                } else {
                    var filesize = Math.floor(fs/1000);
                    if(filesize < 1000){
                        size += "("+ filesize +" KB, "
                    } else if(filesize > 1000) {
                        var newsize = Math.floor(filesize/1000) + "." + filesize%100;
                        size += "("+newsize+" MB, "
                     }
                }  
                return size 
            }

            const postMessage = function(body){
                var m = ""
                var mySplit = body.split('\r\n')
                mySplit.forEach(function(lines){
                    m += '<span class="postContents" '
                    if(/^&gt;/.test(lines)){
                        m+= 'style="color:#789922"'
                    }
                    m += '>'
                    var lArr = lines.split(' ')
                        for(var i=0;i<lArr.length;i++) {
                            var word = lArr[i]
                            if(/^&gt;&gt;\d+$/.test(word)){
                                lArr[i] = '<a href="#'+word.slice(8)+'" class="postLink">'+word+'</a>'
                            }
                        }   
                    m += lArr.join(' ')
                    m +="</span><br/>"
                }) 
                return m
            }

            var prevImage = function(image){
                var i = image.split('.');
                return 's'+i[0]+'.png'
            }

            var html = '';
            html += '<div class="postContainer" id="p'+post.postID+'">';
            if(!isOP){
                html += '<div class="memeArrows">&gt;&gt;</div>';
                html += '<div id="'+post.postID+'" class="post reply">';
            } else if(isOP){
                html += '<div id="'+post.postID+'" class="post OP">';
            }
            html += '<div class="postInfo"><input type="checkbox" name="" id="delete_'+post.postID+'" class="postDeleteBox" value="delete"><span class="subject">'+post.subject+'</span><span class="nameBlock"><span class="name">'+name+'</span><span class="posteruid id_'+post.userID+'"> (ID: <span class="hand" title="Highlight posts by this ID" style="background-color: '+post.userIDColor+'"><a class="userID">'+post.userID+'</a></span>)<span title="United States" class="flag flag-us"></span></span>'
            html += '<span class="postTime">'+generateTime(post.time)+'<span>'
            html += '<span class="postNumber"><a href="#'+post.postID+'" class="highlightThisPost" id="'+post.postID+'">No. </a><a href="#" class="quotePostNumber" id="'+post.postID+'">'+post.postID+'</a><span> <a href="#" class="report" id="rp-'+post.postID+'"> ▶ </a><div class="reply report-button hidden" id="mrp-'+post.postID+'" syle="width:5%;height:2%;font-size:8px;position:relative;z-index:0"><a class="report-link" id="report-link-'+post.postID+'" target="_blank" href="/report/'+post.board+'/'+post.postID+'">Report</a></div></div>'
            if(post.fileName){
                html += '<div class="file"><div class="FileInfo"> File: <a href="http://127.0.0.1:8080/images/'+post.fileName+'" target="_blank" class="fileLink">'+post.fileOriginalName+'</a> ' + createFileSize(post.fileSize)+ ' '+post.fileDimensions+')</div><div class="thumbnail"><a href="http://127.0.0.1:8080/images/s'+post.fileName+'" target="_blank"><img src="http://127.0.0.1:8080/images/'+prevImage(post.fileName)+'" alt="'+post.fileSize+' Bytes"></a></div></div>'
            }
            var postBody = postMessage(post.body)
            console.log(`post.body: ${post.body}`)
            console.log(`postBody: ${postBody}`)
            if(postBody === undefined){
                postBody = ""
            }
            html += '<div class="postMessage">' + postBody + '</div>'
            html += '</div></div>'
            return html
        }

        var loc = window.location.pathname.split('/');
        var apiURI = 'http://127.0.0.1:8080/api/thread/'+loc[1]+'/'+loc[3];
        request.get(apiURI)
        .end((err,response)=>{
            var res = response.body
            var postContainer = []
            postContainer.push('<div class="thread" id="t'+res[0].postID+'">')
            for(var i=0;i<res.length;i++){
                postContainer.push(makePost(res[i]))
            }
            postContainer.push('</div>')
            var pc = postContainer.join('')
            this.setState({posts:pc})
        })
    };

    render(){

        return(
            <div>
                <BoardMenu />
                {ReactHtmlParser(this.state.posts)}
                <BoardMenu />
                <Footer />
            </div>
        )
    } 
}

export default Board;
