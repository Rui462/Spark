<?php
    SESSION_START();
    function randomid($length = 30) {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[random_int(0, $charactersLength - 1)];
    }
    return $randomString;

}
class Query extends Mysqldb
{
    public function regisztral($nev, $jelszo, $email)
    {
        $kodolostr = "sparkJelszoKod";

        $jelszo = hash_hmac('sha256', $jelszo, $kodolostr);

        $sql = "SELECT * FROM felhasznalok WHERE email='$email' OR nev='$nev'";
        $adatok = $this->getData($sql);

        if(isset($adatok['uzenet'])){
             $sql = "INSERT INTO `felhasznalok`(`nev`, `jelszo`, `email`, `tiltas`, `tiltasindok`) VALUES ('$nev','$jelszo','$email','0','')";
             $this->setData($sql); 

             $sql = "CREATE TABLE $nev (
                    ismerosok text
                );";
            $this->setDataIs($sql); 

             $uz = array('uzenet' => 'kesz');
         }
         else{
             $uz = array('uzenet' => "foglalt");
         }
        
        return json_encode($uz, JSON_UNESCAPED_UNICODE);

    }
    public function bejelentkezes($nev, $jelszo)
    {
        $kodolostr = "sparkJelszoKod";

        $jelszo = hash_hmac('sha256', $jelszo, $kodolostr);

        $sql = "SELECT * FROM felhasznalok WHERE nev='$nev'";
        $adatok = $this->getData($sql);

        if(isset($adatok['uzenet'])){
            $uz = array('uzenet' => "nemjo");
         }
         else{
             if($adatok[0]['jelszo']==$jelszo){
                $uz = array('uzenet' => 'kesz', 'nev' => $adatok[0]['nev']);
                $_SESSION["nev"] = $adatok[0]['nev'];
            }
             else{
                $uz = array('uzenet' => "nemjo");
             }
         }

        return json_encode($uz, JSON_UNESCAPED_UNICODE);

    }
    public function emberlistazas()
    {
        $nev = $_SESSION["nev"];
        $sql = "SELECT * FROM uzenetek WHERE felhasznaloid_egy='$nev' OR felhasznaloid_ketto='$nev'";
        $talaltak = $this->getDataUz($sql);

        $uz = array('valasz' => $talaltak, 'nev' => $nev);
        return json_encode($uz, JSON_UNESCAPED_UNICODE);
    }
    public function felhasznalokeres($nevkeres)
    {
        $nev = $_SESSION['nev'];
        $sql = "SELECT nev FROM felhasznalok WHERE nev='$nevkeres'";
        $talalatfelhasznalo = $this->getData($sql);

        if($nev!=$nevkeres){
            if(isset($talalatfelhasznalo['uzenet'])){
                $uzenet = array('uzenet' => 'nincsilyen');
            }
            else{
                $sql = "SELECT ismerosok FROM $nev WHERE ismerosok='$nevkeres'";
                $talalat = $this->getDataIs($sql);

                if(isset($talalat['uzenet'])){
                    $sql = "SELECT ismerosok FROM $nevkeres WHERE ismerosok='$nev'";
                    $talalatmasik = $this->getDataIs($sql);
                    if(isset($talalatmasik['uzenet'])){ //Ha másik oldalról nincs találat
                        $sql = "INSERT INTO $nev(ismerosok) VALUES ('$nevkeres');";
                        $this->setDataIs($sql);
                        $uzenet = array('uzenet' => 'sikerkuldve');
                    }
                    else{ //Ha másik oldal már küldött meghívót
                        $sql = "INSERT INTO $nev(ismerosok) VALUES ('$nevkeres');";
                        $this->setDataIs($sql);  

                        $random = randomid();

                        $sql = "INSERT INTO uzenetek(uzenetid, felhasznaloid_egy, felhasznaloid_ketto) VALUES ('$random','$nev','$nevkeres');";
                        $this->setDataUz($sql);
                        $sql = "CREATE TABLE $random(
                            nev text,
                            uzenet text,
                            mikor datetime
                            );";
                        $this->setDataUz($sql);
                        $uzenet = array('uzenet' => 'sikerkapva');
                    }
                }
                else{
                    $uzenet = array('uzenet' => 'marvan');
                }
            }     
        }
        else{
            $uzenet = array('uzenet' => 'nincsilyen');
        }
        
        return json_encode($uzenet, JSON_UNESCAPED_UNICODE);
    }
    public function chatmegnyitas($id)
    {
        $sql = "SELECT * FROM $id";
        $uzenetek = $this -> getDataUz($sql);
        $sql = "SELECT * FROM uzenetek WHERE uzenetid='$id'";
        $adatok = $this -> getDataUz($sql);

        if($adatok[0]['felhasznaloid_egy']==$_SESSION["nev"]){
            $kinev = $adatok[0]['felhasznaloid_ketto'];
        }
        else{
            $kinev = $adatok[0]['felhasznaloid_egy'];
        }

        $uz = array('uzenetek' => $uzenetek, 'kinev' => $kinev);

        return json_encode($uz,JSON_UNESCAPED_UNICODE);
    }
    public function uzenetkuld($uzenet, $id)
    {
        $nev = $_SESSION["nev"];
        $mikor = date("Y-m-d H:i:s");
        $sql = "INSERT INTO `$id`(`nev`, `uzenet`, `mikor`) VALUES ('$nev','$uzenet','$mikor')";
        $this -> setDataUz($sql);
    }
    public function uzenetcheck($id, $elozodb)
    {
        $nev = $_SESSION["nev"];
        $sql = "SELECT * FROM $id WHERE NOT nev='$nev'";
        $talalatok = $this -> getDataUz($sql);

        if(count($talalatok)==$elozodb){
            $uz = array('valasz' => 'nincsuj');
        }
        else{
            $kulonbseg = count($talalatok)-intval($elozodb);
            $ujak = array();
            if($kulonbseg!=0){
                for($i=intval($elozodb); $i<count($talalatok); $i++){
                    array_push($ujak,$talalatok[$i]);
                }
            $uz = array('valasz' => $ujak, 'db' => count($talalatok));
            }
            else{
                $uz = array('valasz' => "nincsuj");
            }
        }

        return json_encode($uz, JSON_UNESCAPED_UNICODE);
    }
}
