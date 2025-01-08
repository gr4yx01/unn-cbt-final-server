function generateStaffCode() {
    const timestamp = Date.now(); // Get current timestamp in milliseconds
    const random = Math.floor(Math.random() * 10000); // Generate a random 4-digit number
    const code = parseInt(`${timestamp % 100000}${random}`.substring(0, 5)); // Combine and limit to 5 digits
    return code;
  }

  export {
    generateStaffCode
  }