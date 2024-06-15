const User = require("../models/user.model"); // Import the User model
const { createToken } = require("../utilities/jwt"); // Import the createToken utility function for JWT
const sendEmail = require("../utilities/email.js"); // Import the sendEmail utility function

// Register a new user
const Register = async (req, res) => {
  try {
    // Extract user details from the request body
    const { name, email, password } = req.body;

    // Create a new user in the database
    const user = await User.create({
      name: name,
      email: email,
      password: password,
      favorites: [],
      token: "", // Initialize token as an empty string
    });

    // Define email options for the welcome email
    const option = {
      from: "akashjadhav5974@gmail.com",
      to: email,
      subject: "Welcome to Fandom",
      html: `<h1>Welcome ${name}</h1> 
             <p>Thanks for registering on Fandom</p>
             <p>Now you can login to our platform with your email and password</p>
             <p>Thanks</p>`,
    };

    // Send the welcome email
    sendEmail(option);

    // Send a success response
    return res.status(201).send({ message: "User registered successfully" });
  } catch (error) {
    // Send an error response if registration fails
    return res
      .status(500)
      .send({ message: "Error registering user", error: error.message });
  }
};

// Log in a user
const Login = async (req, res) => {
  try {
    // Extract email and password from the request body
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    // If user not found, send an error response
    if (!user) {
      return res.status(400).send({ message: "Invalid credentials" });
    }

    // Check if the password matches
    const passwordMatch = await user.matchPassword(password);

    // If password does not match, send an error response
    if (!passwordMatch) {
      return res.status(400).send({ message: "Invalid credentials" });
    }

    // Create a JWT token for the user
    const token = createToken({
      id: user._id,
      name: user.name,
      email: user.email,
    });
    console.log(token);

    // Update the token field in the user document
    user.token = token;
    await user.save();

    // Set the token as a cookie in the response
    res.cookie("authToken", token, {
      path: "/",
      expires: new Date(Date.now() + 3600000), // Set cookie expiration time
      secure: true, // Ensure the cookie is sent only over HTTPS
      httpOnly: true, // Ensure the cookie is not accessible via JavaScript
      sameSite: "None", // Allow cross-site requests
    });

    // Send a success response with the token
    return res
      .status(200)
      .send({ message: "User logged in successfully", token });
  } catch (error) {
    // Send an error response if login fails
    return res
      .status(500)
      .send({ message: "Error on logging in", error: error.message });
  }
};

// Log out a user
const Logout = async (req, res) => {
  // Clear the authToken cookie
  res.clearCookie("authToken");

  // Send a success response
  return res.status(200).send({ message: "User logged out successfully" });
};

// Delete a user by ID
const deleteUser = async (req, res) => {
  try {
    // Extract user ID from the request parameters
    const { id } = req.params;

    // Find the user by ID and delete
    const user = await User.findByIdAndDelete(id);

    // If user not found, send an error response
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Send a success response
    return res.status(200).send({ message: "User deleted successfully" });
  } catch (error) {
    // Send an error response if deletion fails
    return res
      .status(404)
      .send({ message: "Error while deleting user", error: error });
  }
};

// Export the functions for use in other parts of the application
module.exports = { Register, Login, Logout, deleteUser };
