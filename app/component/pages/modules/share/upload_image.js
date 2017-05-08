import React from "react";


export default class UploadImage extends React.Component {
    constructor(){
        super();
        this.state = {
            images : []
        }
    }
    fileAdder(e){
      const that = this;
      const files = e.target.files;
      if (!files.length) return;
      that.setState({images : []}, function(){
          for(let i = 0; i<files.length; i++){
              const image = new Image();
              const reader = new FileReader();
              reader.onload = (e) => {
                  let fileList = that.state.images.slice();
                  fileList.push(e.target.result)
                  that.setState({images: fileList});
              };
              reader.readAsDataURL(files[i]);
            }
      })
    }
    
    render() {
        const that = this;
        return (
            <div className="upload_image animated fadeIn">
                {(_=>{
                    let images = []
                    for(let i =0; i<that.state.images.length; i++){
                        images.push(<img key={i} src={that.state.images[i]} alt=""/>);
                    }
                    return images
                })()}
                <input className="dont-show" multiple="multiple" onChange={that.fileAdder.bind(that)} ref="fileField" type="file" accept=".jpg,.jpeg,.png" />
                <div onClick={(_=>{const input = that.refs.fileField; input.click()}).bind(that)} className="new_image">
                   <svg viewBox="0 0 24 24">
                       <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                    </svg>
                </div>
            </div>
        );
    }
}
