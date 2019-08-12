import React, { Component } from 'react';

class DeleteForm extends Component {

    render(){
        return (
            <span class="deleteForm">
                <input type="hidden" name="mode" value="userDelete" />
                    Delete Post: [<input type="checkbox" name="deleteImageOnly" className="deleteImageOnly" value="true" /> File Only ]
                <input type="submit" id="delete" value="Delete" />
            </span>
        )
    }
}

export default DeleteForm
