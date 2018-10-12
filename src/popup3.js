import React, {Component} from 'react';

class Popup3 extends Component {
  constructor() {
      super();
      this.state = {
        showPopup: false
      };
    }
    togglePopup() {
      this.setState({
        showPopup: !this.state.showPopup
      });
    }
    render () {
      console.log(this.props.text);
      return (<div className="popup">
        <div className="popup_inner">
          <p>{this.props.text}</p>
          <button onClick={this.props.closePopup}>close</button>
        </div>
      </div>
      );
    }


}

export default Popup3;
