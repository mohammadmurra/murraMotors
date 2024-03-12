import {AppInfoView, AppSearchBar, AppsPagination} from '@crema';
import AppsContent from '@crema/core/AppsContainer/AppsContent';
import AppsHeader from '@crema/core/AppsContainer/AppsHeader';
import {Box, Button, Hidden, Modal} from '@mui/material';
import AddNotiFrom from 'components/AddNotiFrom/AddNotiFrom';
import {useEffect, useState} from 'react';
import {useIntl} from 'react-intl';
import {useDispatch, useSelector} from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import {getFinancialNotifications} from 'redux/actions';

import AppsContainer from '../../../@crema/core/AppsContainer';
import UsersTable from './usersTable';
import {useMutation} from '@apollo/client';
import {SEND_FINANCIAL_REMINDER} from 'query/orderReoprt/getOrder';

const financialMangmentNotif = () => {
  const {messages} = useIntl();
  const dispatch = useDispatch();
  const employees = useSelector(({ecommerce}) => ecommerce.notifUsers);
  const employeesCount = useSelector(
    ({ecommerce}) => ecommerce.notifUsersCount,
  );
  const lastVisible = useSelector(({ecommerce}) => ecommerce.lastVisible);
  const [index, setIndex] = useState('');
  // const navigation = useNavigate();
  const [openVariantModal, setOpenVariantModal] = useState(false);
  const [sendFinancialReminder] = useMutation(SEND_FINANCIAL_REMINDER);
  const handleSendReminder = async () => {
    console.log('Sending reminder...');
    try {
      const response = await sendFinancialReminder();
      console.log('Financial reminder sent successfully:', response.data);
    } catch (error) {
      console.error('Error sending financial reminder:', error);
    }
  };
  
  const [page, setPage] = useState(0);
  const [search, setSearchQuery] = useState('');
  const [isNext, setIsNext] = useState('');
  // const employees = () => {
  //   navigation('/ecommerce/employees/AddEmployee');
  // };
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
    dispatch(getFinancialNotifications(search, page, index, isNext));
  }, [dispatch, search, page, index]);

  const onSearchCoupn = (e) => {
    setSearchQuery(e);
    setPage(0);
  };

  const handleCloseVariantModal = () => {
    setOpenVariantModal(false);
  };
  console.log('data should be here');
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
              onChange={(event) => onSearchCoupn(event.target.value)}
              placeholder={messages['common.searchHere']}
            />
            <Box display='flex' flexDirection='row' alignItems='center'>
              <Button
                variant='contained'
                color='primary'
                onClick={() => setOpenVariantModal(true)}
              >
                {messages['addUser']}
              </Button>
              <Button
                variant='contained'
                color='primary'
                onClick={handleSendReminder} // Corrected onClick handler
              >
                {messages['sendReminder']}
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

        <AppsContent
          sx={{
            paddingTop: 2.5,
            paddingBottom: 2.5,
          }}
        >
          {<UsersTable employees={employees} />}
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
        open={openVariantModal}
        onClose={handleCloseVariantModal}
        closeAfterTransition
      >
        <AddNotiFrom setOpenVariantModal={setOpenVariantModal} />
      </Modal>
    </>
  );
};

export default financialMangmentNotif;
