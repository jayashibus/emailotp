const message = require("./constants");

function generate_OTP_email(user_email) {
  // // Validate email domain
  // if (!user_email.endsWith("@dso.org.sg")) {
  //   return message.CONSTANTS.statusMsg.STATUS_EMAIL_INVALID;
  // }

  //
  // const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // if (!regex.test(user_email)) {
  //   return message.CONSTANTS.statusMsg.STATUS_EMAIL_INVALID;
  // }

  // Validate email address and Validate email domain and check special charactor

  const regex = /^[a-zA-Z0-9._%+-]+@(dso\.org\.sg)$/i;
  if (!regex.test(user_email)) {
    return message.CONSTANTS.statusMsg.STATUS_EMAIL_INVALID;
  }

  const otp = String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
  const start_time = new Date().getTime();

  storeOTP(user_email, otp);

  const email_body = `Your OTP Code is ${otp}. The code is valid for 1 minute.`;
  if (!send_email(user_email, email_body)) {
    return message.CONSTANTS.statusMsg.STATUS_EMAIL_FAIL;
  }

  return message.CONSTANTS.statusMsg.STATUS_EMAIL_OK;
}

function check_OTP(input) {
  let enteredOtp = input.otp;

  //Tries should store in the database and fetch of every OTP entry
  //let tries = getTries(input.email);

  const otpData = JSON.parse(localStorage.getItem("otpData"));

  if (otpData.tries < 10) {
    const elapsed_time = new Date().getTime();
    if (elapsed_time >= otpData.expiryTime) {
      return message.CONSTANTS.statusMsg.STATUS_OTP_TIMEOUT;
    }

    //Hardcoded stored OTP. Its suppose to fetch from DB

    if (validateOTP(enteredOtp) && enteredOtp === otpData.otp) {
      return message.CONSTANTS.statusMsg.STATUS_OTP_OK;
    } else {
      updateTries(otpData.email);
      otpData.tries++;
      const remaining_tries = 10 - otpData.tries;
      if (remaining_tries === 0) {
        return message.CONSTANTS.statusMsg.STATUS_OTP_FAIL;
      } else {
        return `Invalid OTP code. ${remaining_tries} tries remaining.`;
        // console.log(`Invalid OTP code. ${remaining_tries} tries remaining.`);
      }
    }
  }

  //return message.CONSTANTS.statusMsg.STATUS_OTP_FAIL;
}

function storeOTP(email, otp) {
  // implement OTP storage logic here
  const expiryTime = new Date().getTime() + 60000; // expiry time = 1 minute from now
  const tries = 0;
  const otpData = { email, otp, expiryTime, tries };
  localStorage.setItem("otpData", JSON.stringify(otpData));

  console.log(localStorage.getItem("otpData")); // should log the OTP data object
}

function getOTP(email) {
  // implement get OTP  logic here
  const otpData = JSON.parse(localStorage.getItem("otpData"));
  console.log("Get OTP ", otpData);
  if (
    otpData &&
    otpData.email === email &&
    otpData.expiryTime > new Date().getTime()
  ) {
    console.log("OTP", otpData.otp);

    return otpData;
  } else {
    return null;
  }
}

function updateTries(email) {
  const storageKey = "otpData";
  const existingData = JSON.parse(localStorage.getItem(storageKey));

  // If there is existing data, update the tries count
  const tries = existingData ? existingData.tries + 1 : 1;
  const otp = existingData.otp;

  const expiryTime = existingData.expiryTime; // expiry time = 1 minute from now
  const otpData = { email, otp, expiryTime, tries };
  localStorage.setItem(storageKey, JSON.stringify(otpData));

  console.log(localStorage.getItem(storageKey)); // should log the updated OTP data object
}

function getTries(email) {
  // implement get OTP  logic here
  const otpData = JSON.parse(localStorage.getItem("otpData"));

  if (
    otpData &&
    otpData.email === email &&
    otpData.expiryTime > new Date().getTime()
  ) {
    console.log("Tries", otpData.tries);
    return otpData.tries;
  } else {
    return null;
  }
}

function validateOTP(otp) {
  const re = /^[0-9]{6}$/;
  return re.test(otp);
}

// function timerCallback() {
//   console.log("1 minute has passed!");
//   return message.CONSTANTS.statusMsg.STATUS_OTP_TIMEOUT;
// }

function send_email(email_address, email_body) {
  console.log(email_address);
  console.log(email_body);

  return true;
}

module.exports = {
  generate_OTP_email,
  check_OTP,
};
