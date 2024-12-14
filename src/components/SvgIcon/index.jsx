import React from 'react';
import PropTypes from 'prop-types';

const SvgIcon = ({
  width = '1.3em',
  height = '1.4em',
  backgroundColor = 'transparent',
  fillColor = 'black',
  source,
  rotate = 0,
  style = {},
  ...props
}) => {
  const computedStyle = {
    display: 'inline-block',
    backgroundColor,
    width,
    height,
    ...style,
  };

  return (
    <div style={computedStyle} {...props}>
      <svg width="100%" height="100%" viewBox="0 0 1300 1200">
        <g transform={`translate(50,1200) scale(1, -1) rotate(${rotate}, 600, 600)`}>
          <path fill={fillColor} d={source}></path>
        </g>
      </svg>
    </div>
  );
};

SvgIcon.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  backgroundColor: PropTypes.string,
  fillColor: PropTypes.string,
  source: PropTypes.string.isRequired,
  rotate: PropTypes.number,
  style: PropTypes.object,
};

export default SvgIcon;
