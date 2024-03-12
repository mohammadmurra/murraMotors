import {Modal, Fade, Grid, CardContent, Card, Button} from '@mui/material';
import PropTypes from 'prop-types';
import {CardTitle} from 'react-trello/dist/styles/Base';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  p: 4,
};

const ImageRequierdModal = ({open, setOpen}) => {
  const handleClose = () => setOpen(false);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Fade in={open}>
        <Card sx={style}>
          <CardTitle>error</CardTitle>
          <CardContent>
            <Grid container spacing={4} mt={4}>
              <Grid item xs={12} textAlign={'start'}>
                you have to put images for this product
              </Grid>
              <Grid item xs={12} textAlign={'end'}>
                <Button variant='contained' onClick={() => setOpen(false)}>
                  okay
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Fade>
    </Modal>
  );
};
ImageRequierdModal.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};
export default ImageRequierdModal;
