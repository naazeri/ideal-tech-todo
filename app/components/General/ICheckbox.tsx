import { RadioButtonUnchecked, CheckCircle } from '@mui/icons-material';
import { Checkbox } from '@mui/material';

interface ICheckboxProps {
  checked?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  stopPropagation?: boolean;
}

const ICheckbox = ({
  checked = false,
  onChange,
  stopPropagation = false,
}: ICheckboxProps) => {
  return (
    <Checkbox
      icon={<RadioButtonUnchecked color="disabled" />}
      checkedIcon={<CheckCircle color="primary" />}
      checked={checked}
      onClick={(e) => {
        if (stopPropagation) e.stopPropagation();
      }}
      onChange={onChange}
    />
  );
};

export default ICheckbox;
