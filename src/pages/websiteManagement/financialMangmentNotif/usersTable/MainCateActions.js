import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';

// import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {firebase} from '@crema/services/auth/firebase/firebase';

const deleteFinancialUserNoti = async (email) => {
  try {
    await firebase.firestore().collection('financialUsersNoti').doc(email).delete();
    
    console.log('User deleted successfully');
    window.location.reload();
    // You can add more logic here if needed, like refreshing the list of users
  } catch (error) {
    console.error('Error deleting user:', error);
    // Handle the error, e.g., show an error message
  }
};

const MainCateActions = ({ data }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  // const navigation = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    let wantDelete = window.confirm('Are you sure to delete this user?');
    if (wantDelete) {
      deleteFinancialUserNoti(data.email);
      handleClose();
    }
  };
  return (
    <>
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

          <MenuItem style={{fontSize: 14}} onClick={(e) => handleDelete(e)}>
            Delete
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
};

MainCateActions.propTypes = {
  data: PropTypes.object.isRequired,
};
export default MainCateActions;
