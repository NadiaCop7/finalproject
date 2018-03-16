import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import * as mapActions from '../../actions/map';
import {DEFAULT_ZOOM} from '../../constants';

class ZoomSlider extends React.Component {
  render() {
    const minZoom = this.props.metadata && this.props.metadata['bnd:minzoom'] !== undefined ? this.props.metadata['bnd:minzoom'] : DEFAULT_ZOOM.MIN;
    const maxZoom = this.props.metadata && this.props.metadata['bnd:maxzoom'] !== undefined ? this.props.metadata['bnd:maxzoom'] : DEFAULT_ZOOM.MAX;
    let className = 'sdk-slider-control';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return (
      <div style={this.props.style} className={className}>
        <input className='sdk-zoom-slider' min={minZoom} max={maxZoom} value={this.props.zoom} onChange={(evt) => {
          this.props.onChange(evt.target.value);
        }} type='range' />
      </div>
    );
  }
}
ZoomSlider.propTypes = {
  /**
   * Css className to use on the root div.
   */
  className: PropTypes.string,
  /**
   * Style config for the root div.
   */
  style: PropTypes.object,
};
function mapStateToProps(state) {
  return {
    zoom: state.map.zoom,
    metadata: state.map.metadata,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    onChange: (value) => {
      dispatch(mapActions.setZoom(value));
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ZoomSlider);
