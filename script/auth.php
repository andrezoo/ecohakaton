<?php
    session_start();
    if($_GET["check"] == "get"){
        if(!isset($_SESSION["uname"]))
            {echo("NULL");exit();}
        else {echo("You are in");exit();}
    }
    if($_SESSION["uname"] != NULL){
        echo ("ALREADY");
        exit(); //https://remotemysql.com/phpmyadmin/
    }else{
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
        $uname = $_GET["uname"];
        $pwd_hash = $_GET["password"];
        $req = "SELECT COUNT(*) FROM users WHERE name=\"$uname\"";
        $result = mysqli_query($sqlconn, $req);
        if (mysqli_num_rows($result) > 0) {
            // output data of each row
            while($row = mysqli_fetch_assoc($result)) {
                $c = $row["COUNT(*)"];
            }
        } else {
            echo "0 results (count)";
        }
        if($c == 0){
            echo "Username with \"$uname\" is not registrated";
        }else{
            $req = "SELECT * FROM users WHERE name=\"$uname\"";
            $result = mysqli_query($sqlconn, $req);
            if (mysqli_num_rows($result) > 0) {
                // output data of each row
                while($row = mysqli_fetch_assoc($result)) {
                    if( $row["name"] == $uname &&
                        $row["pwd_hash"] == $pwd_hash){
                            $_SESSION['uname'] = $uname;
                            echo "OK";
                            // $_SESSION['access'] = $row["access"];
                    }else{
                        echo "Wrong login or password!";
                    }
                }
            }
        }
        mysqli_close($sqlconn);
    }
?>