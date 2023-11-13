import { useFieldArray } from "react-hook-form";
import { TextField, Box, Button, Typography, styled } from "@mui/material";

const RootStyle = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  padding: theme.spacing(0, 2),
}));

const MainStyle = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing(2),
}));

const ProcessInputs = ({ control, process, errors, register }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `processes.${process}.ioInfo`,
  });

  return (
    <RootStyle>
      <Typography variant="h6">Proceso {process}</Typography>
      <MainStyle>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Tiempo de llegada en segundos"
          error={!!errors.processes?.[process]?.startTime}
          helperText={errors.processes?.[process]?.startTime?.message}
          size="small"
          {...register(`processes.${process}.startTime`)}
        />
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Tiempo de procesador en Quantum"
          error={!!errors.processes?.[process]?.processTime}
          helperText={errors.processes?.[process]?.processTime?.message}
          size="small"
          {...register(`processes.${process}.processTime`)}
        />
        <Button
          onClick={() => {
            append({ ioTime: "", cpuTime: "" });
          }}
          variant="outlined"
        >
          Agregar E/S
        </Button>
      </MainStyle>
      {fields.map((field, index) => (
        <Box key={field.id}>
          <Typography variant="subtitle1">
            E/S #{index + 1} Proceso {process}
          </Typography>
          <MainStyle key={field.id}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Tiempo de E/S en Quantum"
              error={!!errors.processes?.[process]?.ioInfo?.[index]?.ioTime}
              helperText={
                errors.processes?.[process]?.ioInfo?.[index]?.ioTime?.message
              }
              size="small"
              {...register(`processes.${process}.ioInfo.${index}.ioTime`)}
            />
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Tiempo de CPU en Quantum"
              error={!!errors.processes?.[process]?.ioInfo?.[index]?.cpuTime}
              helperText={
                errors.processes?.[process]?.ioInfo?.[index]?.cpuTime?.message
              }
              size="small"
              {...register(`processes.${process}.ioInfo.${index}.cpuTime`)}
            />
            <Button variant="outlined" onClick={() => remove(index)}>
              Eliminar
            </Button>
          </MainStyle>
        </Box>
      ))}
    </RootStyle>
  );
};

export default ProcessInputs;
