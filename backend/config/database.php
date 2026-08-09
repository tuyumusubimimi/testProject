<?php
class database{
    protected PDO $pdo;

    function __construct(){
        $this->db_connect();
    }

    private function db_connect(){
        try {
            $host = 'database';
            $dbname = 'myapp';
            $username = 'myapp';
            $password = 'mypassword';

            $this->pdo = new PDO(
                "mysql:host=$host;dbname=$dbname;charset=utf8mb4",
                $username,
                $password
            );

            $this->pdo->setAttribute(
                PDO::ATTR_ERRMODE,
                PDO::ERRMODE_EXCEPTION
            );
        } catch (PDOException $e) {
            die('Database connection failed: ' . $e->getMessage());
        }
    }
}
?>