import React, {useEffect, useState} from 'react';
import AppsContainer from '../../../@crema/core/AppsContainer';
import {useIntl} from 'react-intl';
import {useDispatch, useSelector} from 'react-redux';
import {Hidden} from '@mui/material';
import AppsHeader from '../../../@crema/core/AppsContainer/AppsHeader';
import AppsContent from '../../../@crema/core/AppsContainer/AppsContent';
import AppsPagination from '../../../@crema/core/AppsPagination';
import Box from '@mui/material/Box';
import AppInfoView from '../../../@crema/core/AppInfoView';
import AppSearchBar from '../../../@crema/core/AppSearchBar';
import {getDeletedRuningCost} from '../../../redux/actions';
import DletedRuningCostTable from './DletedRuningCostTable';
// import OrderTable from '../Orders/OrderTable';

const DletedRuningCost = () => {
  const {messages} = useIntl();
  const dispatch = useDispatch();

  const lastVisible = useSelector(({ecommerce}) => ecommerce.lastVisible);

  const runingcostCount = useSelector(
    ({ecommerce}) => ecommerce.delruningcostCount,
  );
  const runingcost = useSelector(({ecommerce}) => ecommerce.delruningcost);
  const [page, setPage] = useState(0);
  const [search, setSearchQuery] = useState('');
  const [index, setIndex] = useState('');
  const [isNext, setIsNext] = useState();

  const onPageChange = (event, value) => {
    if (value > page) {
      setIsNext(true);
    } else {
      setIsNext(false);
    }

    setIndex(lastVisible);

    setPage(value);
  };

  const onSearchOrder = (e) => {
    setSearchQuery(e);
    setPage(0);
  };

  useEffect(() => {
    dispatch(getDeletedRuningCost(search, page, index, isNext));
  }, [dispatch, search, page, index, isNext]);
  useEffect(() => {}, [runingcost]);

  return (
    <>
      <AppsContainer
        title={messages['sidebar.ecommerce.DeletedrunningCost']}
        fullView
      >
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
              onChange={(event) => onSearchOrder(event.target.value)}
              placeholder={messages['common.searchHere']}
            />
            <Box display='flex' flexDirection='row' alignItems='center'>
              <Hidden smDown>
                <AppsPagination
                             rowsPerPage={40}

                  count={runingcostCount}
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
          {/* RunningCost tabel */}
          <DletedRuningCostTable runingCostData={runingcost} />
        </AppsContent>

        <Hidden smUp>
          <AppsPagination
                       rowsPerPage={40}

            count={runingcostCount}
            page={page}
            onPageChange={onPageChange}
          />
        </Hidden>
      </AppsContainer>
      <AppInfoView />
    </>
  );
};

export default DletedRuningCost;
