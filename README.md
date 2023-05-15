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

This OTP details will store in local storage.

check_OTP function that takes an Input stream object containing the email ID and User entering OTP value:

```sh
userDetails = { user_email: "tester1@dso.org.sg", otp: "173923" };
```

```sh
check_OTP(userDetails)
```
