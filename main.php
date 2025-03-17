<?php
session_start();

function AddUserData($id, $firstName, $lastName, $gender, $age, $address, &$section)
{
    if (!isset($_SESSION["users"])) {
        $_SESSION["users"] = []; // create array if not exists
    }

    // check duplicate ID
    foreach ($_SESSION["users"] as $user) {
        if ($user["id"] == $id) {
            return ["status" => "error", "message" => "User ID already exists! Edit or delete it."];
        }
    }

    // section validation using gender and surname
    $surname = strtoupper($lastName);
    $section = "Unknown"; // default

    if (!empty($surname) && !empty($firstName)) {
        $firstLetter = $surname[0];
        $surnameGroup = ($firstLetter >= 'A' && $firstLetter <= 'M') ? 1 : 2;

        if ($surnameGroup == 1 && $gender == "3") {
            $section = "Class A";
        } elseif ($surnameGroup == 2 && $gender == "4") {
            $section = "Class B";
        } elseif ($surnameGroup == 2 && $gender == "3") {
            $section = "Class C";
        } elseif ($surnameGroup == 1 && $gender == "4") {
            $section = "Class D";
        }
    }

    $genderText = ($gender == "3") ? "Male" : "Female";

    // Add user to session storage
    $newUser = [
        "id" => $id,
        "Name" => "$firstName $lastName",
        "Gender" => $genderText,
        "Age" => $age,
        "Address" => $address,
        "Section" => $section
    ];
    
    $_SESSION["users"][] = $newUser;
    return ["status" => "success", "message" => "User added successfully!", "section" => $section, "summary" => $newUser];
}

// Handle form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $userId = isset($_POST["userId"]) ? trim($_POST["userId"]) : '';
    $fName = isset($_POST["fName"]) ? trim($_POST["fName"]) : '';
    $lName = isset($_POST["lName"]) ? trim($_POST["lName"]) : '';
    $gender = isset($_POST["genderOpt"]) ? $_POST["genderOpt"] : '';
    $age = isset($_POST["age"]) ? trim($_POST["age"]) : '';
    $address = isset($_POST["address"]) ? trim($_POST["address"]) : '';
    $section = "";

    $result = AddUserData($userId, $fName, $lName, $gender, $age, $address, $section);
    session_destroy();
    echo json_encode($result);
    exit;
}
?>
