<?php
class Common{
    public static function hs($str){
        return htmlspecialchars($str, ENT_QUOTES, 'UTF-8');
    }
}
?>