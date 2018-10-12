import React, {Component} from "react";
import NorfolkVA from "./NorfolkVA.jpg";
import "./App.scss";
import {createStore, combineReducers} from "redux";
import SdkMap from "@boundlessgeo/sdk/components/map";
import SdkMapReducer from "@boundlessgeo/sdk/reducers/map";
import * as SdkMapActions from "@boundlessgeo/sdk/actions/map";
import fetch from "isomorphic-fetch";
import Video from './video';
import Widget from './weatherWidget';
import Popup from './popup';
import Popup2 from './popup2';
import Popup3 from './popup3';
//import ZoomControl from './ZoomControl';



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
    store.dispatch(SdkMapActions.setView([-76.285873, 36.850769], 13));
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
      type: 'raster',
    }));

    const addDataFromGeoJSON = (url) => {

        return fetch(url)
        .then(
          response => response.json(),
          error => console.error('An error occured.', error),
        )

        .then(json => {
          store.dispatch(SdkMapActions.addSource('https://opendata.arcgis.com/datasets/fcaa90ef89de4e17bb2b958915d88ab3_1.geojson', {
            type: 'geojson',
            data: json
          }));
          store.dispatch(SdkMapActions.addLayer({
            id: 'norfolkParks',
            type: 'fill',
            source: 'https://opendata.arcgis.com/datasets/fcaa90ef89de4e17bb2b958915d88ab3_1.geojson',
            paint: {
              'fill-opacity': 0.4,
              'fill-color': '#6918b4',
            }
          }));
        });
      }
      addDataFromGeoJSON('https://opendata.arcgis.com/datasets/fcaa90ef89de4e17bb2b958915d88ab3_1.geojson');


  }


  render() {
    return(
      <div>
        <div className="App">
          <header className="PanoSTL">
            <img src={NorfolkVA} className="NorfolkVA" alt="logo"/>
            <h1 className="App-title">Norfolk Natural</h1>
          </header>
        </div>
        <div className="background"></div>
        <p className="App-intro">Single Page React App</p>
        <div><hr className='hr'></hr></div>
        <div className="row">
          <div className="col-md-4 info">
            <h3 onClick={this.togglePopup.bind(this)}>About Norfolk</h3>
              <div className="expand">
                {this.state.showPopup ? <Popup text='Info about this here' closePopup={this.togglePopup.bind(this)}/> : null}
              </div>
          </div>
          <div className="col-md-4 info">
            <h3 onClick={this.togglePopup.bind(this)}>Norfolk Headlines</h3>
              <div className="expand">
                {this.state.showPopup ? <Popup2 text='News for Norfolk here' closePopup={this.togglePopup.bind(this)}/> : null}
              </div>
          </div>
            <div className="col-md-4 info">
              <h3 onClick={this.togglePopup.bind(this)}>The Author</h3>
                <div className="expand">
                  {this.state.showPopup ? <Popup3 text='About this here' closePopup={this.togglePopup.bind(this)}/>: null}
                </div>
              </div>
            </div>
            <div><hr className='hr'></hr></div>
            <div><Video /></div>
            <div><hr className='hr'></hr></div>
            <div><Widget /></div>
            <div>
            <SdkMap className="col-md-12 stlMap" store={store} />
            </div>
          <div>
            <div><hr className='hr'></hr></div>
              <p className="stamp">Made with love and Boundless SDK by N. Copeland 2018</p>
          </div>
      </div>
    );
  }
}





export default App;
