import React, {Component} from "react";
import PanoSTL from "./PanoSTL.jpg";
import "./App.scss";
import {createStore, combineReducers} from "redux";
import SdkMap from "@boundlessgeo/sdk/components/map";
import SdkMapReducer from "@boundlessgeo/sdk/reducers/map";
import * as SdkMapActions from "@boundlessgeo/sdk/actions/map";
//import taxBoundaries from "./map_data/taxBoundaries.geojson";
//import SdkZoomSlider from "@boundlessgeo/sdk/components/map/zoom-slider";
//import fetch from "isomorphic-fetch";
//import {Popup} from "./popup.js";

class Popup extends React.Component {
  render() {
    return (<div className="popup">
      <div className="popup_inner">
        <h1>{this.props.text}</h1>
        <button onClick={this.props.closePopup}>close me</button>
      </div>
    </div>
    );
  }
}

const store = createStore(combineReducers({"map": SdkMapReducer,
}));

class App extends Component {
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

  componentDidMount() {
    // add the OSM source
    //store.dispatch(SdkMapActions.setView([90.37,23.94], 8));
    store.dispatch(SdkMapActions.setView([-90.4125, 38.6103], 10));
    store.dispatch(SdkMapActions.addSource("osm", {
      type: "raster",
      tileSize: 256,
      tiles: [
        "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
        "https://b.tile.openstreetmap.org/{z}/{x}/{y}.png",
        "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png",
      ]
    }));

    store.dispatch(SdkMapActions.addLayer({
      id: 'osm',
      source: 'osm',
    }));


    store.dispatch(SdkMapActions.addLayer({
      /*"id": "stlCounty",
      "type": "fill",
      "source": {
        "type": "geojson",
        "data": {
          "type": "Feature",
          "geometry": {
            "type": "Polygon",
            "coordinates": [[
              [38.8624, -90.3223],
              [38.8093, -90.1307],
              [38.4727, -90.3549],
              [38.5350, -90.7257],
              [38.8624, -90.3223]
            ]]
          }
        }
      },
      "paint": {
        "fill-color": "#088",
        "fill-opacity": 0.2
      }
    }));*/


      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [125.6, 10.1]
      },
      "properties": {
        "name": "Dinagat Islands"
      }
      }));


  }

  render() {
    return(
      <div>
        <div className="App">
          <header className="PanoSTL">
            <img src={PanoSTL} className="PanoSTL" alt="logo"/>
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
                text="Close Me"
                closePopup={this.togglePopup.bind(this)}
              />
              : null
            }
        </div>
        <SdkMap store={store} />
    </div>
    );
  }
}





export default App;
