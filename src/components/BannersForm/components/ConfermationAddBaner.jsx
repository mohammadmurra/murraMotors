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
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  p: 4,
};

const ConfermationAddBaner = ({open, setOpen,data}) => {
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
          <CardContent>
            <Grid container spacing={4}>
              <Grid item xs={12} textAlign={'start'}>
                <Typography>{data}</Typography>
              </Grid>
              <Grid item xs={12} textAlign={'end'}>
                <Button
                  variant='contained'
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  Okay
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Fade>
    </Modal>
  );
};
ConfermationAddBaner.propTypes = {
  setOpen: PropTypes.func,
  open: PropTypes.bool,
  data:PropTypes.string,
};
export default ConfermationAddBaner;
