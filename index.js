const message = require("./constants");

function generate_OTP_email(user_email) {
  // Validate email domain
  if (!user_email.endsWith("@dso.org.sg")) {
    return message.CONSTANTS.statusMsg.STATUS_EMAIL_INVALID;
  }

  // Validate email address for valid chars, etc.
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(user_email)) {
    return message.CONSTANTS.statusMsg.STATUS_EMAIL_INVALID;
  }

  // Generate a random 6-digit OTP code
  const otp = Math.floor(Math.random() * 900000) + 100000;
  const start_time = new Date().getTime();

  // Store the OTP code in the database with the user's email address

  // Check if OTP is valid
  function isValidOTP(otp) {
    // implement OTP validation logic here
  }
  // ...

  // Use an email service provider to send the OTP code to the user's email address
  const email_body = `Your OTP Code is ${otp}. The code is valid for 1 minute.`;
  if (!send_email(user_email, email_body)) {
    return message.CONSTANTS.statusMsg.STATUS_EMAIL_FAIL;
  }

  // Return status code
  return message.CONSTANTS.statusMsg.STATUS_EMAIL_OK;
}

function check_OTP(input) {
  let otp = input.otp;
  let tries = 0;
  const start_time = new Date().getTime();
  const timeout = 60000; // 1 minute timeout

  if (tries < 10) {
    // Check for timeout
    const elapsed_time = new Date().getTime() - start_time;
    if (elapsed_time >= timeout) {
      return message.CONSTANTS.statusMsg.STATUS_OTP_TIMEOUT;
    }

    // Wait for user input
    // try {
    //   otp = await input.readOTP(timeout - elapsed_time);
    // } catch (error) {
    //   // Handle timeout or IO error
    //   return STATUS_OTP_TIMEOUT;
    // }

    // Validate OTP code
    // Retrieve the stored OTP code from the database with the user's email address
    // ...

    //stored_otp = stored_otp(input.email_address);

    stored_otp = "173923";

    if (otp === stored_otp) {
      // OTP is valid
      return message.CONSTANTS.statusMsg.STATUS_OTP_OK;
    } else {
      // OTP is invalid
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

// Send email to the user with the OTP code
function send_email(email_address, email_body) {
  // Implement a function to send email to the user's email address with the OTP code

  console.log(email_address);
  console.log(email_body);

  return true;
}

module.exports = {
  generate_OTP_email,
  check_OTP,
};
