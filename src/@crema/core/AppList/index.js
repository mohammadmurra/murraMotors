import React from 'react';
import ListView from './ListView';
import PropTypes from 'prop-types';
import ListFooter from './ListFooter';

const AppList = ({footerProps, ...props}) => {
  return (
    <ListView
      {...props}
      ListFooterComponent={
        footerProps ? (
          <ListFooter
            loading={footerProps.loading}
            footerText={footerProps.footerText}
          />
        ) : null
      }
    />
  );
};

AppList.propTypes = {
  border: PropTypes.bool,
  containerStyle: PropTypes.object,
  ListEmptyComponent: PropTypes.node,
  ListFooterComponent: PropTypes.node,
  data: PropTypes.array.isRequired,
  renderRow: PropTypes.func.isRequired,
  footerProps: PropTypes.shape({
    loading: PropTypes.bool,
    footerText: PropTypes.string,
  }),
};

AppList.defaultProps = {
  border: false,
  data: [],
};

export default AppList;
