import ComponentBase      from '../application/ComponentBase'
import FileInput from 'react-file-input';

export default class FileUploader extends ComponentBase {
  constructor(props) {
    super(props);
    
    this.state = {
      files: []
    };
  }

  handleChange(event) {
    this.setState({ files: event.target.files })
  }

  render() {
    return (
      <div className="cp-fileuploader">
        <form ref="upload_form" action={this.props.url || '/media'}
              encType="multipart/form-data" method="POST">
          <FileInput name="image_data" accept=".png,.gif,.jpg"
                     placeholder="Choose an Image..."
                     className="cp-fileinput"
                     onChange={this.handleChange} 
          />
          <input type="submit" value="Save" />
        </form>
      </div>
    );
  }
}