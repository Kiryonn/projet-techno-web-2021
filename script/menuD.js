var tableau = [undefined, undefined]; // Tableau stockant les deux site à comparer (utiliser uniquement la première case si un seul site)

var data = []; // tableau qui va stocker pour chaque nom de site le site entier associé 

var form1 = document.getElementById("site1");
var form2 = document.getElementById("site2");

var centre = document.getElementById("centre"); 
var gauche = document.getElementById("gauche");
var droite = document.getElementById("droite");

sites.forEach( site => {
    data.push([site.nom, site]);

    let nouveauSite = document.createElement("option");
    nouveauSite.textContent = site.nom;
    let nouveauSite2 = nouveauSite.cloneNode(true);

    form1.appendChild(nouveauSite);
    form2.appendChild(nouveauSite2);
    //console.log("nom nouveau site: " + site.nom);
    //console.log("ajout de " + nouveauSite);
});

function menuClick(choix, num){
    //console.log("menu", num, ":",  choix.options[choix.selectedIndex].text);
    tableau[num] = choix.options[choix.selectedIndex].text;
    //console.log(tableau);
    majAff();
}

function bougerEnfant(nomEnfant, nomPere){
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
        gauche.innerHTML = "<h1>" + tableau[0] + "</h1>";
        stats(chercheCouple(tableau[0]), "gauche");
        bougerEnfant(tableau[0] + " horaires canvas div", "gauche");
        bougerEnfant(tableau[0] + " info div", "gauche");

        droite.innerHTML = "<h1>" + tableau[1] + "</h1>";
        stats(chercheCouple(tableau[1]), "droite");
        bougerEnfant(tableau[1] + " horaires canvas div", "droite");
        bougerEnfant(tableau[1] + " info div", "droite");
    }
    else if (nb === 1){ // 1 sites de selectionné -> vider gauche / droite
        centre.innerHTML = "<h1>" + tableau[id] + "</h1>";
        stats(chercheCouple(tableau[id]), "centre");
        bougerEnfant(tableau[id] + " horaires canvas div", "centre");
        bougerEnfant(tableau[id] + " info div", "centre");

        gauche.innerHTML = "";
    
        droite.innerHTML = "";
    }
}


function lireTableau(){
    let nb = 0; // donne le nombre de cases contenant des infos utiles
    let id = 0; // donne la case du tableau utile pour affichage centre

    if (tableau[0] !== "-- choisissez un site --" && tableau[0] !== undefined){
        nb = 1;
    }
    if (tableau[1] !== "-- choisissez un site --" && tableau[1] !== undefined){
        nb = nb + 1;
        id = 1;
    }
    if (tableau[0] === tableau[1]){
        nb = nb - 1;
    }
    return [nb, id];
}

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