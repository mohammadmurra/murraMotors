import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import {useNavigate} from 'react-router-dom';
import PropTypes from 'prop-types';
import {useIntl} from 'react-intl';
const DebtorsTableActions = ({data}) => {

  const {messages} = useIntl();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigation = useNavigate();
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleViewOrder = () => {
    setAnchorEl(null);
  
    navigation('/management/DebtorsDetails/' + data.id, {
      state: data,
    });
  };



  return (
    <Box>
      <IconButton
        aria-controls='alpha-menu'
        aria-haspopup='true'
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id='alpha-menu'
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem style={{fontSize: 14}} onClick={handleViewOrder}>
          {messages['show.debtorInformation']}
        </MenuItem>
      
      </Menu>
    </Box>
  );
};

DebtorsTableActions.propTypes = {
  data: PropTypes.object.isRequired,
};
export default DebtorsTableActions;
