import React, {ReactElement} from "react";
import FullPage from "@components/layout/FullPage";
import Link from "next/link";
import {Grid} from "@mui/material";
import Box from '@mui/material/Box';

interface ApiData {
  users: User[];
  average: LogTime[];
}

interface User {
  email: string;
  timeLogs: LogTime[];
}

interface LogTime {
  date: string;
  duration: number;
}

export default function MainPage () {
  const data: ApiData = {
    "users": [
      {
        "email": "nicolas.pechart@epitech.eu",
        "timeLogs": [
          {
            "date": "2022-01-01",
            "duration": 3600
          },
          {
            "date": "2022-01-02",
            "duration": 42069
          }
        ]
      },
    ],
    "average": [
      {
        "date": "2022-01-01",
        "duration": 3600
      },
      {
        "date": "2022-01-02",
        "duration": 42069
      }
    ]
  }
  return (
    <main style={{width: "100%", display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh'}}>
    </main>
  )
}

MainPage.getLayout = function getLayout(page: ReactElement) {
  return <FullPage>{page}</FullPage>;
}