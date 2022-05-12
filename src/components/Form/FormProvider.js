import { FormProvider as RHFromProvider } from "react-hook-form";

function FormProvider({ onSubmit, children, methods }) {
  return (
    <RHFromProvider {...methods}>
      <form onSubmit={onSubmit}>{children}</form>
    </RHFromProvider>
  );
}

export default FormProvider;
