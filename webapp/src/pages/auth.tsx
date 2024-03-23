import {ReactElement} from "react";
import FullPage from "@components/layout/FullPage";
import Head from "next/head";
import Link from "next/link";
import {TextField} from "@mui/material";
import Button from '@mui/material/Button';

export default function Auth () {
  return (
  <main className={"main"}>
    <h1>Token entry</h1>
    <div className={"TokenBox"}>
        <div className={"TokenInput"}>
          <TextField id="outlined-basic" label="Enter Token" variant="outlined" itemID={"input"}/>
        </div>
        <div className={"ValidateButton"}>
          <Button variant="contained">Validate</Button>
        </div>
    </div>
  </main>
  )
}


Auth.getLayout = function getLayout(page: ReactElement) {
  return <FullPage>{page}</FullPage>;
}
