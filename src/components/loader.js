import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";

export function Loader() {
  return (
    <div>
      <Stack
        display="flex"
        alignItems="center"
        justifyContent="center"
        height={200}
        sx={{ color: "grey.500" }}
        spacing={2}
        direction="row"
      >
        <CircularProgress color="secondary" />
      </Stack>
    </div>
  );
}