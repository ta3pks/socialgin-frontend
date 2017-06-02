import React from "react";
import { connect } from "react-redux";

import {addImage, removeImage} from "./../../../../actions/shareActions";

@connect(store=>{
    return {
        images : store.Share.images
    }
})
export default class UploadImage extends React.Component {
    constructor(){
        super();
        this.state = {
            showed_images : []
        }
    }
    fileAdder(e){
      const that = this;
      const files = e.target.files;
      if (!files.length) return;
      for(let i = 0; i<files.length; i++){
          that.props.dispatch(addImage(files[i]));
      }
      for(let i = 0; i<files.length; i++){
          const reader = new FileReader();
          reader.onload = (e) => {
              let fileList = that.state.showed_images.slice();
              fileList.push(e.target.result);
              that.setState({showed_images: fileList});
          };
          reader.readAsDataURL(files[i]);
      }
    }
    removeImage(e){
        const that = this;
        const target = e.currentTarget.dataset.index;
        that.props.dispatch(removeImage(target));
        const images = that.state.showed_images.slice();
        images.splice(target, 1);
        that.setState({
            showed_images : images
        })
    }
    render() {
        const that = this;
        return (
            <div className="upload_image animated fadeIn">
                <div className="image-area">
                {that.state.showed_images.map((value, key)=>{
                    return(
                        <div className="image">
                            <img key={key} src={value} alt=""/>
                            <div className="remove-image">
                                <svg viewBox="0 0 24 24" onClick={that.removeImage.bind(that)} data-index={key}>
                                    <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                                </svg>
                            </div>
                        </div>
                    )
                })}
                 <div onClick={(_=>{const input = that.refs.fileField; input.click()}).bind(that)} className="new_image">
                   <svg viewBox="0 0 24 24">
                       <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                    </svg>
                </div>
                </div>
                <input className="dont-show" multiple="multiple" onChange={that.fileAdder.bind(that)} ref="fileField" type="file" accept=".jpg,.jpeg,.png" />
            </div>
        );
    }
}
