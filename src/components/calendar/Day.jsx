import { useState, useContext } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import AddEventModal from './modals/AddEventModal';
import { EditTypo } from '../styledComponents/EditTypo';
import { StyledCard } from '../styledComponents/StyledCard';
import EditEventModal from './modals/EditEventModal';
import { CalendarContext } from '../../context/calendarContext';
import ExpandEventsModal from './modals/ExpandEventsModal';
import { days } from '../../constants/days';
import '@fontsource/roboto/500.css';
export default function Day({ number, reminders }) {
  const { reminderIds, loadingContext } = useContext(CalendarContext);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(reminderIds);
  const [openList, setOpenList] = useState(false);

  const handleOpenList = () => {
    setOpenList((prev) => !prev);
  };
  const handleModalAdd = () => {
    setOpenAdd((prev) => !prev);
  };
  const handleModalEdit = (e) => {
    setOpenEdit({ ...openEdit, [e]: !openEdit[e] });
  };
  return (
    <>
      {number ? (
        <>
          <Box>
            <StyledCard
              elevation={2}
              sx={{
                width: 128,
                height: 128,
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box
                  sx={{
                    height: '25%',
                    width: '25%',
                    backgroundColor: 'warning.main',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Typography
                    sx={{ fontSize: '20px', color: 'primary.contrastText' }}
                  >
                    {number}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    height: '25%',
                    width: '25%',
                    display: 'flex',
                    justifyContent: 'center',
                    paddingRight: '16px',
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '20px',
                      color: 'primary.main',
                      fontFamily: 'Roboto',
                      fontWeight: '400',
                    }}
                  >
                    {/*should go month, if my API supported it :D*/}
                    {number
                      ? days[
                          new Date(`February ${number},2022`).getDay()
                        ].slice(0, 3)
                      : null}
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{ display: 'flex', flexDirection: 'column', height: '80%' }}
              >
                {reminders?.length > 0 ? (
                  reminders.length == 1 ? (
                    <Box
                      sx={{
                        height: '80%',
                        paddingTop: '8px',
                        paddingLeft: '8px',
                      }}
                    >
                      <Box
                        onClick={() => handleModalEdit(reminders[0].id)}
                        sx={{ paddingBottom: '8px' }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirecction: 'column',
                          }}
                        >
                          <EditTypo
                            noWrap
                            sx={{ fontSize: '14px' }}
                          >{`${reminders[0].title}`}</EditTypo>
                        </Box>
                        <Box>
                          <EditTypo
                            sx={{ fontSize: '14px' }}
                          >{`${reminders[0].time}`}</EditTypo>
                        </Box>
                      </Box>
                      <AddEventModal day={number} />
                      <EditEventModal
                        data={reminders[0]}
                        open={openEdit[reminders[0].id]}
                        handleModalEdit={handleModalEdit}
                      />
                    </Box>
                  ) : (
                    <>
                      <Box
                        sx={{
                          height: '80%',

                          paddingLeft: '8px',
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                      >
                        <Box
                          onClick={() => handleModalEdit(reminders[0].id)}
                          sx={{ paddingBottom: '8px' }}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirecction: 'column',
                            }}
                          >
                            <EditTypo
                              noWrap
                              sx={{ fontSize: '14px' }}
                            >{`${reminders[0].title}`}</EditTypo>
                          </Box>
                          <Box>
                            <EditTypo
                              sx={{ fontSize: '14px' }}
                            >{`${reminders[0].time}`}</EditTypo>
                          </Box>
                        </Box>

                        <EditEventModal
                          data={reminders[0]}
                          open={openEdit[reminders[0].id]}
                          handleModalEdit={handleModalEdit}
                        />
                        <Box onClick={() => handleModalEdit(reminders[1].id)}>
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirecction: 'column',
                            }}
                          >
                            <EditTypo
                              sx={{ fontSize: '14px' }}
                              noWrap
                            >{`${reminders[1].title}`}</EditTypo>
                          </Box>
                          <Box>
                            <EditTypo
                              sx={{ fontSize: '14px' }}
                            >{`${reminders[1].time}`}</EditTypo>
                          </Box>
                        </Box>
                        <EditEventModal
                          data={reminders[1]}
                          open={openEdit[reminders[1].id]}
                          handleModalEdit={handleModalEdit}
                        />
                      </Box>
                      <Box
                        sx={{
                          position: 'absolute',
                          marginTop: '65px',
                          marginLeft: '90px',
                        }}
                      >
                        <ExpandEventsModal day={number} />
                      </Box>
                    </>
                  )
                ) : (
                  <>
                    <Box sx={{ paddingTop: '8px', paddingLeft: '8px' }}>
                      <Box sx={{ paddingBottom: '16px' }}>
                        <AddEventModal day={number} />
                      </Box>
                      <Box>
                        <AddEventModal day={number} />
                      </Box>
                    </Box>
                  </>
                )}
              </Box>
            </StyledCard>
          </Box>
        </>
      ) : (
        <Box>
          <StyledCard
            elevation={2}
            sx={{
              width: 128,
              height: 128,
              backgroundColor: 'text.primary',
              opacity: '75%',
            }}
          ></StyledCard>
        </Box>
      )}
    </>
  );
}
