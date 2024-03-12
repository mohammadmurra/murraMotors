import React, {useEffect, useState} from 'react';
import EmployeesTable from './EmployeesTable';
import AppsContainer from '../../../@crema/core/AppsContainer';
import {useIntl} from 'react-intl';
import {useDispatch, useSelector} from 'react-redux';
import {getEmployee} from '../../../redux/actions';
import {Button, Hidden} from '@mui/material';
import AppsHeader from '../../../@crema/core/AppsContainer/AppsHeader';
import AppsContent from '../../../@crema/core/AppsContainer/AppsContent';
import AppsPagination from '../../../@crema/core/AppsPagination';
import Box from '@mui/material/Box';
import AppInfoView from '../../../@crema/core/AppInfoView';
import AppSearchBar from '../../../@crema/core/AppSearchBar';
import {useNavigate} from 'react-router-dom';

const Employees = () => {
  const {messages} = useIntl();
  const dispatch = useDispatch();
  const employees = useSelector(({ecommerce}) => ecommerce.employees);
  const employeesCount = useSelector(({ecommerce}) => ecommerce.employeesCount);
  const lastVisible = useSelector(({ecommerce}) => ecommerce.lastVisible);
  const [index, setIndex] = useState('');
  const navigation = useNavigate();

  const [page, setPage] = useState(0);
  const [search, setSearchQuery] = useState('');
  const [isNext, setIsNext] = useState('');
  const addEmployees = () => {
    navigation('/management/employees/AddEmployee');
  };
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
    dispatch(getEmployee(search, page, index, isNext));
  }, [dispatch, search, page, index]);

  const onSearchCustomer = (e) => {
    setSearchQuery(e);
    setPage(0);
  };

  return (
    <>
      <AppsContainer title={messages['sidebar.ecommerce.employee']} fullView>
        <AppsHeader>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              width: 1,
            }}
          >
            <AppSearchBar
              iconPosition='right'
              overlap={false}
              onChange={(event) => onSearchCustomer(event.target.value)}
              placeholder={messages['common.searchHere']}
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                ml: 'auto',
              }}
            >
              <Button
                variant='contained'
                color='primary'
                onClick={addEmployees}
              >
               {messages['AddEmployees']}
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
          <EmployeesTable employee={employees} />
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
    </>
  );
};

export default Employees;
