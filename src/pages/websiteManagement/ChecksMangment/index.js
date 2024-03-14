import {AppInfoView, AppSearchBar, AppsPagination} from '@crema';
import AppsContent from '@crema/core/AppsContainer/AppsContent';
import AppsHeader from '@crema/core/AppsContainer/AppsHeader';
import {Box, Button, Hidden, Modal} from '@mui/material';
import {useEffect, useState} from 'react';
import {useIntl} from 'react-intl';
import {useDispatch, useSelector} from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import {getCheckbooks} from 'redux/actions';

import AppsContainer from '../../../@crema/core/AppsContainer';
import UsersTable from './usersTable';
import AddCheckbookForm from './AddCheckbookForm';

const ChecksMangment = () => {
  const {messages} = useIntl();
  const dispatch = useDispatch();
  const employees = useSelector(({ecommerce}) => ecommerce.checkbooks);
  const employeesCount = useSelector(
    ({ecommerce}) => ecommerce.checkbooksCount,
  );
  const lastVisible = useSelector(({ecommerce}) => ecommerce.lastVisible);
  const [openCheckbookModal, setOpenCheckbookModal] = useState(false);
  const [index, setIndex] = useState('');
  const [refreshKey, setRefreshKey] = useState(0); // New state to trigger refresh

  const [page, setPage] = useState(0);
  const [search, setSearchQuery] = useState('');
  const [isNext, setIsNext] = useState('');

  const onPageChange = (event, value) => {
    if (value > page) {
      setIsNext(true);
    } else {
      setIsNext(false);
    }
    setIndex(lastVisible);
    setPage(value);
  };

  useEffect(() => {
    console.log('Fetching data with refreshKey:', refreshKey);

    dispatch(getCheckbooks(search, page, index, isNext));
  }, [dispatch, search, page, index,refreshKey]);

  const onSearchCoupon = (e) => {
    setSearchQuery(e);
    setPage(0);
  };

  const handleCloseCheckbookModal = () => {
    setOpenCheckbookModal(false);
    setRefreshKey((prevKey) => prevKey + 1); // Increment refreshKey to trigger re-fetch
  };
  const handleAddSuccess = () => {
    // Trigger a re-fetch or update the state to cause a re-render
    // For example, you can increment a refresh key or directly call the fetch method
    setRefreshKey((prevKey) => prevKey + 1); // Increment refreshKey to trigger re-fetch

  };

  console.log('data should be here checkkbooks');
  console.log(employees);

  return (
    <>
      <AppsContainer title={messages['common.financialMangment']} fullView>
        <AppsHeader>
          <Box
            display='flex'
            flexDirection='row'
            alignItems='center'
            width={1}
            justifyContent='space-between'
          >
            <AppSearchBar
              iconPosition='right'
              overlap={false}
              onChange={(event) => onSearchCoupon(event.target.value)}
              placeholder={messages['common.searchHere']}
            />
            <Box display='flex' flexDirection='row' alignItems='center'>
              <Button
                variant='contained'
                color='primary'
                onClick={() => setOpenCheckbookModal(true)}
              >
                {messages['addCheckbook']}
              </Button>

              <Hidden smDown>
                <AppsPagination
                  rowsPerPage={40}
                  count={employeesCount}
                  page={page}
                  onPageChange={onPageChange}
                />
              </Hidden>
            </Box>
          </Box>
        </AppsHeader>

        <AppsContent sx={{paddingTop: 2.5, paddingBottom: 2.5}}>
          {<UsersTable employees={employees} handleAddSuccess={handleAddSuccess} />}
        </AppsContent>

        <Hidden smUp>
          <AppsPagination
            rowsPerPage={40}
            count={employeesCount}
            page={page}
            onPageChange={onPageChange}
          />
        </Hidden>
      </AppsContainer>
      <AppInfoView />
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={openCheckbookModal}
        onClose={handleCloseCheckbookModal}
        closeAfterTransition
      >
        {/* Update AddNotiForm to a form that accepts checkbook details */}
        <AddCheckbookForm
          setOpenModal={setOpenCheckbookModal}
          onAddSuccess={handleAddSuccess}
        />
      </Modal>
    </>
  );
};

export default ChecksMangment;
