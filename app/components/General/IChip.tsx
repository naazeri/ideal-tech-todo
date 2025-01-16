import { Box, Chip, Typography } from '@mui/material';
import React from 'react';

type CustomChipProps = {
  label: string;
  badgeNumber: number | string;
  disabled?: boolean;
  onClick?: () => void;
};

const IChip = ({
  label,
  badgeNumber,
  disabled = false,
  onClick,
}: CustomChipProps) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      gap={1}
      onClick={onClick}
      sx={{
        cursor: 'pointer',
        '&:hover': {
          filter: 'brightness(0.85)',
        },
      }}
    >
      <Typography
        fontSize={14}
        fontWeight={600}
        sx={{ color: disabled ? 'text.disabled' : 'primary.main' }}
      >
        {label}
      </Typography>
      <Chip
        label={badgeNumber}
        sx={{
          backgroundColor: `${disabled ? '#D9D9D9' : 'primary.main'}`,
          borderRadius: '20px',
          fontSize: '10px',
          fontWeight: 500,
          color: 'white',
          padding: 0,
          width: 'fit-content',
          height: 'fit-content',
          '& .MuiChip-label': {
            padding: '0px 4px',
          },
        }}
      />
    </Box>
  );
};

export default IChip;
