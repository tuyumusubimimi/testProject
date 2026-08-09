<?php
require_once('database.php');

class SqlForLogin extends database{
    private string $id = '';
    private string $password = '';

    function __construct($id, $password){
        parent::__construct();
        $this->id = $id;
        $this->password = $password;
    }

    public function canLogin(){
        try{
            $sql = 'SELECT * FROM login WHERE `login_id` = :login_id AND `password` = :password';
            $stmt = $this->pdo->prepare($sql);
            $stmt->bindValue(':login_id', $this->id, PDO::PARAM_STR);
            $stmt->bindValue(':password', $this->password, PDO::PARAM_STR);
            $stmt->execute();
            return $stmt->fetch(PDO::FETCH_ASSOC);
        }catch(PDOException $e){
            return false;
        }
    }
}
?>