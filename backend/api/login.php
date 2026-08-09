<?php

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: POST, OPTIONS');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);

    echo json_encode([
        'success' => false,
        'message' => 'POSTメソッドで送信してください'
    ]);

    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

$id = $data['id'] ?? '';
$password = $data['password'] ?? '';

if ($id === '' || $password === '') {
    http_response_code(400);

    echo json_encode([
        'success' => false,
        'message' => 'IDとパスワードを入力してください'
    ]);

    exit;
}

echo json_encode([
    'success' => true,
    'message' => 'データを受け取りました',
    'data' => [
        'id' => $id,
        'password' => $password
    ]
]);