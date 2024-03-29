<?php
    //mindig annak az objektum osztálynak a betöltése történik meg, amelyet használunk (példányosítunk)

    spl_autoload_register(function ($class) {
        include './classes/' . $class . '.class.php';
    });

    //a Route osztályt kell példányosítani, mert ott döntjük el, mit kell megjeleníteni/betölteni/elvégezni:
    $route = new Route($_SERVER['REQUEST_URI']);
    $route->urlRoute();
?>