import React, {ReactElement, useEffect} from "react";
import FullPage from "@components/layout/FullPage";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination} from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
interface LogTime {
  mail: string;
  duration: number;
}

const formatDuration = (duration: number): string => {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = duration % 60;
  return `${hours}h ${minutes < 10 ? '0' : ''}${minutes}m ${seconds < 10 ? '0' : ''}${seconds}s`;
};

export default function MainPage () {
  const [data, setData] = React.useState<LogTime[]>([]);
  const [since, setSince] = React.useState<number>(1);
  const [page, setPage] = React.useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);
  const getData = async (since:number) => {
    let url = "https://jampi.pechart.fr/";
    setSince(since)
    switch (since) {
      case 1:
        url += "week";
        break;
      case 2:
        url += "month";
        break;
      case 3:
        url += "sixmonth";
        break;
      case 4:
        url += "year";
        break;
    }
    console.log(url);
    const response = await fetch(url);
    if (!response.ok) {
      console.error("Error while fetching data");
      return;
    }
    setData(await response.json());
  }
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  useEffect(() => {
    getData(1);
  }, []);
  return (
    <main className={"main"}>
      <h1>LeaderBoard (léo le goat)</h1>
      <TableContainer component={Paper} className={"Tableau"}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{ width: '10%'}}>Position</TableCell>
            <TableCell style={{ width: '35%'}}>Login</TableCell>
            <TableCell style={{ width: '20%'}}>
                <Select
                  value={since}
                  onChange={(event: SelectChangeEvent<number>) => {
                    getData(event.target.value as number);
                  }}
                >
                  <MenuItem value={1}>Last Week</MenuItem>
                  <MenuItem value={2}>Last Month</MenuItem>
                  <MenuItem value={3}>Last Six Months</MenuItem>
                  <MenuItem value={4}>Last Year</MenuItem>
                </Select>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow
              key={row.mail}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
                <TableCell>
                {row.mail}
              </TableCell>
              <TableCell>
                {formatDuration(row.duration)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
    </main>
  )
}

MainPage.getLayout = function getLayout(page: ReactElement) {
  return <FullPage>{page}</FullPage>;
}