import React, { Component } from 'react';
import Footer from './Footer';
import BoardMenu from './BoardMenu';
import Banner from './Banner';
import ReactHtmlParser from 'react-html-parser';
const request = require('superagent');
const postgen = require('../tools/postmaker.js');

class Post extends Component {
    constructor(props){
        super(props);
        this.state = {isOP: null, post: this.props.post}
    }

    render(){

        var post = this.props.post;
        this.state.isOP = (post.postID === post.OP)
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

        const prevImage = function(image){
            var i = image.split('.');
            return 's'+i[0]+'.png'
        }



        return(
            <div className="postContainer" id="{post.postID}">
            <span>{this.state.post.body}</span>
            </div>
        )
    } 
}

export default Post;
