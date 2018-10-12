import React, {Component} from 'react';

class Widget extends Component {
  componentDidMount() {
    window.myWidgetParam ? window.myWidgetParam : window.myWidgetParam = [];
    window.myWidgetParam.push({id: 19, cityid: '4776242', appid: 'ac01a7489f0aeb8d32243911738e49d1', units: 'imperial', containerid: 'openweathermap-widget-19' });
    (function() {
       var script = document.createElement('script');script.async = true;script.charset = "utf-8";script.src = "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";
       var s = document.getElementsByTagName('script')[0];s.parentNode.insertBefore(script, s);
      }
    )();

  }
  render() {
    return(
      <div>
        <div className='weather-widget' id="openweathermap-widget-19"></div>
      </div>
    );
  }
}

export default Widget;
