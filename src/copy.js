render() {
  return(
    <div className="App">
      <header className="PanoSTL">
        <img src=={PanoSTL} className="PanoSTL" alt="logo"/>
        <h1 className="App-title">St. Louis Progressive</h1>
      </header>
    </div>
    <div className="background"></div>
    <p className="App-intro">Find your State Representative</p>
    <div className="info">
      <h2>What is a STL Progressive?</h2>
      <div className="expand">
        <i className="fa fa-plus-square" onClick={this.togglePopup.bind(this)}>Info</i>
      </div>
    </div>
    <div className="info">
      <h2>What is a STL Progressive</h2>
      <div className="expand">
        <i className="fa fa-plus-square" onClick={this.togglePopup.bind(this)}></i>
      </div>
    </div>
    <div className="info">
      <h2>How to get involved</h2>
      <div className="expand">
        <i className="fa fa-plus-square" onClick={this.togglePopup.bind(this)}></i>
      </div>
      {this.state.showPopup ?
          <Popup
            text='Close Me'
            closePopup={this.togglePopup.bind(this)}
          />
          : null
        }
      <SdkMap store={store}/>
    </div>
  );
}
