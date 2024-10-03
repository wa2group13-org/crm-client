import useContactForm from "./index.hook.ts";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Divider,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
} from "@mui/material";
import { RemoveCircle } from "@mui/icons-material";
import { Controller, SubmitHandler } from "react-hook-form";
import {
  CreateContactDTO,
  CreateContactDTOCategoryEnum,
} from "../../apis/crm/api.ts";

const slotProps = (onClick: () => void) => ({
  input: {
    endAdornment: (
      <InputAdornment position={"end"}>
        <IconButton onClick={onClick}>
          <RemoveCircle />
        </IconButton>
      </InputAdornment>
    ),
  },
});

export default function ContactForm({
  onSubmit,
  isPending,
  error,
  defaultContact,
}: {
  onSubmit: SubmitHandler<CreateContactDTO>;
  isPending: boolean;
  error: Error | null;
  defaultContact?: CreateContactDTO;
}) {
  const {
    register,
    errors,
    handleSubmit,
    emailFields,
    telephoneFields,
    addressFields,
    control,
  } = useContactForm(defaultContact);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: "flex", flexDirection: "column", gap: 18 }}
    >
      <TextField
        {...register("name")}
        label="Name"
        type="text"
        placeholder="Name"
        error={!!errors.name}
        helperText={errors.name?.message}
        fullWidth={true}
      />
      <TextField
        {...register("surname")}
        type="text"
        label="Surname"
        placeholder="Surname"
        error={!!errors.surname}
        helperText={errors.surname?.message}
        fullWidth={true}
      />
      <TextField
        {...register("ssn")}
        type="text"
        label="SSN"
        placeholder="SSN"
        error={!!errors.ssn}
        helperText={errors.ssn?.message}
        fullWidth={true}
      />
      <Controller
        control={control}
        name={"category"}
        render={({ field }) => (
          <TextField
            {...field}
            select={true}
            label="Category"
            placeholder="Category"
            error={!!errors.category}
            helperText={errors.category?.message}
            fullWidth={true}
          >
            {Object.values(CreateContactDTOCategoryEnum).map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>
        )}
      />

      <Divider />
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

      <Button onClick={() => emailFields.append({ email: "" })}>
        Add email
      </Button>

      <Divider />
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

      <Button onClick={() => telephoneFields.append({ number: "" })}>
        Add telephone
      </Button>

      <Divider />
      {addressFields.fields.map((field, index) => (
        <Card key={field.id}>
          <CardContent>
            <TextField
              {...register(`addresses.${index}.street` as const)}
              type="text"
              placeholder="Street"
              error={!!(errors.addresses && errors.addresses[index]?.street)}
              helperText={
                errors.addresses && errors.addresses[index]?.street?.message
              }
              fullWidth={true}
            />
            <TextField
              {...register(`addresses.${index}.civic` as const)}
              type="text"
              placeholder="Civic"
              error={!!(errors.addresses && errors.addresses[index]?.civic)}
              helperText={
                errors.addresses && errors.addresses[index]?.civic?.message
              }
              fullWidth={true}
            />
            <TextField
              {...register(`addresses.${index}.city` as const)}
              type="text"
              placeholder="City"
              error={!!(errors.addresses && errors.addresses[index]?.city)}
              helperText={
                errors.addresses && errors.addresses[index]?.city?.message
              }
              fullWidth={true}
            />
            <TextField
              {...register(`addresses.${index}.postalCode` as const)}
              type="text"
              placeholder="Postal code"
              error={
                !!(errors.addresses && errors.addresses[index]?.postalCode)
              }
              helperText={
                errors.addresses && errors.addresses[index]?.postalCode?.message
              }
              fullWidth={true}
            />
          </CardContent>

          <CardActions>
            <Button onClick={() => addressFields.remove(index)}>
              Remove address
            </Button>
          </CardActions>
        </Card>
      ))}

      <Button
        onClick={() =>
          addressFields.append({
            street: "",
            civic: "",
            city: "",
            postalCode: "",
          })
        }
      >
        Add address
      </Button>

      <Divider />

      {error && <p>{error.message}</p>}
      <Button type={"submit"} variant={"contained"} disabled={isPending}>
        Submit {isPending && <CircularProgress />}
      </Button>
    </form>
  );
}
