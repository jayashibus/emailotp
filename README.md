# Email OTP Generator

Generic OTP generator.

## Installation

In the project directory, you can run:

```sh
npm i emailotp
```

## Usage

```sh
const { generate_OTP_email, check_OTP } = require("emailotp");
```

generate_otp_email function that takes one argument (the email address to send the OTP to) and performs email validation before sending the OTP

```sh
generate_OTP_email("tester1@dso.org.sg")
```

check_OTP function that takes an Input stream object containing the email ID and User entering OTP value:

```sh
userDetails = { user_email: "tester1@dso.org.sg", otp: "173923" };
```

```sh
check_OTP(userDetails)
```

## Test

### Valid Email

Email Ends with @dso.org.sg are Valid

```sh
tester1@dso.org.sg,
admin.hr@dso.org.sg,
```

### Invalid Email

Email Ends with @dso.org.sg are Valid

```sh
tester2@dso.org.sg.yahoo.com,
tester2@yahoo.com,
```

ß

You can pass the valid OTP in below format for testing

```sh
userDetails = { user_email: "tester1@dso.org.sg", otp: "173923" };
```

```sh
check_OTP(userDetails)
```
