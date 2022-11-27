import React, { useRef, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";

const theme = createTheme();

function Form(props) {
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const closeRef = useRef(null);
  const { onClose, onChange, disabled, required, edit, formConfirm } = props;
  const { firstName, lastName, email, phone } = props.contact;

  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <div
      style={{
        position: "absolute",
        top: "0",
        bottom: "0",
        left: "0",
        right: "0",
        display: "grid",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.3)",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "20px",
          display: "inline-block",
          minHeight: "300px",

          position: "relative",
          minWidth: "300px",
          boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
          justifySelf: "center",
        }}
      >
        {formConfirm || (
          <>
            <IconButton
              sx={{
                color: "red",

                float: "right",
                marignBottom: "200px",
              }}
            >
              <Icon
                className="fa-times-circle "
                baseClassName="fas"
                ref={closeRef}
                onClick={onClose}
                sx={{
                  fontSize: 30,
                }}
              />
            </IconButton>

            <ThemeProvider theme={theme}>
              <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                  sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Avatar>
                    <Icon
                      baseClassName="fas"
                      className="fa-user-circle "
                      onClick={onClose}
                      sx={{
                        color: "purple",
                        fontSize: 50,
                      }}
                    />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    <h2> {`${firstName} ${lastName}`}</h2>
                  </Typography>
                  <Box component="form" noValidate sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                      {edit && (
                        <>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              autoComplete="given-name"
                              name="firstName"
                              ref={firstNameRef}
                              disabled={disabled}
                              required={required}
                              onChange={onChange}
                              value={firstName}
                              style={{ color: "000" }}
                              fullWidth
                              InputLabelProps={{
                                style: { color: "#000" },
                              }}
                              id="firstName"
                              label={"firstName"}
                              autoFocus
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              ref={lastNameRef}
                              disabled={disabled}
                              required={required}
                              onChange={onChange}
                              value={lastName}
                              style={{ color: "fff" }}
                              InputLabelProps={{
                                style: { color: "#000" },
                              }}
                              id="lastName"
                              label={"lastName"}
                              defaultvalue={lastName}
                              name="lastName"
                              autoComplete="family-name"
                            />
                          </Grid>
                        </>
                      )}

                      <Grid item xs={12}>
                        <TextField
                          required={required}
                          disabled={disabled}
                          onChange={onChange}
                          value={email}
                          style={{ color: "000" }}
                          fullWidth
                          ref={emailRef}
                          InputLabelProps={{
                            style: { color: "#000" },
                          }}
                          id="email"
                          label={"email"}
                          name="email"
                          autoComplete="email"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          disabled={disabled}
                          required={required}
                          style={{ color: "000" }}
                          value={phone}
                          fullWidth
                          ref={phoneRef}
                          onChange={onChange}
                          name="phone"
                          InputLabelProps={{
                            style: { color: "#000" },
                          }}
                          label={"phone"}
                          id="phone"
                        />
                      </Grid>
                      {props.children}
                    </Grid>
                  </Box>
                </Box>
              </Container>
            </ThemeProvider>
          </>
        )}
      </div>
    </div>
  );
}

export default Form;
