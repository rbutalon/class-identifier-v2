<?php
session_start();
require_once "process.php"; // require instead of include since main function is in that file

// create instance of UserManager class
$userManager = new userManager();

// handle POST request to add user, create user object and return JSON response
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $userId = isset($_POST["userId"]) ? trim($_POST["userId"]) : '';
    $fName = isset($_POST["fName"]) ? trim($_POST["fName"]) : '';
    $lName = isset($_POST["lName"]) ? trim($_POST["lName"]) : '';
    $gender = isset($_POST["genderOpt"]) ? $_POST["genderOpt"] : '';
    $age = isset($_POST["age"]) ? trim($_POST["age"]) : '';
    $address = isset($_POST["address"]) ? trim($_POST["address"]) : '';
    $section = "";

    // Call the method using the object
    $result = $userManager->addUserData($userId, $fName, $lName, $gender, $age, $address, $section); 
    
    echo json_encode($result);
    exit;
}
?>
