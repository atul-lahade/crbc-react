import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { UserType } from '../types/enum/UserType';
import { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, FormLabel, Radio, RadioGroup } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Countries } from '../types/const/Countries';
import dayjs, { Dayjs } from 'dayjs';
import UserData from '../types/interfaces/model/UserData';
import axios from 'axios';
import { executePOST } from '../ExecuteAPI';

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

const defaultTheme = createTheme();

export default function SignUp() {
  let userData: UserData = {};

  const [defaultDate, setDefaultDate] = React.useState<Dayjs | null>(dayjs('2022-04-17'));
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const [showApplicantField, setShowApplicantField] = useState(false);
  const [firstNameState, setFirstNameState] = useState({ helperText: '', error: false });
  const [userTypeState, setUserTypeState] = useState({ helperText: '', error: false });
  const [lastNameState, setLastNameState] = useState({ helperText: '', error: false });
  const [contactNoState, setContactNoState] = useState({ helperText: '', error: false });
  const [nationalityState, setNationalityState] = useState({ helperText: '', error: false });
  const [addressState, setAddressState] = useState({ helperText: '', error: false });
  const [aadharState, setAadharState] = useState({ helperText: '', error: false });
  const [passportState, setPassportState] = useState({ helperText: '', error: false });
  const [personalEmailState, setPersonalEmailState] = useState({ helperText: '', error: false });
  const [passwordState, setPasswordState] = useState({ helperText: '', error: false });
  const [companyNameState, setCompanyNameState] = useState({ helperText: '', error: false });
  const [industryState, setIndustryState] = useState({ helperText: '', error: false });
  const [contactPersonNameState, setContactPersonNameState] = useState({ helperText: '', error: false });
  const [contactEmailState, setContactEmailState] = useState({ helperText: '', error: false });
  const [contactPhoneState, setContactPhoneState] = useState({ helperText: '', error: false });

  const accountTypes = [UserType.ADMINISTRATOR, UserType.APPLICANT];

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userDetails = new FormData(event.currentTarget);
    console.log({
      UserType: userDetails.get('userType'),
      firstName: userDetails.get('firstName'),
      lastName: userDetails.get('lastName'),
      contactNo: userDetails.get('contactNo'),
      email: userDetails.get('personal-email'),
      password: userDetails.get('password'),
      nationality: userDetails.get('nationality'),
      address: userDetails.get('address'),
      aadharNo: userDetails.get('aadharNo'),
      passportNo: userDetails.get('passportNo')
    });
    if (userDetails.get('userType') === '') {
      setUserTypeState({ helperText: 'Invalid account type', error: true })
    } else {
      setUserTypeState({ helperText: '', error: false })
    }
    if (userDetails.get('firstName') === '') {
      setFirstNameState({ helperText: 'Invalid first name', error: true })
    } else {
      setFirstNameState({ helperText: '', error: false })
    }
    if (userDetails.get('lastName') === '') {
      setLastNameState({ helperText: 'Invalid last name', error: true })
    } else {
      setLastNameState({ helperText: '', error: false })
    }
    if (userDetails.get('contactNo') === '') {
      setContactNoState({ helperText: 'Invalid contact number', error: true })
    } else {
      setContactNoState({ helperText: '', error: false })
    }
    if (userDetails.get('personal-email') === '' || !emailRegex.test(userDetails.get('personal-email')!.toString())) {
      setPersonalEmailState({ helperText: 'Invalid personal email address', error: true })
    } else {
      setPersonalEmailState({ helperText: '', error: false })
    }
    if (userDetails.get('password') === '') {
      setPasswordState({ helperText: 'Invalid password', error: true })
    } else {
      setPasswordState({ helperText: '', error: false })
    }
    if (userDetails.get('nationality') === '') {
      setNationalityState({ helperText: 'Invalid nationality', error: true })
    } else {
      setNationalityState({ helperText: '', error: false })
    }
    if (userDetails.get('address') === '') {
      setAddressState({ helperText: 'Invalid address', error: true })
    } else {
      setAddressState({ helperText: '', error: false })
    }
    if (userDetails.get('aadharNo') === '') {
      setAadharState({ helperText: 'Invalid aadhar no', error: true })
    } else {
      setAadharState({ helperText: '', error: false })
    }
    if (userDetails.get('passportNo') === '') {
      setPassportState({ helperText: 'Invalid passport no', error: true })
    } else {
      setPassportState({ helperText: '', error: false })
    }
    if (userDetails.get('companyName') === '') {
      setCompanyNameState({ helperText: 'Invalid company name', error: true })
    } else {
      setCompanyNameState({ helperText: '', error: false })
    }
    if (userDetails.get('industry') === '') {
      setIndustryState({ helperText: 'Invalid industry name', error: true })
    } else {
      setIndustryState({ helperText: '', error: false })
    }
    if (userDetails.get('contactPersonName') === '') {
      setContactPersonNameState({ helperText: 'Invalid contact person name', error: true })
    } else {
      setContactPersonNameState({ helperText: '', error: false })
    }
    if (userDetails.get('contactEmail') === '' || !emailRegex.test(userDetails.get('contactEmail')!.toString())) {
      setContactEmailState({ helperText: 'Invalid contact email', error: true })
    } else {
      setContactEmailState({ helperText: '', error: false })
    }
    if (userDetails.get('contactPhone') === '') {
      setContactPhoneState({ helperText: 'Invalid contact phone', error: true })
    } else {
      setContactPhoneState({ helperText: '', error: false })
    }
    if (!(userTypeState.error || firstNameState.error || lastNameState.error || contactNoState.error || nationalityState.error || aadharState.error || passportState.error || addressState.error || personalEmailState.error || passportState.error)) {
      if (userDetails.get('userType') == UserType.APPLICANT) {
        userData = {
          userType: userDetails.get('userType')?.toString(),
          fullName: userDetails.get('firstName')?.toString() + ' ' + userDetails.get('lastName')?.toString(),
          contactNumber: Number(userDetails.get('contactNo')?.toString()),
          dateOfBirth: convertDate(defaultDate!.toString()),
          gender: userDetails.get('gender')?.toString(),
          nationality: userDetails.get('nationality')?.toString(),
          address: userDetails.get('address')?.toString(),
          identificationNumber: Number(userDetails.get('aadharNo')?.toString()),
          passportNumber: userDetails.get('passportNo')?.toString(),
          email: userDetails.get('personal-email')?.toString(),
          password: userDetails.get('password')?.toString(),
          companyDetails: {
            companyName: userDetails.get('companyName')?.toString(),
            industry: userDetails.get('industry')?.toString(),
            contactPersonName: userDetails.get('contactPersonName')?.toString(),
            contactEmail: userDetails.get('contactEmail')?.toString(),
            contactPhone: Number(userDetails.get('contactPhone')?.toString())
          }
        };
        console.log(userData);
      } else {
        userData = {
          userType: userDetails.get('userType')?.toString(),
          fullName: userDetails.get('firstName')?.toString() + ' ' + userDetails.get('lastName')?.toString(),
          contactNumber: Number(userDetails.get('contactNo')?.toString()),
          email: userDetails.get('personal-email')?.toString(),
          password: userDetails.get('password')?.toString()
        }
      }
      try {
        executePOST("http://localhost:8080/api-crbc/sign-up", userData).then((response) => {
          console.log(response.data.data);
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
    }
  };

  function convertDate(str: string) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("/");
  }

  function handleAccTypeChange(event: SelectChangeEvent<unknown>, child: React.ReactNode): void {
    if (event.target.value == UserType.APPLICANT) {
      setShowApplicantField(true);
    } else {
      setShowApplicantField(false);
    }
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} >
            <PersonIcon />
          </Avatar>
          <Typography component="h1" variant="h6">
            Personal Details
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <FormControl fullWidth error={userTypeState.error}>
                  <InputLabel id="demo-simple-select-label">Account Type</InputLabel>
                  <Select
                    name="userType"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Account Type"
                    onChange={handleAccTypeChange}
                    defaultValue=""
                  >
                    {accountTypes.map((value, index) => (
                      <MenuItem key={index.toString()} value={value}>{value}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  error={firstNameState.error}
                  helperText={firstNameState.helperText}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  error={lastNameState.error}
                  helperText={lastNameState.helperText}
                />
              </Grid>
              <Grid item xs={12} sm={7}>
                <TextField
                  required
                  fullWidth
                  id="contactNo"
                  label="Contact Number"
                  type="number"
                  name="contactNo"
                  autoComplete="contact-no"
                  error={contactNoState.error}
                  helperText={contactNoState.helperText}
                />
              </Grid>
              {showApplicantField && (<><Grid item xs={12} sm={5}>
                <FormControl fullWidth error={nationalityState.error}>
                  <InputLabel id="demo-simple-select-label">Nationality</InputLabel>
                  <Select
                    name="nationality"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Nationality"
                    defaultValue=""
                  >
                    {Countries.map((conutry, index) => (
                      <MenuItem key={index.toString()} value={conutry.code}>{conutry.label}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
                <Grid item xs={12} sm={7} >
                  <LocalizationProvider dateAdapter={AdapterDayjs} >
                    <DemoContainer components={['DatePicker']}>
                      <DatePicker label="Date of Birth" value={defaultDate} onChange={(newValue) => setDefaultDate(newValue)} />
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                  <FormControl error={nationalityState.error}>
                    <FormLabel id="demo-row-radio-buttons-group-label" required>Gender</FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="gender"
                      defaultValue="male"
                    >
                      <FormControlLabel value="female" control={<Radio />} label="Female" />
                      <FormControlLabel value="male" control={<Radio />} label="Male" />
                      <FormControlLabel value="other" control={<Radio />} label="Other" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    type="number"
                    id="aadharNo"
                    label="Aadhar No"
                    name="aadharNo"
                    autoComplete="aadhar-no"
                    error={aadharState.error}
                    helperText={aadharState.helperText}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="passportNo"
                    label="Passport No"
                    name="passportNo"
                    autoComplete="passport-no"
                    error={passportState.error}
                    helperText={passportState.helperText}
                    inputProps={{ style: { textTransform: "uppercase" } }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="address"
                    label="Address"
                    name="address"
                    autoComplete="address"
                    error={addressState.error}
                    helperText={addressState.helperText}
                  />
                </Grid></>)}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="personal-email"
                  label="Personal Email Address"
                  name="personal-email"
                  autoComplete="email"
                  error={personalEmailState.error}
                  helperText={personalEmailState.helperText}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={passwordState.error}
                  helperText={passwordState.helperText}
                />
              </Grid>
            </Grid>
            {showApplicantField && (<>
              <Avatar sx={{
                m: 3,
                marginTop: 4,
                marginLeft: 22,
                bgcolor: 'secondary.main'
              }} >
                <BusinessIcon />
              </Avatar>
              <Typography sx={{
                m: 3, marginTop: -2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }} component="h1" variant="h6">
                Company Details
              </Typography>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="companyName"
                    label="Company Name"
                    id="companyName"
                    autoComplete="companyName"
                    error={companyNameState.error}
                    helperText={companyNameState.helperText}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="industry"
                    label="Industry"
                    id="industry"
                    autoComplete="industry"
                    error={industryState.error}
                    helperText={industryState.helperText}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="contactPersonName"
                    label="Contact Person Name"
                    id="contactPersonName"
                    autoComplete="contactPersonName"
                    error={contactPersonNameState.error}
                    helperText={contactPersonNameState.helperText}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="contactEmail"
                    label="Contact Email"
                    id="contactEmail"
                    autoComplete="contactEmail"
                    error={contactEmailState.error}
                    helperText={contactEmailState.helperText}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="number"
                    name="contactPhone"
                    label="Contact Phone"
                    id="contactPhone"
                    autoComplete="contactPhone"
                    error={contactPhoneState.error}
                    helperText={contactPhoneState.helperText}
                  />
                </Grid>
              </Grid></>)}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/sign-in#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>

        </Box>
        <Copyright sx={{ mt: 3 }} />
      </Container>
    </ThemeProvider >
  );
}
