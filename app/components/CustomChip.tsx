import { Box, Chip, Typography } from '@mui/material';
import React from 'react';

type CustomChipOptions = {
  label: string;
  badgeNumber: number | string;
  disabled?: boolean;
};

function CustomChip({
  label,
  badgeNumber,
  disabled = false,
}: CustomChipOptions) {
  return (
    <Box display="flex" alignItems="center" gap={1}>
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
}

export default CustomChip;
