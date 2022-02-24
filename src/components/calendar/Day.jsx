import { Box, Typography } from '@mui/material';
import AddEventModal from './modals/AddEventModal';
import { StyledCard } from '../styledComponents/StyledCard';
import ExpandEventsModal from './modals/ExpandEventsModal';
import { getDayString } from '../../utils/getDayString';
import ShowOneEvent from './ShowOneEvent';
import ShowTwoEvents from './ShowTwoEvents';
import '@fontsource/roboto/500.css';
export default function Day({ number, reminders }) {
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
                    {number && getDayString(number)}
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{ display: 'flex', flexDirection: 'column', height: '80%' }}
              >
                {reminders?.length > 0 ? (
                  reminders.length === 1 ? (
                    <ShowOneEvent reminder={reminders[0]} day={number} />
                  ) : (
                    <>
                      <Box
                        sx={{
                          height: '80%',
                          paddingTop: '8px',
                          paddingLeft: '8px',
                        }}
                      >
                        <ShowTwoEvents
                          reminderOne={reminders[0]}
                          reminderTwo={reminders[1]}
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
