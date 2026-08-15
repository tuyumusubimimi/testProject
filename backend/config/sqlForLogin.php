<?php
require_once('database.php');
require_once('../common.php');

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
            $sql = 'SELECT * FROM login WHERE `login_id` = :login_id';
            $stmt = $this->pdo->prepare($sql);
            $stmt->bindValue(':login_id', $this->id, PDO::PARAM_STR);
            $stmt->execute();
            $loginInfo = $stmt->fetch(PDO::FETCH_ASSOC);
            return password_verify($this->password, $loginInfo['password']);
        }catch(PDOException $e){  
            return false;
        }
    }
}
?>