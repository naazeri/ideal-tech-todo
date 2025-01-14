import { Typography } from '@mui/material';
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
    <>
      <Typography
        fontSize={14}
        fontWeight={600}
        sx={{ color: disabled ? 'text.disabled' : 'primary.main' }}
      >
        {label}{' '}
        <Typography
          sx={{
            display: 'inline-block',
            backgroundColor: `${disabled ? '#D9D9D9' : 'primary.main'}`,
            borderRadius: '20px',
            fontSize: '10px',
            fontWeight: 500,
            color: 'white',
            padding: '2px 4px',
            width: 'fit-content',
            height: 'fit-content',
          }}
        >
          {badgeNumber}
        </Typography>
      </Typography>
    </>
  );
}

export default CustomChip;
