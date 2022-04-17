<?php
    $src = "https://www.mapquestapi.com/geocoding/v1/address?key=9IiFu65JkkKIRsKgDBcWiBG8Y3FzxDfc&location=";

    
    $sqlacc = file("database.txt", FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    $host = $sqlacc[0];
    $uname = $sqlacc[1];
    $password = $sqlacc[2];
    $dbname = $sqlacc[3];
    $sqlconn = mysqli_connect($host, $uname, $password, $dbname);
    
    $addr = $_GET["addr"];
    $lat = $_GET["lat"];
    $lng = $_GET["lng"];

    if($_GET["action"] == "make"){
        $req = "INSERT INTO `markers`(`lat`, `lng`, `addr`) VALUES (\"$lat\",\"$lng\",\"$addr\")";
        mysqli_query($sqlconn, $req);
        echo $req;
    }else if($_GET["action"] == "remove"){
        $req = "DELETE FROM `markers` WHERE addr == \"$loc\"";
        mysqli_query($sqlconn, $req);
    }else if($_GET["move"]){
        
    }
?>