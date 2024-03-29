<?php
class Mysqldb {

    private $host = "localhost";
    private $user = "root";
    private $pwd = "";
    private $name = "spark";
    private $db;

    private $uzname = "spark_uzenetek";
    private $isname = "spark_ismerosok";
    private $uzenetdb;


    public function __construct(){
            $this->db = new mysqli($this->host,$this->user,$this->pwd, $this->name);
            $this->uzenetdb = new mysqli($this->host,$this->user,$this->pwd, $this->uzname);
            $this->ismerosdb = new mysqli($this->host,$this->user,$this->pwd, $this->isname);
    }


    protected function getData(string $sql){
            $result = $this->db->query($sql);
            if ($this->db->errno == 0){
                if ($result->num_rows != 0){
                    $data = $result->fetch_all(MYSQLI_ASSOC); 
                }
                else {
                    $data = array("uzenet" => "Nincs találat!");
                }      
            }
            else {
                $data = array("uzenet"=>$this->db->error);
            }
        
        return $data;
    }

    protected function getDataUz(string $sql){
        $result = $this->uzenetdb->query($sql);
        if ($this->uzenetdb->errno == 0){
            if ($result->num_rows != 0){
                $data = $result->fetch_all(MYSQLI_ASSOC); 
            }
            else {
                $data = array("uzenet" => "Nincs találat!");
            }      
        }
        else {
            $data = array("uzenet"=>$this->uzenetdb->error);
        }
    
    return $data;
    }
    protected function getDataIs(string $sql){
        $result = $this->ismerosdb->query($sql);
        if ($this->ismerosdb->errno == 0){
            if ($result->num_rows != 0){
                $data = $result->fetch_all(MYSQLI_ASSOC); 
            }
            else {
                $data = array("uzenet" => "Nincs találat!");
            }      
        }
        else {
            $data = array("uzenet"=>$this->uzenetdb->error);
        }
    
    return $data;
    }

    protected function setData($sql){
            $result = $this->db->query($sql);
            if (is_bool($result) && $result){
                $message = array('uzenet'=>'Sikeres művelet!');
                return $message;
            }
            else {
                $message = array('uzenet'=>'Sikertelen művelet!');
                return $message;
            } 
    }
    protected function setDataUz($sql){
        $result = $this->uzenetdb->query($sql);
        if (is_bool($result) && $result){
            $message = array('uzenet'=>'Sikeres művelet!');
            return $message;
        }
        else {
            $message = array('uzenet'=>'Sikertelen művelet!');
            return $message;
        } 
    }
    protected function setDataIs($sql){
        $result = $this->ismerosdb->query($sql);
        if (is_bool($result) && $result){
            $message = array('uzenet'=>'Sikeres művelet!');
            return $message;
        }
        else {
            $message = array('uzenet'=>'Sikertelen művelet!');
            return $message;
        } 
    }
}

?>