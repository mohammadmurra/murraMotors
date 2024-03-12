import {
  Modal,
  Fade,
  Grid,
  CardContent,
  Card,
  Button,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import {useIntl} from 'react-intl';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  p: 4,
};

const ConfermationAddProduct = ({open, setOpen, setLodingForm}) => {
  const handleClose = () => setOpen(false);
  const {messages} = useIntl();

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Fade in={open}>
        <Card sx={style}>
          <CardContent>
            <Grid container spacing={4}>
              <Grid item xs={12} textAlign={'start'}>
                <Typography> {messages['addedSuccessfully']}</Typography>
              </Grid>
              <Grid item xs={12} textAlign={'end'}>
                <Button
                  variant='contained'
                  onClick={() => {
                    window.location.reload();
                  }}
                >
                  {messages['agree']}
                </Button>
                <Button
                  variant='contained'
                  onClick={() => {
                    handleClose();
                    setLodingForm(false);
                  }}
                  style={{ marginLeft: '10px' }}
                >
                  {messages['addProductSame']}
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Fade>
    </Modal>
  );
};
ConfermationAddProduct.propTypes = {
  setOpen: PropTypes.func,
  setLodingForm: PropTypes.func,
  open: PropTypes.bool,
};
export default ConfermationAddProduct;
