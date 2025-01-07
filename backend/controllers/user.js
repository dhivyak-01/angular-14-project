const User = require('../models/user');


const getAllUsers = async (req, res) => {
    try {
      const users = await User.find();  // Fetch all users from the database
      
      // For development purposes, include password in the response
      const usersWithPassword = users.map(user => {
        // Expose the password in plain text (not recommended in production)
        return {
          ...user.toObject(),
          password: user.password  // Include the password
        };
      });
  
      return res.status(200).json(usersWithPassword);  // Return the list of users with password
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "An unexpected error occurred. Please try again later." });
    }
  };




  const deleteUserById = async (req, res) => {
    const { userId } = req.params;
  
    try {
      const user = await User.findByIdAndDelete(userId);
      
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'An unexpected error occurred. Please try again later.' });
    }
  };


 const updateUser = async (req, res) => {
    try {
      const userId = req.params.id;
      const { username, email, phoneNumber, dateOfBirth } = req.body;
  
      // Find and update the user in the database
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { username, email, phoneNumber, dateOfBirth },
        { new: true }  // Return the updated user data
      );
  
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      return res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'An error occurred while updating the user' });
    }
  };

module.exports = { getAllUsers , deleteUserById ,updateUser};  // Export the getAllUsers function

