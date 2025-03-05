<?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // kunin yung values ng mga input fields, if may laman, kunin yung value, else, empty string
        
        $userId = isset($_POST["userId"]) ? $_POST["userId"] : '';
        $fName = isset($_POST["fName"]) ? $_POST["fName"] : '';
        $lName = isset($_POST['lName']) ? $_POST["lName"] : '';
        $surname = isset($_POST["lName"]) ? strtoupper(string: $_POST["lName"]) : ''; // kunin then i-uppercase
        $gender = isset($_POST["genderOpt"]) ? $_POST["genderOpt"] : ''; 
        $age = isset($_POST["age"]) ? $_POST["age"] : '';
        $address = isset($_POST['address']) ? $_POST['address'] : '';

        $section = "Unknown";  //default value 

        if (!empty($surname) && !empty($fName)) {
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

        $genderText = ($gender == 3) ? "Male" : "Female";
        
        $response["section"] = $section;
        $response["message"] = "You belong to $section";
        $response["summary"] = [
            "Name" => "$fName $lName",
            "Gender" => $genderText,
            "Age" => $age,
            "Address" => $address
        ];

        echo json_encode($response);
        exit;
    }
?>