import { Box, styled, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import ProcessInputs from "./ProcessInputs";

const RootStyle = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(2),
  padding: theme.spacing(2),
}));

const formSchema = yup
  .object({
    processes: yup.lazy((value) => {
      const validationObject = {
        startTime: yup.number().min(0).integer().required(),
        processTime: yup.number().positive().integer().required(),
        ioInfo: yup.array().of(
          yup.object({
            ioTime: yup.number().positive().integer().required(),
            cpuTime: yup.number().positive().integer().required(),
          })
        ),
      };

      const newEntries = Object.keys(value).reduce(
        (acc, val) => ({
          ...acc,
          [val]: yup.object(validationObject),
        }),
        {}
      );

      return yup.object().shape(newEntries);
    }),
  })
  .required();

const ProcessesForm = ({ processes, onSubmit }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  return (
    <RootStyle component="form" noValidate autoComplete="off">
      {processes.map((process) => (
        <ProcessInputs
          key={process}
          control={control}
          process={process}
          errors={errors}
          register={register}
        />
      ))}
      <Button variant="contained" onClick={handleSubmit(onSubmit)}>
        Iniciar
      </Button>
    </RootStyle>
  );
};

export default ProcessesForm;
