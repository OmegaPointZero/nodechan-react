import React, { Component } from 'react';


class PostForm extends Component {

    constructor(props){
        super(props);
        this.state = { target: null }
    }

    render(){

        /* 
            Depending on prop passed, make ID newThread or newPost.
            Use this to differentiate between where to send AJAX requests
        */

        return(
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
        );
    }
}

export default PostForm
