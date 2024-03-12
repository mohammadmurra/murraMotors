import React, { useEffect, useState } from 'react';
import DebtorTable from './DebtorTable'; // Ensure this component is created
import AppsContainer from '../../../@crema/core/AppsContainer';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { getDebtors } from '../../../redux/actions'; // Update with your debtor actions
import { Button, Hidden } from '@mui/material';
import AppsHeader from '../../../@crema/core/AppsContainer/AppsHeader';
import AppsContent from '../../../@crema/core/AppsContainer/AppsContent';
import AppsPagination from '../../../@crema/core/AppsPagination';
import Box from '@mui/material/Box';
import AppInfoView from '../../../@crema/core/AppInfoView';
import AppSearchBar from '../../../@crema/core/AppSearchBar';
import {useNavigate} from 'react-router-dom';

const Debtors = () => {
  const { messages } = useIntl();
  const dispatch = useDispatch();
  const debtors = useSelector(({ ecommerce }) => ecommerce.debtors); // Update with your finance state slice
  const debtorCount = useSelector(({ ecommerce }) => ecommerce.debtorCount);
  const lastVisibleDebtor = useSelector(({ ecommerce }) => ecommerce.lastVisible);
  const navigation = useNavigate();

  const [page, setPage] = useState(0);
  const [search, setSearchQuery] = useState('');
  const [isNext, setIsNext] = useState(false);

  useEffect(() => {
    dispatch(getDebtors(search, page, isNext ? lastVisibleDebtor : null));
  }, [dispatch, search, page, isNext, lastVisibleDebtor]);

  const onSearchDebtor = (value) => {
    setSearchQuery(value);
    setPage(0);
  };

  const onPageChange = (event, value) => {
    setIsNext(value > page);
    setPage(value);
  };

  const hanedlAddOrder = () => {
    navigation('/management/debtors/AddDebtor');
  };
  console.log("debtors");
  console.log(debtors);
  return (
    <>
    <AppsContainer title={messages['sidebar.finance.debtors']} fullView>
      <AppsHeader>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: 1 }}>
          <AppSearchBar
            iconPosition='right'
            overlap={false}
            onChange={(event) => onSearchDebtor(event.target.value)}
            placeholder={messages['common.searchHere']}
          />
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', ml: 'auto' }}>
          <Button variant='contained' color='primary' onClick={hanedlAddOrder}>
              {messages['sidebar.finance.addDebtor']}
              </Button>
            <Hidden smDown>
              <AppsPagination
                rowsPerPage={40}
                count={debtorCount}
                page={page}
                onPageChange={onPageChange}
              />
            </Hidden>
          </Box>
        </Box>
      </AppsHeader>
      <AppsContent sx={{ paddingTop: 2.5, paddingBottom: 2.5 }}>
        <DebtorTable debtors={debtors} />
      </AppsContent>
      
      <Hidden smUp>
        <AppsPagination
          rowsPerPage={40}
          count={debtorCount}
          page={page}
          onPageChange={onPageChange}
        />
      </Hidden>
    </AppsContainer>
    <AppInfoView />
  </>
  );
};

export default Debtors;
