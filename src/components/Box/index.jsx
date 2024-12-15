// @ts-nocheck
import PropTypes from 'prop-types';
import { forwardRef } from 'react';

const Box = forwardRef(({
  fullWidth = false,
  fullHeight = false,
  scrollable = false,
  width = 'auto',
  height = 'auto',
  m = 'var(--margin)',
  ml,
  mr,
  mt,
  mb,
  br,
  pd,
  pt,
  pb,
  pl,
  pr,
  bg,
  backgroundColor = 'var(--color-background)',
  borderRadius = 'var(--border-radius)',
  border = 'none',
  boxShadow = 'none',
  column = false,
  justifyContent = 'flex-start',
  alignItems = 'flex-start',
  gap = '0',
  children,
  style = {},
  ...props
}, ref) => {
  const computedStyle = {
    width: fullWidth ? '100%' : width,
    height: fullHeight ? '100%' : height,
    overflowY: scrollable ? 'auto' : undefined,
    padding : pd ?? pt ?? pl ?? pr ?? pd,
    margin: m,
    marginLeft: ml ?? m,
    marginRight: mr ?? m,
    marginTop: mt ?? m,
    marginBottom: mb ?? m,
    backgroundColor: bg ?? backgroundColor,
    borderRadius : br ?? borderRadius,
    border,
    boxShadow,
    display: 'flex',
    flexDirection: column ? 'column' : 'row',
    justifyContent,
    alignItems,
    gap,
    ...style,
  };

  return (
    <div ref={ref} style={computedStyle} {...props}>
      {children}
    </div>
  );
});

Box.propTypes = {
  fullWidth: PropTypes.bool,
  fullHeight: PropTypes.bool,
  scrollable: PropTypes.bool,
  width: PropTypes.string,
  height: PropTypes.string,
  m: PropTypes.string,
  ml: PropTypes.string,
  mr: PropTypes.string,
  mt: PropTypes.string,
  mb: PropTypes.string,
  br: PropTypes.string,
  pd: PropTypes.string,
  pt: PropTypes.string,
  pb: PropTypes.string,
  pl: PropTypes.string,
  pr: PropTypes.string,
  backgroundColor: PropTypes.string,
  borderRadius: PropTypes.string,
  border: PropTypes.string,
  boxShadow: PropTypes.string,
  column: PropTypes.bool,
  justifyContent: PropTypes.oneOf(['flex-start', 'center', 'flex-end', 'space-between', 'space-around']),
  alignItems: PropTypes.oneOf(['flex-start', 'center', 'flex-end', 'stretch']),
  gap: PropTypes.string,
  children: PropTypes.node,
  style: PropTypes.object,
};

Box.displayName = 'Box';

export default Box;
