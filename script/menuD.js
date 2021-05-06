var tableau = [-1, -1]; // Tableau stockant les deux site à comparer (utiliser uniquement la première case si un seul site)

//var data = []; // tableau qui va stocker pour chaque nom de site le site entier associé 

var form1 = document.getElementById("site1");
var form2 = document.getElementById("site2");

var centre = document.getElementById("centre"); 
var gauche = document.getElementById("gauche");
var droite = document.getElementById("droite");


function load(){
    sites.forEach( site => {
        let nouveauSite = document.createElement("option");
        nouveauSite.textContent = site.nom;
        let nouveauSite2 = nouveauSite.cloneNode(true);
    
        form1.appendChild(nouveauSite);
        form2.appendChild(nouveauSite2);
    });
}


function menuClick(choix, num){
    //tableau[num] = choix.options[choix.selectedIndex].text;
    tableau[num] = choix.selectedIndex - 1;
    majAff();
}


function bougerEnfant(nomEnfant, nomPere){
    console.log("nom enfant: "+ nomEnfant);
    if(nomPere == "centre"){
        centre.appendChild(document.getElementById(nomEnfant));
    }
    else if(nomPere == "gauche"){
        gauche.appendChild(document.getElementById(nomEnfant));
    }
    else if(nomPere == "droite"){
        droite.appendChild(document.getElementById(nomEnfant));
    }     
}

function majAff(){
    let res = lireTableau();
    let nb = res[0];
    let id = res[1];

    //console.log("lireTableau:", lireTableau());
    //console.log("'vraie' longueur du tableau:", nb);

    centre.innerHTML = "";
    gauche.innerHTML = "";
    droite.innerHTML = "";

    if (nb === 2){ // 2 sites de sélectionné -> vider centre
        gauche.innerHTML = "<h1>" + sites[tableau[0]].nom + "</h1>";
        //stats(chercheCouple(tableau[0]), "gauche");
        stats(tableau[0], "gauche");
        bougerEnfant(tableau[0] + " " + sites[tableau[0]].nom + " horaires canvas div", "gauche");
        bougerEnfant(tableau[0] + " " + sites[tableau[0]].nom + " info div", "gauche");

        droite.innerHTML = "<h1>" + sites[tableau[1]].nom + "</h1>";
        //stats(chercheCouple(tableau[1]), "droite");
        stats(tableau[1], "droite");
        bougerEnfant(tableau[1] + " " + sites[tableau[1]].nom + " horaires canvas div", "droite");
        bougerEnfant(tableau[1] + " " + sites[tableau[1]].nom + " info div", "droite");
    }
    else if (nb === 1){ // 1 sites de selectionné -> vider gauche / droite
        centre.innerHTML = "<h1>" + sites[tableau[id]].nom + "</h1>";
        //stats(chercheCouple(tableau[id]), "centre");
        stats(tableau[id], "centre");
        bougerEnfant(tableau[id] + " " + sites[tableau[id]].nom + " horaires canvas div", "centre");
        bougerEnfant(tableau[id] + " " + sites[tableau[id]].nom + " info div", "centre");

        gauche.innerHTML = "";
    
        droite.innerHTML = "";
    }
}


function lireTableau(){
    let nb = 0; // donne le nombre de cases contenant des infos utiles
    let id = 0; // donne la case du tableau utile pour affichage centre

    //if (tableau[0] !== "-- choisissez un site --" && tableau[0] !== undefined){
    if (tableau[0] !== -1){
        nb = 1;
    }
    //if (tableau[1] !== "-- choisissez un site --" && tableau[1] !== undefined){
    if (tableau[1] !== -1){
        nb = nb + 1;
        id = 1;
    }
    if (tableau[0] === tableau[1]){
        nb = nb - 1;
    }
    return [nb, id];
}
/*
function chercheCouple(nom){
    for(let i=0; i<data.length; i++) {
        let couple = data[i];
        if (couple[0] == nom){
            return couple[1];
        }
    }
    console.log("Erreur lors de la recherche de couple!")
    return data[0][1];
}
*/