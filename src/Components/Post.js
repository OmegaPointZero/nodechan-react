import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';

class Post extends Component {

    render(){

        var post = this.props.post;
        var name;
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
            return ReactHtmlParser(m)
        }

        const memeArrows = function(post){
            if(post.OP !== post.postID){
               return ( <div className="memeArrows">&gt;&gt;</div> )
            } else {
                return(<div></div>)
            }
        }

        var opH;
        if(post.OP===post.postID){
            opH = "post OP"
        } else {
            opH = "post reply"
        }

        const imageSection = function(){
            if(post.fileName){
                if(post.fileName){
                    var fn = post.fileName.split('.')[0]
                    var link = "http://127.0.0.1:8080/images/"+post.fileName
                    var src = "http://127.0.0.1:8080/images/s"+fn+".png"
                    var size = post.fileSize + " Bytes"
                    return(
                        <div className="file">
                            <div className="FileInfo"> File: <a href={link} target="_blank" className="fileLink">{post.fileOriginalName}</a>
                            {createFileSize(post.fileSize)} {post.fileDimensions})
                            </div>
                            <div className="thumbnail">
                                <a href={link} target="_blank"><img src={src} alt={size} /></a>
                            </div>
                        </div>)
                } else {
                    return(<div></div>) 
                }            
            }
        }

        var delID = "delete_"+post.postID
        var posterUIDClass = "posteruid id_"+post.postID;
        var pID = "#"+post.postID;
        var rpID = "rp-"+post.postID
        var mrpID = "m"+rpID
        var reportLink = "report-link-"+post.postID
        var reportURL = "/report/"+post.board+"/"+post.postID
        var postBody = postMessage(post.body)
        if(postBody === undefined){
            postBody = ""
        }

        var reply = function(bv, meta){
            if(bv===false){
                return null;
            } else {
                var url = "/"+meta.board+"/thread/"+meta.OP;
                return (<span> [<a href={url} className="reply-link">Reply</a>] </span>)
            }
        }

        return(
            <div className="postContainer" id={post.postID}>
                {memeArrows(post)}
                <div id={post.postID} className={opH}>
                    <div className="postInfo">
                        <input type="checkbox" name="" id={delID} className="postDeleteBox" value="delete" />
                        <span className="subject">
                            {post.subject}
                        </span>
                        <span className="nameBlock">
                            <span className="name">
                                {name}
                            </span>
                            <span className={posterUIDClass}>
                                (ID: <span className="hand" title="Highlight posts by this ID" style={{backgroundColor: post.userIDColor}}>
                                    <a className="userID"> 
                                        {post.userID} 
                                    </a>
                                     </span>)
                            </span>
                            <span className="postTime">
                                {generateTime(post.time)}
                            </span>
                            <span className="postNumber">
                                <a href={pID} className="highlightThisPost" id={post.postID}>
                                    No. 
                                </a>
                                <a href="#" className="quotePostNumber" id={post.postID}>
                                    {post.postID}&nbsp;
                                </a>
                                <span>
                                    {reply(this.props.boardViewOP, this.props.meta)}
                                    <a href="#" className="report" id={rpID}>
                                                         ▶ 
                                    </a>
                                    <div className="reply report-button hidden" id={mrpID} syle={{width: '5%', height: '2%', fontSize: '8px', position:'relative'}}>
                                        <a className="report-link" id={reportLink} target="_blank" href={reportURL}>
                                            Report
                                        </a>
                                   </div>
                                </span>
                            </span>
                        </span>
                    </div>
                    {imageSection()}
                    <div className="postMessage">
                        {postBody}
                    </div>
                </div>  
            </div>
        )
    } 
}

export default Post;
