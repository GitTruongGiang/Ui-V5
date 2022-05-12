import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

function FormTextField({ name, control, ...other }) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <TextField
            fullWidth
            {...other}
            error={!!error}
            helperText={error?.message}
            {...field}
          />
        );
      }}
    />
  );
}

export default FormTextField;
