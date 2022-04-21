<?php
    session_start();
    $src = "https://www.mapquestapi.com/geocoding/v1/address?key=9IiFu65JkkKIRsKgDBcWiBG8Y3FzxDfc&location=";

    if(!isset($_SESSION["uname"])){
        header("/");
    }
    
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
        $req = "DELETE FROM `markers` WHERE lat == \"$loc\"";
        mysqli_query($sqlconn, $req);
    }else if($_GET["action"] == "move"){
        $addr1 = $_GET["addrTo"];
        $lat1 = $_GET["latTo"];
        $lng1 = $_GET["lngTo"];
        $sqlreq = `UPDATE markers SET lat = ${lat1}, lng = ${lng1}, addr = ${addr1} WHERE lat = ${lat} AND lng = ${lng} AND addr = ${addr}`;
    }else if($_GET["cation"] == "find"){
        echo(file_get_contents($src . $addr));
    }
?>