// import {useState} from 'react';
// import AddIcon from '@mui/icons-material/Add';

import {Button, Divider, Grid, IconButton} from '@mui/material';
import {useState} from 'react';
import {ChromePicker, CirclePicker} from 'react-color';
import PropTypes from 'prop-types';
import CircleIcon from '@mui/icons-material/Circle';
import {useIntl} from 'react-intl';

const CColorPicker = (props) => {
  const [selecter, setSelecter] = useState();
  const {messages} = useIntl();
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={6}>
          <ChromePicker
            color={selecter}
            onChangeComplete={(e) => setSelecter(e.hex)}
          />
        </Grid>
        <Grid container item xs={12} lg={6}>
          <Grid item xs={12}>
            <CirclePicker
              color={selecter}
              onChangeComplete={(e) => setSelecter(e.hex)}
            />
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Button
              color='primary'
              variant='contained'
              size='small'
              onClick={() => {
                props.setSelectedColor((prev) =>
                  prev.indexOf(selecter) > -1 ? prev : [...prev, selecter],
                );
              }}
            >
              {messages['ecommerce.addproduct.AddColor']}
            </Button>
            {props.selectedColors.length > 0 &&
              props.selectedColors.map((item) => (
                <IconButton
                  key={item}
                  onClick={() =>
                    props.setSelectedColor((prev) =>
                      prev.filter((prItem) => prItem != item),
                    )
                  }
                >
                  <CircleIcon sx={{color: item}} />
                </IconButton>
              ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

CColorPicker.propTypes = {
  selectedColors: PropTypes.array,
  setSelectedColor: PropTypes.func,
};
export default CColorPicker;
