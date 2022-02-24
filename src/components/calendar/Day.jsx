import { useState, useContext } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import AddEventModal from './modals/AddEventModal';
import { AddEventTypo } from '../styledComponents/AddEventTypo';
import { EditTypo } from '../styledComponents/EditTypo';
import { StyledCard } from '../styledComponents/StyledCard';
import EditEventModal from './modals/EditEventModal';
import { CalendarContext } from '../../context/calendarContext';
import ExpandEventsModal from './modals/ExpandEventsModal';
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
              elevation={3}
              sx={{
                width: 128,
                height: 128,
              }}
            >
              <Box
                sx={{
                  height: '25%',
                  width: '20%',
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
                sx={{ display: 'flex', flexDirection: 'column', height: '80%' }}
              >
                {reminders?.length > 0 ? (
                  reminders.length == 1 ? (
                    <Box sx={{ height: '80%' }}>
                      <Box
                        onClick={() => {
                          handleModalEdit(reminders[0].id);
                        }}
                        sx={{
                          display: 'flex',
                          flexDirecction: 'row',
                        }}
                      >
                        <EditTypo>
                          {`${reminders[0].time} - ${reminders[0].title}`}
                        </EditTypo>
                      </Box>
                      <AddEventTypo onClick={handleModalAdd}>
                        + add event
                      </AddEventTypo>
                      <EditEventModal
                        data={reminders[0]}
                        open={openEdit[reminders[0].id]}
                        handleModalEdit={handleModalEdit}
                      />
                    </Box>
                  ) : (
                    <>
                      <Box sx={{ height: '80%' }}>
                        <Box
                          name='1'
                          id='1'
                          onClick={() => handleModalEdit(reminders[0].id)}
                          sx={{
                            display: 'flex',
                            flexDirecction: 'row',
                          }}
                        >
                          <EditTypo>{`${reminders[0].time} - ${reminders[0].title}`}</EditTypo>
                        </Box>
                        <EditEventModal
                          data={reminders[0]}
                          open={openEdit[reminders[0].id]}
                          handleModalEdit={handleModalEdit}
                        />
                        <Box
                          name='1'
                          id='1'
                          onClick={() => handleModalEdit(reminders[1].id)}
                          sx={{ display: 'flex', flexDirecction: 'row' }}
                        >
                          <EditTypo>{`${reminders[1].time} - ${reminders[1].title}`}</EditTypo>
                        </Box>
                        <EditEventModal
                          data={reminders[1]}
                          open={openEdit[reminders[1].id]}
                          handleModalEdit={handleModalEdit}
                        />
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <ExpandEventsModal day={number} />
                      </Box>
                    </>
                  )
                ) : (
                  <>
                    <AddEventTypo onClick={handleModalAdd}>
                      + add event
                    </AddEventTypo>
                    <AddEventTypo onClick={handleModalAdd}>
                      + add event
                    </AddEventTypo>
                  </>
                )}
              </Box>
            </StyledCard>
          </Box>
          <AddEventModal open={openAdd} setOpen={setOpenAdd} day={number} />
        </>
      ) : (
        <Box>
          <StyledCard
            elevation={3}
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
