import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, Button, TextField, styled } from "@mui/material";

const RootStyle = styled(Box)(({ theme }) => ({
  display: "flex",
  height: "100%",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(2),
  padding: theme.spacing(2),
}));

const formSchema = yup
  .object({
    quantumTime: yup.number().positive().integer().required(),
    exchangeTime: yup.number().positive().integer().required(),
    processesNumber: yup.number().positive().integer().required(),
  })
  .required();

const InitialForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSubmit = (data) => console.log(data);

  return (
    <RootStyle component="form" noValidate autoComplete="off">
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Tiempo del quantum en segundos"
        error={!!errors.quantumTime}
        helperText={errors.quantumTime?.message}
        {...register("quantumTime")}
      />
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Tiempo de intercambio en segundos"
        error={!!errors.exchangeTime}
        helperText={errors.exchangeTime?.message}
        {...register("exchangeTime")}
      />
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Cantidad de procesos"
        error={!!errors.processesNumber}
        helperText={errors.processesNumber?.message}
        {...register("processesNumber")}
      />
      <Button variant="contained" onClick={handleSubmit(onSubmit)}>
        Continuar
      </Button>
    </RootStyle>
  );
};

export default InitialForm;
