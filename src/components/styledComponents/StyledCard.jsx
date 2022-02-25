import { Card, styled } from '@mui/material'

export const StyledCard = styled(Card)(({ theme }) => ({
    maxWidth: 350,
    transition: theme.transitions.create(['transform'], {
        duration: theme.transitions.duration.standard,
        easing: theme.transitions.easing.easeInOut,
    }),
    '&:hover': {
        transform: 'scale(1.02)',
    },
}))
