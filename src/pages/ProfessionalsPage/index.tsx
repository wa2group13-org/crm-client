import useProfessionalsPage from "./index.hooks.ts";
import {
  Pagination,
  Table,
  TableBody,
  TablePagination,
  TableRow,
} from "@mui/material";

export default function ProfessionalsPage() {
  const { page, setPage, limit, professionals } = useProfessionalsPage();

  if (professionals.isPending) return <span>Loading...</span>;

  if (professionals.isError)
    return <span>Error: {professionals.error.message}</span>;

  return (
    <>
      {professionals.data.content?.map((p) => (
        <TableRow key={p.id}>{JSON.stringify(p)}</TableRow>
      ))}
      <Pagination
        count={professionals.data.totalPages}
        page={page}
        onChange={(_, newPage) => setPage(newPage)}
      />
    </>
  );
}
