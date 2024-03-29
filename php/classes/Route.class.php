<?php
class Route
{
    private $teljesUrl;
    private $url;
    private $erkezettAdatok;
    private $eleres;

    public function __construct($adottUrl)
    {
        $this->teljesUrl = $adottUrl;
        $this->url = explode('/',$this->teljesUrl);
        $this->erkezettAdatok = json_decode(file_get_contents('php://input'),false);
        $this->eleres = 'content/';
    }

    public function urlRoute()
    {
        switch (end($this->url))
        {
            case 'regisztracio' :
                $user = new Query();
                echo $user->regisztral(                    
                    $this->erkezettAdatok->nev, 
                    $this->erkezettAdatok->jelszo, 
                    $this->erkezettAdatok->email
                );
                break;
            case 'bejelentkezes' :
                $user = new Query();
                echo $user->bejelentkezes(                    
                    $this->erkezettAdatok->nev, 
                    $this->erkezettAdatok->jelszo
                );
                break;
            case 'felhasznalokeres' :
                $user = new Query();
                echo $user->felhasznalokeres(                    
                    $this->erkezettAdatok->nevkeres
                );
                break;
            case 'emberlistazas' :
                $user = new Query();
                echo $user->emberlistazas();
                break;
            case 'chatmegnyitas' :
                $user = new Query();
                echo $user->chatmegnyitas(
                    $this -> erkezettAdatok -> id
                );
                break;
            case 'uzenetkuld' :
                $user = new Query();
                echo $user->uzenetkuld(
                    $this -> erkezettAdatok -> uzenet,
                    $this -> erkezettAdatok -> id
                );
                break;
            case 'uzenetcheck' :
                $user = new Query();
                echo $user->uzenetcheck(
                    $this -> erkezettAdatok -> id,
                    $this -> erkezettAdatok -> db
                );
                break;
        }
    }
}
?>