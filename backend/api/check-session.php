<?php
header('Access-Control-Allow-Origin: http://49.212.183.160');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

session_start();
error_log('CHECK SESSION ID: ' . ($_SESSION['id'] ?? 'なし'));
if (isset($_SESSION['id'])) {
    echo json_encode([
        'loggedIn' => true,
        'id' => $_SESSION['id']
    ]);
    exit;
}

echo json_encode([
    'loggedIn' => false
]);