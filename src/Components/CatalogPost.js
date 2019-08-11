import React, { Component } from 'react';

class CatalogPost extends Component {

    render(){

        var post = this.props.post;
        var fname = post.preview[0].fileName;
        var fn = fname.split('.')[0] + '.png'

        var catalogContainerID = "p" + post.OP;
        var thumbnailLink = "/"+post.preview[0].board+"/thread/"+post.OP;
        var imageURL = 'http://127.0.0.1:8080/images/s'+fn


        return(
            <div className="catalogPreviewContainer">
                <div className="catalogContainer" id={catalogContainerID}>        
                    <div className="file">
                        <div className="thumbnail">
                            <a href={thumbnailLink}>
                                <img src={imageURL} alt={post.preview[0].fileSize} className="catalogThumb" />
                            </a>
                        </div>
                    </div>
                    <div className="catalogMessage">
                        <div className="catContents">
                            <div style={{fontSize: 11}}>
                                R: <b>{post.posts-1}</b> I: <b>{post.images-1}</b>
                            </div>
                            {post.preview[0].body}
                        </div>
                        <br />
                    </div>
                </div>
            </div>
        )

    }
}

export default CatalogPost;
