import {Dialog, DialogContent, DialogTitle} from '@mui/material';
import PropTypes from 'prop-types';
import CColorPicker from 'components/CColorPicker';

const ColorPickerDialog = ({
  colors,
  setColor,
  openDialog,
  setOpenDialog,
  messages,
}) => {
  return (
    <>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{messages['ecommerce.addproduct.AddColor']} </DialogTitle>
        <DialogContent>
          <CColorPicker selectedColors={colors} setSelectedColor={setColor} />
        </DialogContent>
      </Dialog>
    </>
  );
};

ColorPickerDialog.propTypes = {
  messages: PropTypes.any,
  setColor: PropTypes.func,
  colors: PropTypes.array,
  setOpenDialog: PropTypes.func,
  openDialog: PropTypes.bool,
};

export default ColorPickerDialog;
