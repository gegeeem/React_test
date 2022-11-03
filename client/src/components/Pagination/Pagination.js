import * as React from "react";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useEffect } from "react";

export default function PaginationFor({
  currPage,
  numberOfPage,
  selectPageFunc,
}) {
  const [page, setPage] = React.useState(currPage);
  const handleChange = (event, value) => {
    setPage(value);
    selectPageFunc(value);
  };
  //   useEffect(() => {
  //     if (page !== currPage) {
  //       setPage(currPage);
  //     }
  //   }, [currPage]);
  return (
    <Stack spacing={2}>
      <Pagination
        count={numberOfPage}
        page={currPage}
        onChange={handleChange}
        color={"secondary"}
      />
    </Stack>
  );
}
