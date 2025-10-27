<?php
// Salida de usuario de la página web
session_start();
session_unset();
session_destroy();
header("Location: login.php");
exit;
?>