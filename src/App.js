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

const store = createStore(combineReducers({"map": SdkMapReducer,}),
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

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


    const addDataFromGeoJSON = (url) => {

        return fetch(url)
        .then(
          response => response.json(),
          error => console.error('An error occured.', error),
        )

        .then(json => {
          store.dispatch(SdkMapActions.addSource('stlPolygon', {
            type: 'geojson',
            data: json
          }));
          store.dispatch(SdkMapActions.addLayer({
            id: 'stlPolygon',
            type: 'fill',
            source: 'stlPolygon',
            paint: {
              'fill-opacity': 0.2,
              'fill-color': '#ff6347',
            }
          }));
        });
      }
      addDataFromGeoJSON('map_data/stlPolygon.geojson');
    
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
             {this.state.showPopup ?
            <Popup
              text="A Berniecrat"
              closePopup={this.togglePopup.bind(this)}
            />
            : null
          }
          </div>
         </div>
        <div className="info">
          <h2>What is a STL Progressive</h2>
          <div className="expand">
            <i className="fa fa-plus-square" onClick={this.togglePopup.bind(this)}></i>
           {this.state.showPopup ?
            <Popup
              text="A Berniecrat"
              closePopup={this.togglePopup.bind(this)}
            />
            : null
          }
          </div>
        </div>
        <div className="info">
          <h2>How to get involved</h2>
          <div className="expand">
            <i className="fa fa-plus-square" onClick={this.togglePopup.bind(this)}></i>
          </div>
          {this.state.showPopup ?
              <Popup
                text="Check out our map below to find a local progressive"
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
