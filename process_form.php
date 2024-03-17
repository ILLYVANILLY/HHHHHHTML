<?php

//header("Access-Control-Allow-Origin: *");
//header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
//header("Access-Control-Allow-Headers: Content-Type");

// Assuming $username and $password are the input from the login form

// Establish a connection to the database
$conn = new mysqli('localhost', 'root', 'your_password', 'flappycat');

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Prepare a SQL statement to retrieve the user's information based on the provided username
$stmt = $conn->prepare("SELECT id, username, password FROM userpassword WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

// Check if a row with the provided username exists in the database
if ($result->num_rows == 1) {
    // Fetch the row
    $row = $result->fetch_assoc();

    // Verify the provided password against the hashed password stored in the database
    if (password_verify($password, $row['password'])) {
        // Password is correct
        // Set session variables or redirect the user to the dashboard
        session_start();
        $_SESSION['user_id'] = $row['id'];
        $_SESSION['username'] = $row['username'];
        echo json_encode("yay")
        exit();
    } else {
        // Password is incorrect
        // Display an error message or redirect the user back to the login page
        echo json_encode("Incorrect password");
    }
} else {
    // Username not found
    // Display an error message or redirect the user back to the login page
    echo json_encode("User not found");
}

// Close the statement and the database connection
$stmt->close();
$conn->close();
?>
