import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  TextField,
  Typography,
  Modal,
  useMediaQuery,
  useTheme,
  Alert,
  CircularProgress,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {useMutation} from '@apollo/client';

import {useIntl} from 'react-intl';
import {
  DELETE_CHECKBOOK_MUTATION,
  EDIT_CHECKBOOK_MUTATION,
} from 'query/orderReoprt/getOrder';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '16px',
};

const MainCateActions = ({data, handleAddSuccess}) => {
  const {messages} = useIntl();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [editedName, setEditedName] = useState(data.name);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [editMessage, setEditMessage] = useState('');
  const [deleteMessage, setDeleteMessage] = useState('');

  const [editCheckbook, {loading: editing}] = useMutation(
    EDIT_CHECKBOOK_MUTATION,
    {
      onCompleted: (responseData) => {
        console.log('Edit response data:', responseData);
        if (
          responseData.EditCheckbook &&
          responseData.EditCheckbook.code === 0
        ) {
          console.log('Edit success, calling handleAddSuccess');
          setEditMessage(messages['editSuccess']);
          handleAddSuccess(); // Ensure this is being called
          setEditModalOpen(false);
        } else if (
          responseData.EditCheckbook &&
          responseData.EditCheckbook.code === 1
        ) {
          setEditMessage(messages['nameExist']);
        } else {
          setEditMessage(messages['addError']);
        }
      },
    },
  );

  const [deleteCheckbook, {loading: deleting}] = useMutation(
    DELETE_CHECKBOOK_MUTATION,
    {
      onCompleted: (responseData) => {
        console.log('Delete response data:', responseData);
        if (
          responseData.DeleteCheckbook &&
          responseData.DeleteCheckbook.code === 0
        ) {
          console.log('Delete success, calling handleAddSuccess');
          setDeleteMessage(messages['deleteSuccess']);
          handleAddSuccess(); // Ensure this is being called
          setDeleteConfirmOpen(false);
        } else {
          setDeleteMessage(messages['addError']);
        }
      },
    },
  );

  const handleEdit = () => {
    setEditModalOpen(true);
    setEditMessage('');
  };

  const handleDelete = () => {
    setDeleteConfirmOpen(true);
    setDeleteMessage('');
  };

  const handleConfirmDelete = async () => {
    await deleteCheckbook({variables: {ownerOldName: data.id}});
  };

  const handleSaveEdit = async () => {
    // Ensure editedName is a string before calling trim()
    if (editedName && editedName.trim()) {
      await editCheckbook({
        variables: {ownerOldName: data.id, ownerNewName: editedName},
      });
    } else {
      // Optionally handle the case where editedName is not valid (empty or only whitespace)
      console.error('Edited name is empty or only whitespace');
    }
  };

  const handleChangeEditedName = (event) => {
    setEditedName(event.target.value);
  };

  return (
    <Box display='flex' justifyContent='flex-end' gap={1}>
      {/* Edit Button */}
      <Button
        variant='contained'
        color='primary'
        onClick={handleEdit}
        size='large'
        disabled={editing}
      >
        {isMobile ? (
          <EditIcon />
        ) : (
          <>
            <EditIcon />
            {messages['common.edit']}
          </>
        )}
      </Button>
      {/* Delete Button */}
      <Button
        variant='contained'
        color='secondary'
        onClick={handleDelete}
        size='large'
        disabled={deleting}
      >
        {isMobile ? (
          <DeleteIcon />
        ) : (
          <>
            <DeleteIcon />
            {messages['common.delete']}
          </>
        )}
      </Button>

      {/* Delete Confirmation Modal */}
      <Modal
        open={isDeleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
      >
        <Box sx={style}>
          <Typography variant='h6'>{messages['areYouSure']}</Typography>
          <Button
            onClick={handleConfirmDelete}
            color='error'
            disabled={deleting}
          >
            {deleting ? (
              <CircularProgress size={24} />
            ) : (
              messages['common.delete']
            )}
          </Button>
          <Button onClick={() => setDeleteConfirmOpen(false)}>
            {messages['common.cancel']}
          </Button>
          {deleteMessage && <Alert severity='info'>{deleteMessage}</Alert>}
        </Box>
      </Modal>

      {/* Edit Modal */}
      {/* Edit Modal */}
      <Modal
        open={isEditModalOpen}
        onClose={() => {
          setEditedName(''); // Reset the edited name
          setEditModalOpen(false); // Close the modal
        }}
      >
        <Box sx={style}>
          <Typography variant='h6'>{messages['editName']}</Typography>
          <TextField
            margin='dense'
            label={messages['common.name']}
            type='text'
            fullWidth
            variant='outlined'
            value={editedName}
            onChange={handleChangeEditedName}
            disabled={editing}
          />
          <Button
            onClick={handleSaveEdit}
            color='primary'
            disabled={editing || !editedName || !editedName.trim()}
          >
            {editing ? <CircularProgress size={24} /> : messages['common.save']}
          </Button>
          <Button
            onClick={() => {
              setEditedName('');
              setEditModalOpen(false);
            }}
          >
            {messages['common.cancel']}
          </Button>

          {editMessage && <Alert severity='info'>{editMessage}</Alert>}
        </Box>
      </Modal>
    </Box>
  );
};

MainCateActions.propTypes = {
  data: PropTypes.object.isRequired,
  refetch: PropTypes.func.isRequired, // Ensure refetch is passed as a prop
  handleAddSuccess: PropTypes.func.isRequired,
};

export default MainCateActions;
