import React from "react";
import { default as Btn } from "@mui/material/Button";
import Grid from "@mui/material/Grid";

function Button(props) {
  return (
    <Grid item xs={12} sm={props.sm}>
      <Btn
        type={[props.type]}
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2, ...props.style }}
        onClick={props.onClick}
      >
        {props.title}
      </Btn>
    </Grid>
  );
}

export default Button;
