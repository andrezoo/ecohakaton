<?php
    //Production DataBase
    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
    $sqlacc = file("database.txt", FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    $host = $sqlacc[0];
    $uname = $sqlacc[1];
    $password = $sqlacc[2];
    $dbname = $sqlacc[3];
    $sqlconn = mysqli_connect($host, $uname, $password, $dbname);
    $newscount = 0;
    if(!$sqlconn){
        echo ("ERROR");
    }

    $request = "SELECT * FROM markers WHERE (lat < (" . $_GET["lat"] . "+" . $_GET["range"] . ") AND lat > (" . $_GET["lat"] . "-" . $_GET["range"] . ") AND lng < (" . $_GET["lng"] . "+" . $_GET["range"] . ") AND lng > (" . $_GET["lng"] . "-" . $_GET["range"] . "))";
    $result = mysqli_query($sqlconn, $request);
    while($row = mysqli_fetch_assoc($result)) {
        echo($row['addr']."\r".$row['lat']."\r".$row['lng']."\n");
        // echo "YEP";
    }
    mysqli_close($sqlconn);
?>