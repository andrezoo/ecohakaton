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

        <section class="w-100 h-auto position-absolute" style="min-height: 100vh" active="true" name="about">
            <div style="margin-bottom: 40px; min-height: 80vh" class="w-25 workspace loginspace">
                <form class="d-block auth p-5 pt-md-5 pb">
                    <h1>Авторизация</h1>
                    <input placeholder="Логин/Почта" name="uname"><br>
                    <input type="password" class="" placeholder="Пароль" name="password">
                    <input style="background: rgb(234,234,234) !important" type="button" value="Войти">
                </form>
            </div>
        </section>
        
        <!-- UPPERHEADER -->
        <header class="w-75 align-self-center darken fixed-top p-lg-3 justify-content-between d-flex header bg-white">
            <div><a><img id="icon" src="img/favicon.png" width="60px"></a></div>
            
            <div class="d-inline-block al-center al-cc">
            </div>

            <div class="d-inline-block al-center al-rr">
                <a href="/" style="margin-right: 20px"><img src="img/log-in-outline.svg" width="30px"></a>
            </div>

        </header>

        <section class="w-100 fixed-top bg-white" style="z-index: 1">
            <div id="map"></div>
        </section>
        
        <script src="js/loader.js"></script>
        <script src="js/admin.js"></script>
        
    </body>
</html>