import useContactForm from "./index.hook.ts";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid2,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { SubmitHandler } from "react-hook-form";
import { CreateContactDTO } from "../../apis/crm/api.ts";
import ErrorText from "../ErrorText";

const slotProps = (onClick: () => void) => ({
  input: {
    endAdornment: (
      <InputAdornment position={"end"}>
        <IconButton onClick={onClick}>
          <Delete />
        </IconButton>
      </InputAdornment>
    ),
  },
});

export default function ContactForm({
  onSubmit,
  onCancel,
  isPending,
  error,
  defaultContact,
}: {
  onSubmit: SubmitHandler<CreateContactDTO>;
  onCancel?: () => void;
  isPending?: boolean;
  error?: Error | null;
  defaultContact?: CreateContactDTO;
}) {
  const {
    register,
    errors,
    handleSubmit,
    emailFields,
    telephoneFields,
    addressFields,
  } = useContactForm(defaultContact);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}
      >
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <TextField
              {...register("name")}
              label="Name"
              type="text"
              placeholder="Name"
              error={!!errors.name}
              helperText={errors.name?.message}
              fullWidth={true}
            />
          </Grid2>

          <Grid2 size={{ xs: 12, md: 6 }}>
            <TextField
              {...register("surname")}
              type="text"
              label="Surname"
              placeholder="Surname"
              error={!!errors.surname}
              helperText={errors.surname?.message}
              fullWidth={true}
            />
          </Grid2>
        </Grid2>

        <TextField
          {...register("ssn")}
          type="text"
          label="SSN"
          placeholder="SSN"
          error={!!errors.ssn}
          helperText={errors.ssn?.message}
          fullWidth={true}
        />

        <Typography variant="h6">Emails</Typography>
        <Divider />
        <ErrorText text={errors.emails?.root?.message} />
        {emailFields.fields.map((field, index) => (
          <TextField
            key={field.id}
            {...register(`emails.${index}.email` as const)}
            type="email"
            placeholder="Email"
            error={!!(errors.emails && errors.emails[index]?.email)}
            helperText={errors.emails && errors.emails[index]?.email?.message}
            slotProps={slotProps(() => emailFields.remove(index))}
            fullWidth={true}
          />
        ))}

        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <Button onClick={() => emailFields.append({ email: "" })}>
            Add email
          </Button>
        </Box>

        <Typography variant="h6">Telephones</Typography>
        <Divider />
        <ErrorText text={errors.telephones?.root?.message} />
        {telephoneFields.fields.map((field, index) => (
          <TextField
            key={field.id}
            {...register(`telephones.${index}.number` as const)}
            type="tel"
            placeholder="Telephone"
            error={!!(errors.telephones && errors.telephones[index]?.number)}
            helperText={
              errors.telephones && errors.telephones[index]?.number?.message
            }
            slotProps={slotProps(() => telephoneFields.remove(index))}
            fullWidth={true}
          />
        ))}

        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <Button onClick={() => telephoneFields.append({ number: "" })}>
            Add telephone
          </Button>
        </Box>

        <Typography variant="h6">Addresses</Typography>
        <Divider />
        <ErrorText text={errors.addresses?.root?.message} />
        {addressFields.fields.map((field, index) => (
          <Box key={field.id} sx={{ m: 2 }}>
            <Grid2 container spacing={2}>
              <Grid2 size={{ xs: 12, md: 6 }}>
                <TextField
                  {...register(`addresses.${index}.street` as const)}
                  type="text"
                  label="Street"
                  placeholder="Street"
                  error={
                    !!(errors.addresses && errors.addresses[index]?.street)
                  }
                  helperText={
                    errors.addresses && errors.addresses[index]?.street?.message
                  }
                  fullWidth
                />
              </Grid2>

              <Grid2 size={{ xs: 5, md: 2 }}>
                <TextField
                  {...register(`addresses.${index}.civic` as const)}
                  type="text"
                  label="Civic"
                  placeholder="Civic"
                  error={!!(errors.addresses && errors.addresses[index]?.civic)}
                  helperText={
                    errors.addresses && errors.addresses[index]?.civic?.message
                  }
                  fullWidth
                />
              </Grid2>

              <Grid2 size={{ xs: 12, md: 4 }}>
                <TextField
                  {...register(`addresses.${index}.postalCode` as const)}
                  type="text"
                  label="Postal code"
                  placeholder="Postal code"
                  error={
                    !!(errors.addresses && errors.addresses[index]?.postalCode)
                  }
                  helperText={
                    errors.addresses &&
                    errors.addresses[index]?.postalCode?.message
                  }
                  fullWidth
                />
              </Grid2>

              <Grid2 size={{ xs: 12, md: 6 }}>
                <TextField
                  {...register(`addresses.${index}.city` as const)}
                  type="text"
                  label="City"
                  placeholder="City"
                  error={!!(errors.addresses && errors.addresses[index]?.city)}
                  helperText={
                    errors.addresses && errors.addresses[index]?.city?.message
                  }
                  fullWidth
                />
              </Grid2>

              <Grid2 size={{ xs: 10, md: 5 }}>
                <TextField
                  {...register(`addresses.${index}.country` as const)}
                  type="text"
                  label="Country"
                  placeholder="Country"
                  error={!!errors.addresses?.[index]?.country}
                  helperText={errors.addresses?.[index]?.country?.message}
                />
              </Grid2>

              <Grid2 size={{ xs: 2, md: 1 }}>
                <IconButton onClick={() => addressFields.remove(index)}>
                  <Delete />
                </IconButton>
              </Grid2>
            </Grid2>

            <Divider sx={{ m: 2 }} />
          </Box>
        ))}

        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <Button
            onClick={() =>
              addressFields.append({
                street: "",
                civic: "",
                city: "",
                postalCode: "",
                country: "",
              })
            }
          >
            Add address
          </Button>
        </Box>

        <Divider />

        <ErrorText text={error?.message} />

        <Box sx={{ display: "flex", justifyContent: "end", gap: 2 }}>
          <Button onClick={onCancel} variant="outlined">
            Cancel
          </Button>
          <Button type={"submit"} variant={"contained"} disabled={isPending}>
            Submit {isPending && <CircularProgress />}
          </Button>
        </Box>
      </Box>
    </form>
  );
}
