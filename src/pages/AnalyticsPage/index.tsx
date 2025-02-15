import {
  Alert,
  Box,
  Button,
  Container,
  Divider,
  Popover,
  Typography,
} from "@mui/material";
import useAnalyticsPage from "./index.hook.ts";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Loading from "../../components/Loading";
import {
  GenericFilterDTO,
  GenericStatDTO,
} from "../../apis/crm-analytics/api.ts";
import dayjs from "dayjs";
import { useState } from "react";
import { FilterList } from "@mui/icons-material";
import AnalyticsFilterForm from "../../components/AnalyticsFilterForm";

export default function AnalyticsPage() {
  const {
    filters,
    setFilters,
    contact,
    customer,
    professional,
    message,
    jobOffer,
  } = useAnalyticsPage();

  if (
    contact.isPending ||
    customer.isPending ||
    professional.isPending ||
    message.isPending ||
    jobOffer.isPending
  )
    return <Loading />;

  if (
    contact.isError ||
    customer.isError ||
    professional.isError ||
    message.isError ||
    jobOffer.isError
  )
    return (
      <Container>
        <Alert severity="error">
          {contact.error?.message ||
            customer.error?.message ||
            professional.error?.message ||
            message.error?.message ||
            jobOffer.error?.message}
        </Alert>
      </Container>
    );

  return (
    <Container>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
        <Typography variant="h2" sx={{ flexGrow: 1 }}>
          Analytics
        </Typography>
        <AnalyticsFilterButton filters={filters} setFilters={setFilters} />
      </Box>

      <br />

      <Section
        stat={customer.data[0]}
        tot={customer.data[1]}
        name={"Customers"}
      />

      <Section
        stat={professional.data[0]}
        tot={professional.data[1]}
        name={"Professionals"}
      />

      <Section stat={contact.data[0]} tot={contact.data[1]} name={"Contacts"} />

      <Section
        stat={jobOffer.data[0]}
        tot={jobOffer.data[1]}
        name={"Job offers"}
      />

      <Section stat={message.data[0]} tot={message.data[1]} name={"Messages"} />
    </Container>
  );
}

function Section({
  stat,
  tot,
  name,
}: {
  stat: GenericStatDTO[];
  tot: number;
  name: string;
}) {
  return (
    <>
      <Divider />
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        <Typography sx={{ flexGrow: 1 }} variant="h3">
          {name}
        </Typography>
        <Typography sx={{ flexGrow: 0 }} variant="h4">
          Total amount: {tot}
        </Typography>
      </Box>
      <Graph stat={stat} />
    </>
  );
}

function Graph({ stat }: { stat: GenericStatDTO[] }) {
  const data = stat
    .map((d) => ({
      date: dayjs(d.dateFormat).unix() * 1000,
      value: d.count,
    }))
    .sort((a, b) => a.date - b.date);

  if (data.length === 0) {
    data.push({ date: dayjs().unix(), value: 0 });
  }

  return (
    <Box>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            domain={[data[0].date, data[data.length - 1].date]}
            scale="time"
            type="number"
            tickFormatter={(d) => dayjs(d).format("DD MMM YYYY")}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}

function AnalyticsFilterButton({
  filters,
  setFilters,
}: {
  filters: GenericFilterDTO;
  setFilters: (filter: GenericFilterDTO) => void;
}) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={(e) => {
          setOpen(true);
          setAnchorEl(e.currentTarget);
        }}
        startIcon={<FilterList />}
      >
        Filter
      </Button>

      <Popover open={open} onClose={() => setOpen(false)} anchorEl={anchorEl}>
        <Box sx={{ m: 2, maxWidth: "500px" }}>
          <Typography>Professional filters</Typography>
          <AnalyticsFilterForm
            filters={filters}
            onSubmit={(filters, event) => {
              event?.preventDefault();
              setFilters(filters);
              setOpen(false);
            }}
          />
        </Box>
      </Popover>
    </>
  );
}
