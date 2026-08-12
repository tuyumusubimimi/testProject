<?php
class database{
    protected PDO $pdo;

    function __construct(){
        $this->db_connect();
    }

    private function db_connect(){
        try {
            $host = getenv('DB_HOST');
            $dbname = getenv('DB_NAME');
            $username = getenv('DB_USER');
            $password = getenv('DB_PASSWORD');

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