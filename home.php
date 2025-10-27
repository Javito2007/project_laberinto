<?php
// home.php
session_start();

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FLAG</title>
    <link rel="icon" type="image/jpg" href="css/icon.png">
    <link rel="stylesheet" href="css/home.css">
    <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
</head>
<body>
    <header>
        <img src="css/Logo.png" width="220px" alt="Bienvenido" class="welcome-img">
        <a href="logout.php" class="logout">Logout</a>
    </header>
    <main>
        <button onclick="window.location.href='project_laberinto/index.html'" class="game-button">
            JUGAR
        </button>
        <button onclick="window.location.href='manual.html'" class="game-button">
            ¿COMO JUGAR?
        </button>
    </main>
</body>
</html>