//Lellenőrzi, hogy a betűtípus betöltött-e.
document.fonts.ready.then(function () {
    if(document.fonts.check('1em skate')){
        console.log("FONT BETÖLTVE")
        document.getElementById('glitch').style.opacity = '1';
        document.getElementById('glitch').style.animationName = 'megjelen';
        document.getElementById('glitch').style.animationDuration = '0.5s';
        document.getElementById('glitch').style.animationFillMode = 'both';
        var audio = new Audio('hangok/2c9uc3_ui-61.wav');
        audio.play();
        var audio = new Audio('hangok/g7hb50_ui-66.wav');
        audio.play();
        
        Promise.all(Array.from(document.images).filter(img => !img.complete).map(img => new Promise(resolve => { img.onload = img.onerror = resolve; }))).then(() => {
            setTimeout(function(){
                document.getElementById('glitch').style.animationName = 'eltunik';
                document.getElementById('glitch').style.animationDuration = '0.5s';
                document.getElementById('glitch').style.animationFillMode = 'both';
                setTimeout(function(){
                    document.getElementById('bejelentkezofelulet').style.animationName = 'megjelen';
                    document.getElementById('bejelentkezofelulet').style.animationDuration = '0.5s';
                    document.getElementById('bejelentkezofelulet').style.animationFillMode = 'both';
                    var audio = new Audio('hangok/y41k76_ui-74.wav');
                    audio.volume = 0.5;
                    audio.play();
                }, 500);
            }, 500);
        });
    }
  });

    var bill = new Audio('hangok/type.wav');
    bill.volume = 0.5;
    bill.preload = 'auto';

    var bill2 = new Audio('hangok/type2.wav');
    bill2.volume = 0.5;
    bill2.preload = 'auto';

    var bill3 = new Audio('hangok/type3.wav');
    bill3.volume = 0.5;
    bill3.preload = 'auto';

function billentyuhang(){
    bill.pause();
    bill.currentTime = 0;
    bill.play();
}

function billentyuhangjelszo(){
    bill2.pause();
    bill2.currentTime = 0;
    bill2.play();
}

function billentyuhangemail(){
    bill3.pause();
    bill3.currentTime = 0;
    bill3.play();
}

function regisztracio_nyit(){
    document.getElementById('bejelentkezofelulet').style.animationName = 'eltunik';
    document.getElementById('bejelentkezofelulet').style.animationDuration = '0.2s';
    document.getElementById('bejelentkezofelulet').style.animationDelay = '0s';
    document.getElementById('bejelentkezofelulet').style.animationFillMode = 'both';
    document.getElementById('regisztraciofelulet').style.animationName = 'megjelen';
    document.getElementById('regisztraciofelulet').style.animationDuration = '0.2s';
    document.getElementById('regisztraciofelulet').style.animationDelay = '0.5s';
    document.getElementById('regisztraciofelulet').style.animationFillMode = 'both';
    setTimeout(function(){
        var audio = new Audio('hangok/reg.mp3');
        audio.play();
    }, 200);
}
function regisztracio_vissza(){
    document.getElementById('regisztraciofelulet').style.animationName = 'eltunik';
    document.getElementById('regisztraciofelulet').style.animationDuration = '0.2s';
    document.getElementById('regisztraciofelulet').style.animationDelay = '0s';
    document.getElementById('regisztraciofelulet').style.animationFillMode = 'both';
    document.getElementById('bejelentkezofelulet').style.animationName = 'megjelen';
    document.getElementById('bejelentkezofelulet').style.animationDuration = '0.2s';
    document.getElementById('bejelentkezofelulet').style.animationDelay = '0.5s';
    document.getElementById('bejelentkezofelulet').style.animationFillMode = 'both';
    setTimeout(function(){
        var audio = new Audio('hangok/y41k76_ui-74.wav');
        audio.play();
    }, 500);
}

function bejelentkezes(){
    let felhasznalonev = document.getElementById('felhasznalonev').value;
    let jelszo = document.getElementById('jelszo').value;
    
    if(felhasznalonev == "" || jelszo == ""){
        hiba("Hiba!", "Hiányosak a megadott adatok!")
    }
    else{
        let kuld = {
            'nev' : felhasznalonev,
            'jelszo' : jelszo,
        };
        bejelentkez(kuld);
    }   
}

async function bejelentkez(adat){
    try {
        let keres = await fetch('./php/index.php/bejelentkezes', {
            method : 'POST',
            body : JSON.stringify(adat)
        });
        let valasz = await keres.json();
        if(valasz.uzenet=='nemjo'){
            hiba("Hiba!", "Hibás felhasználónév/Jelszó!");
        }
        else if(valasz.uzenet=='kesz'){
            var nev = valasz.nev;
            document.getElementById('bejelentkezo').style.animationName = 'eltunik';
            document.getElementById('bejelentkezo').style.animationDuration = '0.2s';
            document.getElementById('bejelentkezo').style.animationDelay = '0s';
            document.getElementById('bejelentkezo').style.animationFillMode = 'both';
            setTimeout(function(){
                document.getElementById('bejelentkezofelulet').style.animationName = 'eltunik';
                document.getElementById('bejelentkezofelulet').style.animationDuration = '0.5s';
                document.getElementById('bejelentkezofelulet').style.animationFillMode = 'both';
                setTimeout(function(){
                    window.location.href = "felulet";
                    document.title = `Spark | ${valasz.nev}`;
                }, 200)
            }, 200)
        }
    } catch (error) {
        console.log(error);
    }
}

function regisztracio(){
    let felhasznalonev = document.getElementById('felhasznalonevreg').value;
    let jelszo = document.getElementById('jelszoreg').value;
    let email = document.getElementById('emailreg').value;
    
    if(felhasznalonev == "" || jelszo == "" || email == ""){
        hiba("Hiba!", "Hiányosak a megadott adatok!")
    }
    else{
        let kuld = {
            'nev' : felhasznalonev,
            'jelszo' : jelszo,
            'email' : email
        };
        reg(kuld);
    }    
}

async function reg(adat){
    try {
        let keres = await fetch('./php/index.php/regisztracio', {
            method : 'POST',
            body : JSON.stringify(adat)
        });
        let valasz = await keres.json();
        if(valasz.uzenet=='foglalt'){
            hiba("Hiba!", "Foglalt a felhasználónév / email cím!");
        }
        else if(valasz.uzenet=='kesz'){
            sikeres("Sikeres regisztráció!", "Most már be tudsz jelentkezni!");
            document.getElementById('felhasznalonevreg').value = "";
            document.getElementById('jelszoreg').value = "";
            document.getElementById('emailreg').value = "";
        }
    } catch (error) {
        console.log(error);
    }
}

document.getElementById("regisztracioat").addEventListener('click',regisztracio_nyit);
document.getElementById("regvissza").addEventListener('click',regisztracio_vissza);
document.getElementById("bejelentkezes").addEventListener('click',bejelentkezes);
document.getElementById("regisztraciooke").addEventListener('click',regisztracio);