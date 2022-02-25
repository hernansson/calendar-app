import { Box, Typography } from '@mui/material'
import { memo } from 'react'
import { StyledCard } from '../styledComponents/StyledCard'

function EmptyDay({ number }) {
    return (
        <>
            {!number ? (
                <Box>
                    <StyledCard
                        elevation={3}
                        sx={{
                            width: 128,
                            height: 128,
                            backgroundColor: 'text.primary',
                            opacity: '75%',
                        }}
                    />
                </Box>
            ) : (
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
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
                                sx={{
                                    fontSize: '20px',
                                    color: 'primary.contrastText',
                                }}
                            >
                                {number}
                            </Typography>
                        </Box>
                    </StyledCard>
                </Box>
            )}
        </>
    )
}

export default memo(EmptyDay)
