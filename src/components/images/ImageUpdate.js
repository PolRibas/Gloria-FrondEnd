import React, { Component } from "react";
import FileUploader from "react-firebase-file-uploader";
import firebase from "firebase";
import { thisTypeAnnotation } from "@babel/types";

class FileUploadComponent extends Component {
  state = {
    isUploading: false,
    progress: 0,
    avatarURL: ""
  };


 
  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });

  handleProgress = progress => this.setState({ progress });

  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };

  handleUploadSuccess = filename => {
    this.setState({ progress: 100, isUploading: false });
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then(url => {
        console.log(url)
        this.props.getUrl(url)
      });
  };
 
  render() {
    const {isUploading, progress, avatarURL} = this.state;
    console.log(this.state.avatarURL)
    return (
      <div>
        <form>
          <label>Image:</label>
          {isUploading && <p>Progress: {progress}</p>}
          {avatarURL && <img src={avatarURL} alt='name'/>}
          <FileUploader
            accept="image/*"
            name={this.props.name}
            randomizeFilename
            storageRef={firebase.storage().ref("images")}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
          />
        </form>
      </div>
    );
  }
}
 
export default FileUploadComponent;