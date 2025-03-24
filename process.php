<?php
class userManager {
    public function addUserData($id, $firstName, $lastName, $gender, $age, $address, &$section) {
        if (!isset($_SESSION["users"])) {
            $_SESSION["users"] = []; // create array if not exists
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
}
?>
