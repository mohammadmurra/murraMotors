import React, {useEffect, useState} from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import {DELET_EMPLOYEE} from 'query/deletQuerys/deletQuerys';
import {useLazyQuery} from '@apollo/client';
import {Modal} from '@mui/material';
import EditEmployee from './../EditEmployee';
const EmployeeActions = ({employee}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [deletEmployee, {data}] = useLazyQuery(DELET_EMPLOYEE);
  const [openEditEmployeeModal, setOpenEditEmployeeModal] = useState(false);

  const handleCloseVariantModal = () => {
    setOpenEditEmployeeModal(false);
  };
  useEffect(() => {
    if (data) {
      console.log(data);
      alert(data.deletEmployee.result);
    }
  }, [data]);
  const open = Boolean(anchorEl);
  console.log(employee);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const hanleDelet = (e) => {
    e.preventDefault();
    deletEmployee({
      variables: {id: employee.id, email: employee.email},
    });
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleOpenEdit = () => {
    setOpenEditEmployeeModal(true);
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
          <MenuItem style={{fontSize: 14}} onClick={handleClose}>
            View Empployee
          </MenuItem>
          <MenuItem style={{fontSize: 14}} onClick={handleOpenEdit}>
            Edit
          </MenuItem>
          <MenuItem style={{fontSize: 14}} onClick={(e) => hanleDelet(e)}>
            Delete
          </MenuItem>
        </Menu>
      </Box>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={openEditEmployeeModal}
        onClose={handleCloseVariantModal}
        closeAfterTransition
      >
        <EditEmployee employeeData={employee} />
      </Modal>
    </>
  );
};

EmployeeActions.propTypes = {
  employee: PropTypes.object.isRequired,
};
export default EmployeeActions;
