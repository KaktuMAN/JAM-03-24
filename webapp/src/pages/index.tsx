import React, {ReactElement} from "react";
import FullPage from "@components/layout/FullPage";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

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
  const data: LogTime[] = [
    {
      "mail": "caca.pipi@epitech.eu",
      "duration": 3600,
    },
    {
      "mail": "raphael.goncaves-dos-santos@epitech.eu",
      "duration": 3000,
    }
  ]

  return (
    <main className={"main"}>
      <h1>LeaderBoard</h1>
      <TableContainer component={Paper} className={"Tableau"}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{ width: '10%'}}>Position</TableCell>
            <TableCell style={{ width: '35%'}}>Login</TableCell>
            <TableCell style={{ width: '5%'}}>LogTime</TableCell>
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
    </TableContainer>
    </main>
  )
}

MainPage.getLayout = function getLayout(page: ReactElement) {
  return <FullPage>{page}</FullPage>;
}