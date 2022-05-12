import { Checkbox, FormControlLabel, useFormControl } from "@mui/material";
import { Controller } from "react-hook-form";

function FormCheckBox({ name, ...other }) {
  const { control } = useFormControl;
  return (
    <FormControlLabel
      {...other}
      control={
        <Controller
          name={name}
          control={control}
          render={({ field }) => <Checkbox {...field} checked={field.value} />}
        />
      }
    />
  );
}

export default FormCheckBox;
