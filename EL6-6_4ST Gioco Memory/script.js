/* 
1) all’avvio viene mostrata una scacchiera 4x4 (16 carte - 8 coppie) di carte coperte (dorso);
2) il giocatore fa click su una carta e questa viene girata (mostrata la parte frontale);
3) il giocatore fa click su una seconda carta e anche questa viene girata;
4) se le due carte scoperte sono uguali, rimangono scoperte:
5) altrimenti, le carte vengono automaticamente girate;
6) si ripete dal punto 2 finché tutte le carte non sono state scoperte */


var carte = ["images/card1.jpg","images/card2.jpg","images/card3.jpg","images/card4.jpg","images/card5.jpg","images/card6.jpg","images/card7.jpg","images/card8.jpg","images/card1.jpg","images/card2.jpg","images/card3.jpg","images/card4.jpg","images/card5.jpg","images/card6.jpg","images/card7.jpg","images/card8.jpg"];
var carteScoperte = 0;
var winCount = 0;
mescola(carte)

var pulsanti = $("img")



//mescola le carte in modo casuale
function mescola(vettore) {
    var i = vettore.length, j, temp;
    while (--i > 0) {
        j = Math.floor(Math.random() * (i + 1));
        temp = vettore[j];
        vettore[j] = vettore[i];
        vettore[i] = temp;
    }
}

$("img").on('click', function () {

    carteScoperte += 1; // aumena di uno le carte scoperte
    
    //scopri la seconda carta e controlla se le due carte sono uguali in caso ci siano 2 carte scoperte
    if (carteScoperte == 2) {
        posizioneCarta2 = this.id;
        this.src = carte[posizioneCarta2];
        
        setTimeout(function () {
            //se si preme sulla stessa carta si riceve un messaggio di "errore"
            if (posizioneCarta1 == posizioneCarta2) {
                carteScoperte -= 1;
                alert("Attention: You have clicked on the same card twice!");
                return
            }
            //se le due carte sono diverse rigira le due carte e il contatore delle carte scoperte torna a 0
            if (carte[posizioneCarta1] != carte[posizioneCarta2]) {

                pulsanti[posizioneCarta1].style.transform = "rotateY(0)"
                pulsanti[posizioneCarta2].style.transform = "rotateY(0)"
                pulsanti[posizioneCarta1].src = "images/cover-card.jpg";
                pulsanti[posizioneCarta2].src = "images/cover-card.jpg";
                
               
                carteScoperte = 0;
            }
            //se le carte sono uguali lascia le carte girate e aumenta il Win count 
            else {
                $(pulsanti[posizioneCarta1]).addClass("match");
                $(pulsanti[posizioneCarta2]).addClass("match");
                carteScoperte = 0;
                winCount += 1;
                if (winCount === 8) alert("Congratulations! You've won the game! Well done on matching all the cards and completing the challenge. You truly have a great memory and excellent skills. Keep up the fantastic work and enjoy your victory! 🎉🏆")//se si arriva a 8 coppie di carte indovinate si riceve un messaggio di congratulazioni
            }

        }, (900));

    }
    //se ancora non ci sono carte scoperte semplicemente gira la carta premuta
    else if (carteScoperte < 2) {
        posizioneCarta1 = this.id;
        this.src = carte[posizioneCarta1];
    }
    this.style.transform = "rotateY(-180deg)"
}
)

