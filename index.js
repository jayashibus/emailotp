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

  const email_body = `Your OTP Code is ${otp}. The code is valid for 1 minute.`;
  if (!send_email(user_email, email_body)) {
    return message.CONSTANTS.statusMsg.STATUS_EMAIL_FAIL;
  }

  return message.CONSTANTS.statusMsg.STATUS_EMAIL_OK;
}

function check_OTP(input) {
  let otp = input.otp;

  //Tries should store in the database and fetch of every OTP entry
  let tries = 0;
  const start_time = new Date().getTime();
  const timeout = 60000;
  // setTimeout(timerCallback, 60000);

  // const timeout = setTimeout(() => {
  //   return message.CONSTANTS.statusMsg.STATUS_OTP_TIMEOUT;
  // }, 10000);

  if (tries < 10) {
    const elapsed_time = new Date().getTime() - start_time;
    if (elapsed_time >= timeout) {
      return message.CONSTANTS.statusMsg.STATUS_OTP_TIMEOUT;
    }

    //Hardcoded stored OTP. Its suppose to fetch from DB
    stored_otp = "173923";

    if (validateOTP(otp) && otp === stored_otp) {
      return message.CONSTANTS.statusMsg.STATUS_OTP_OK;
    } else {
      tries++;
      const remaining_tries = 10 - tries;
      if (remaining_tries === 0) {
        return message.CONSTANTS.statusMsg.STATUS_OTP_FAIL;
      } else {
        console.log(`Invalid OTP code. ${remaining_tries} tries remaining.`);
      }
    }
  }

  return message.CONSTANTS.statusMsg.STATUS_OTP_FAIL;
}

function storeOTP(email, otp) {
  // implement OTP storage logic here
}

function getOTP(email) {
  // implement get OTP  logic here
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
