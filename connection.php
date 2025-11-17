<?php
// Database configuration
$servername = "localhost";
$username = "root";
$password = "";
$database = "mwamunda";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["error" => "Database connection failed: " . $conn->connect_error]));
}

// Set charset to UTF-8
$conn->set_charset("utf8");
?>
