import React from 'react';
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

const MainCateActions = ({ data }) => {
  const { messages } = useIntl();
  const navigate = useNavigate();

  const handleShowDetails = () => {
    navigate(`/settings/ChecksMangment/CheckbookDetails/${data.checkbookId}`);
  };

  return (
    <Box>
      <Button
        variant="contained"
        startIcon={<VisibilityIcon />}
        onClick={handleShowDetails}
      >
        {messages['Details']}
      </Button>
    </Box>
  );
};

MainCateActions.propTypes = {
  data: PropTypes.object.isRequired,
};

export default MainCateActions;
