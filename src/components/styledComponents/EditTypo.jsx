import { styled, Typography } from '@mui/material';

export const EditTypo = styled(Typography)`
  &:hover {
    color: #d10000;
    cursor: pointer;
  }
  &:focus {
    background-color: green;
  }
`;
