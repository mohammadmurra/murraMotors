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
import {useIntl} from 'react-intl';

const ConfermationApplySetting = ({open, setOpen}) => {
  const {messages} = useIntl();
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
                <Typography>{messages['sidebar.HomePageSetting.modal']}</Typography>
              </Grid>
              <Grid item xs={12} textAlign={'end'}>
                <Button
                  variant='contained'
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  {messages['sidebar.HomePageSetting.modal.button']}
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Fade>
    </Modal>
  );
};
ConfermationApplySetting.propTypes = {
  setOpen: PropTypes.func,
  open: PropTypes.bool,
};
export default ConfermationApplySetting;
