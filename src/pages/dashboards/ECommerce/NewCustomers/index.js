import React from 'react';
import AppCard from '@crema/core/AppCard';
import { useIntl } from 'react-intl';
import CustomerItem from './CustomerItem';
import AppList from '@crema/core/AppList';
import AppScrollbar from '@crema/core/AppScrollbar';
import PropTypes from 'prop-types';
import { CircularProgress, Box } from '@mui/material'; // Importing CircularProgress for loading spinner

const NewCustomers = (props) => {
  const { messages } = useIntl();

  if (props.loading) { // If data is loading, show the spinner
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="280px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <AppCard title={messages['eCommerce.newCustomers']} contentStyle={{ px: 0 }}>
      <AppScrollbar sx={{ maxHeight: 280 }}>
        <AppList
          data={props.newCustomers}
          renderRow={(item) => (
            <CustomerItem listStyle='paddingX' key={item.id} item={item} />
          )}
        />
      </AppScrollbar>
    </AppCard>
  );
};

export default NewCustomers;

NewCustomers.propTypes = {
  newCustomers: PropTypes.array,
  loading: PropTypes.bool, // Adding loading prop type
};
