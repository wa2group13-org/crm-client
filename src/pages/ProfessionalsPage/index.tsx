import useProfessionalsPage from "./index.hooks.ts";
import { Table, TableBody, TablePagination, TableRow } from "@mui/material";

// const professional: ProfessionalDTO = {
//   skills: new Set(["test", "sium", "bella"]),
//   dailyRate: 1000.0,
//   id: 1,
//   notes: "Mind your business",
//   contact: {
//     telephones: [{ number: "333 333 3333", id: 1 }],
//     ssn: undefined,
//     id: 1,
//     addresses: [
//       {
//         civic: "21",
//         id: 1,
//         postalCode: "87050",
//         street: "Via Croce",
//         city: "Belpaese",
//       },
//     ],
//     surname: "Ronaldo",
//     name: "Test",
//     category: "Professional",
//     emails: [1, 2, 3, 4, 5, 6].map((id) => ({
//       id,
//       email: "brendonmendicino@yahoo.it",
//     })),
//   },
//   employmentState: "Available",
// };

export default function ProfessionalsPage() {
  const { page, setPage, limit, professionals } = useProfessionalsPage();

  if (professionals.isPending) return <span>Loading...</span>;

  if (professionals.isError)
    return <span>Error: {professionals.error.message}</span>;

  return (
    <>
      <Table>
        <TableBody>
          {professionals.data.content?.map((p) => (
            <TableRow key={p.id}>{JSON.stringify(p)}</TableRow>
          ))}
          <TableRow>
            <TablePagination
              count={professionals.data.totalPages ?? 0}
              onPageChange={(_event, page) => setPage(page)}
              page={page}
              rowsPerPage={limit}
            />
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
}
