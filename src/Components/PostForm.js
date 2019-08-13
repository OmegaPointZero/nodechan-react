import React, { Component } from 'react';
const request = require('superagent');

class PostForm extends Component {

    constructor(props){
        super(props);
        this.state = { target: null, board: this.props.board, thread: this.props.thread, type:props.type }
    }

    handleSubmit(event) {
        // Prevent default behavior
        event.preventDefault();
        var url;
        if(this.props.type ==="newPost"){
            url = process.env.REACT_APP_SERVER+"/api/thread/"+this.state.board+"/"+this.state.thread;
            console.log(`target url: ${url}`)
        } else /* newThread */ {
            url = process.env.REACT_APP_SERVER+"/api/boards/"+this.state.board
        }
        const data = new FormData(event.target);
        request.post(url)
        .send(data)
        .end((err,response)=>{
            console.log(response)
        })
        
        
        // Do your Axios stuff here
    }

    render(){

        return(
            <form id="submitPost" onSubmit={this.handleSubmit.bind(this)} action="" method="post" encType="multipart/form-data">
                <table id={this.props.type} >
                    <tbody>
                        <tr data-type="Name">
                            <td>Name</td>
                            <td><input type="text" name="name" placeholder="name" /></td>
                        </tr>
                        <tr data-type="Subject">
                            <td>Subject</td>
                            <td><input type="text" name="subject" placeholder="subject" /> <button type="submit" id="sendPost">Submit</button></td>
                        </tr>
                        <tr data-type="Text">
                            <td>Comment</td>
                            <td><textarea name="text" cols="48" rows="4" warp="soft"></textarea></td>
                        </tr>
                        <tr data-type="file">
                            <td>File</td>
                            <td><input type="file" name="post-image" id="post-image" /></td>
                        </tr>
                    </tbody>
                </table>
            </form>
        );
    }
}

export default PostForm
