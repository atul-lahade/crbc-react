import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Image from '../static/images/login-page.png';
import { executePOST } from '../ExecuteAPI';
import SignInData from '../types/interfaces/model/SignInData';
import axios from 'axios';
import { EMAIL_REGEX, MANDATORY_FIELD } from '../types/const/Common';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { HttpStatusCode } from '../types/enum/HttpStatusCode';
import AdminDashboardProps from '../types/interfaces/props/AdminDashboardProps';
import { UserType } from '../types/enum/UserType';
import ApplicantDashboardProps from '../types/interfaces/props/ApplicantDashboardProp';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="http://localhost:3000/sign-in">
        CRBC
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignIn() {
  const navigation = useNavigate();

  let signInData: SignInData = {};
  const [mailState, setEmailState] = useState({ helperText: '', error: false });
  const [passwordState, setPasswordState] = useState({ helperText: '', error: false });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userDetails = new FormData(event.currentTarget);
    if (userDetails.get('email') === '') {
      setEmailState({ helperText: MANDATORY_FIELD, error: true })
    } else if (!EMAIL_REGEX.test(userDetails.get('email')!.toString())) {
      setEmailState({ helperText: "Invalid email address", error: true })
    } else {
      setEmailState({ helperText: '', error: false })
    }
    if (userDetails.get('password') === '') {
      setPasswordState({ helperText: MANDATORY_FIELD, error: true })
    } else {
      setPasswordState({ helperText: '', error: false })
    }
    if (!(mailState.error || passwordState.error)) {
      signInData = {
        email: userDetails.get('email')!.toString(),
        password: userDetails.get('password')?.toString()
      } as SignInData;
      try {
        executePOST("http://localhost:8080/api-crbc/sign-in", signInData).then((response) => {
          if (response.data.status === HttpStatusCode.OK) {
            if (response.data.data.userType === UserType.ADMINISTRATOR) {
              let adminDashboardProps: AdminDashboardProps = response.data.data;
              console.log(adminDashboardProps);
              navigation("/admin-dashboard", { state: { adminDashboardProps }, replace: true });
            } else {
              let applicantDashboardProps: ApplicantDashboardProps = response.data.data;
              //console.log(applicantDashboardProps);
              navigation("/applicant-dashboard", { state: { applicantDashboardProps }, replace: true });
            }
          }
        });;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log('error message: ', error.message);
          // 👇️ error: AxiosError<any, any>
          return error.message;
        } else {
          console.log('unexpected error: ', error);
          return 'An unexpected error occurred';
        }
      }
    };
  }

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: `url(${Image})`,
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  error={mailState.error}
                  helperText={mailState.helperText}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  error={passwordState.error}
                  helperText={passwordState.helperText}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item>
                    <Link href="/sign-up" variant="body2" >
                      {"Don't have an account? Sign Up"}
                    </Link>

                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>

  );
}
