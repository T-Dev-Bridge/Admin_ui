import { Autocomplete } from "@mui/material";
import { Control, Controller } from "react-hook-form";
import { CustomCheckbox, CustomTextField } from "..";

interface CheckboxesAutocompleteProps {
  data: any[];
  placeholder: string;
  ariaLabel: string;
  name: string;
  control: Control<any>;
  defaultValue?: any[];
}

function CheckboxesAutocomplete(externalProps: CheckboxesAutocompleteProps) {
  const { data, placeholder, ariaLabel, name, control, defaultValue } =
    externalProps;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Autocomplete
          value={field.value}
          onChange={(e, value) => {
            console.log(e);
            console.log(value);
            field.onChange(value);
          }}
          multiple
          options={data}
          disableCloseOnSelect
          getOptionLabel={(option) => option.name}
          defaultValue={defaultValue || field.value}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderOption={(props, option, { selected }) => (
            <li
              {...props}
              key={`${option.id}-auto-comp-check`}
            >
              <CustomCheckbox
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option.name}
            </li>
          )}
          fullWidth
          renderInput={(params) => (
            <CustomTextField
              {...params}
              placeholder={`${placeholder}을 선택해주세요`}
              aria-label={ariaLabel}
            />
          )}
        />
      )}
    />
  );
}

export default CheckboxesAutocomplete;
