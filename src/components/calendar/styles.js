import { makeStyles } from '@mui/styles'
export const styles = {
    inline: {
        display: 'flex',
        flexDirection: 'row',
    },
    columnLine: { display: 'flex', flexDirecction: 'column' },
    card: {
        width: 128,
        height: 128,
    },
    noCard: {
        width: 128,
        height: 128,
        backgroundColor: 'text.primary',
        opacity: '75%',
    },
    dayNumberBox: {
        height: '25%',
        width: '25%',
        backgroundColor: 'warning.main',
        display: 'flex',
        justifyContent: 'center',
        borderBottomRightRadius: '4px',
    },
    dayNumber: {
        fontSize: '20px',
        color: 'primary.contrastText',
    },
    letterDayBox: {
        height: '25%',
        width: '25%',
        display: 'flex',
        justifyContent: 'center',
        paddingRight: '16px',
    },
    letterDay: {
        fontSize: '20px',
        color: 'primary.main',
        fontFamily: 'Roboto',
        fontWeight: '400',
    },
    reminderBox: {
        display: 'flex',
        flexDirection: 'column',
        height: '80%',
    },
    twoEventsBox: { height: '80%', paddingTop: '4px', paddingLeft: '8px' },
    expandDots: {
        position: 'absolute',
        marginTop: '65px',
        marginLeft: '90px',
    },
    noEventBox: {
        paddingTop: '8px',
        paddingLeft: '8px',
    },
    box: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius: '4px',
        p: 2,
    },
    modalText: {
        paddingTop: '16px',
        paddingLeft: '16px',
        paddingRight: '16px',
    },

    weatherIcon: {
        width: '32px',
        marginLeft: '16px',
        marginTop: '12px',
        color: 'black',
    },
    showOneEventBox: {
        height: '80%',
        paddingTop: '8px',
        paddingLeft: '8px',
    },

    paddingBottom: {
        paddingBottom: '4px',
    },
    editTypo: {
        fontSize: '14px',
    },
    saveIcon: {
        width: '18px',
        heigth: '18px',
    },
    eventModalBox: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: '16px',
    },
    MenuProps: {
        PaperProps: {
            style: {
                maxHeight: 256,
                width: 80,
            },
        },
    },
    MenuPropsMonth: {
        PaperProps: {
            style: {
                maxHeight: 256,
                width: 120,
            },
        },
    },
    dialogBox: { padding: '16px', justifyContent: 'center', display: 'flex' },
    InfoOutlinedIcone: {
        alignSelf: 'center',
        fontSize: 48,
        color: '#FF7A00',
        marginRight: '8px',
    },
}

//Just to show another way
export const useStyles = makeStyles({
    actions: {
        marginTop: '32px',
        justifyContent: 'space-around',
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        alignSelf: 'center',
    },
    box: { '& > * + *': { marginLeft: 8 } },
    title: { alignSelf: 'center' },
})
