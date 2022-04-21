<?php session_start(); if(!isset($_SESSION['uname'])) header("Location: /"); ?>
<html>
    <head>
        <title>Kazecotech</title>
        <link rel="stylesheet" type="text/css" href="css/bootstrap.css">
        <link rel="stylesheet" type="text/css" href="css/font-awesome.css">
        <link rel="stylesheet" type="text/css" href="css/style.css">

        <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@500&display=swap" rel="stylesheet">

        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="description" content=""> 
        
    </head>
    <body>

        <!-- UPPERHEADER -->
        <header class="w-75 align-self-center darken fixed-top p-lg-3 justify-content-between d-flex header bg-white">
            <div><a><img id="icon" src="img/favicon.png" width="60px"></a></div>
            
            <div class="d-inline-block al-center al-cc">
            </div>

            <div class="d-inline-block al-center al-rr">
                <a href="/" style="margin-right: 20px"><img src="img/log-in-outline.svg" width="30px"></a>
            </div>

        </header>

        <section class="unreachable">
            <div id="contextmenu" class="position-absolute fixed-top"><a id="c-move">Переместить</a><hr><a id="c-remove">Удалить</a></div>
            <div id="contextcreate" class="position-absolute fixed-top"><a id="c-create">Добавить маркер</a></div>
            <div id="contextaddr" class="position-absolute fixed-top"><a id="c-addr">Какое название улицы?<br></a><input id="c-input"><button id="c-inputbtn">Создать</button></div>
        </section>
        
        <!--<section style="margin-bottom: 2vh" class="fixed-bottom w-75 align-self-center darken p-lg-3 justify-content-between d-flex header bg-white">
            <div class="w-100 d-flex justify-conten-between" style="padding: 1% 5%">
                <input name="street" style="padding: 1%; width:80%; border-radius: 15px" placeholder="Введите название улицы">
                <input id="create" value="Создать" style="padding: 1%; width:15%; margin-left: 5%; border-radius: 15px" type="button">
            </div>
        </section>!-->

        <section class="w-100 fixed-top bg-white" style="z-index: 1">
            <div id="map"></div>
        </section>
        
        <script src="js/loader.js"></script>
        <script src="js/control.js"></script>
        
    </body>
</html>