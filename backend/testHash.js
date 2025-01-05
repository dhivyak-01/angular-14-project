const bcrypt = require('bcryptjs');

const plainTextPassword = 'newAdmin123';  // The password provided by the user
const hashedPasswordFromDB = '$2a$10$nkdC4u.FLWRPKAKajYdmku30PWb7FB45rvARzLLATeIHSMJG6fYO6';  // The stored hash from your DB

bcrypt.compare(plainTextPassword, hashedPasswordFromDB)
  .then(isMatch => {
    console.log('Password match:', isMatch);  // Will print `true` if the password is correct
  })
  .catch(error => {
    console.log('Error comparing passwords:', error);
  });
