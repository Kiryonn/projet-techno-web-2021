var nomG;

function createCanvas(nom, longueur, hauteur){
  let canvas = document.createElement('canvas');
  canvas.id = nom;
  canvas.width = longueur;
  canvas.height = hauteur;

  let div = document.createElement('div');
  div.id = nom + " div";

  document.body.appendChild(div);
  document.getElementById(div.id).appendChild(canvas);
}

function label(nom, msg, x, y){
  let canvas = document.getElementById(nom);
  let ctx = canvas.getContext("2d");
  ctx.font = "0.7em Arial";
  ctx.fillStyle = "black"
  ctx.fillText(msg, x-20, y+5);
}

function dessinRectangle(nom, x, y, largueur, hauteur, rgba){
  let canvas = document.getElementById(nom);
  let ctx = canvas.getContext("2d");
  ctx.beginPath ();
  ctx.lineWidth = 2;
  ctx.fillStyle = rgba;
  ctx.fillRect (x, y, largueur, hauteur);
  ctx.stroke ();
}

function createHoraires(nom, largueur, hauteur, tabHoraires){
  createCanvas(nom, largueur, hauteur);
  let jours = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
  let h = ["7h", "8h", "9h", "10h", "11h", "12h", "13h", "14h", "15h", "16h", "17h", "18h"]; // préférable d'utiliser cet affichage pour l'heure, plus lisible sur petit schéma.
  let canvas = document.getElementById(nom);
  let hor = tabHoraires;
  console.log("horaires: " + hor);
  dessinRectangle(nom, 0, 0, canvas.width, canvas.height, 'rgba(50, 50, 50, 0.3)');

  for (let i=1; i<8; i++){
    label(nom, jours[i-1], (1/21)*canvas.width + (2/100)*canvas.width, ((i/7)*(9/10)*canvas.height) - ((1/20)*canvas.height) );
    dessinRectangle(nom, 0, ((i/7)*(9/10)*canvas.height), canvas.width, 1, 'rgba(0, 0, 0, 0, 1)');
  }

  for (let i=1; i<13; i++){
    dessinRectangle(nom, (i/13)*canvas.width, 0, 1, ((19/20)*canvas.height)-((1/30)*canvas.height), 'rgba(0, 0, 0, 0, 1)');
    label(nom, h[i-1], ((i/13)*canvas.width)+(2/100)*canvas.width, (19/20)*canvas.height);
  }

  

  for (let i=0; i<7; i++){
    if (hor[i].length == 1){ // si un seul créneau d'ouverture

      let ouvre = hor[i][0][0] - 6; // -6 pour ramener sur le canvas
      let ferme = hor[i][0][1] - 6;
      dessinRectangle(nom, (ouvre/13)*canvas.width, ((i/7)*(9/10)*canvas.height), ((ferme-ouvre)/13)*canvas.width, ((1/7)*(9/10)*canvas.height), 'rgba(0, 150, 0, 0.75)');
    }

    else if (hor[i].length == 2){ // si deux créneau d'ouverture
      let ouvre = hor[i][0][0] - 6; 
      let ferme = hor[i][0][1] - 6;
      dessinRectangle(nom, (ouvre/13)*canvas.width, ((i/7)*(9/10)*canvas.height), ((ferme-ouvre)/13)*canvas.width, ((1/7)*(9/10)*canvas.height), 'rgba(0, 150, 0, 0.75)');
      
      let ouvre2 = hor[i][1][0] - 6; 
      let ferme2 = hor[i][1][1] - 6;
      dessinRectangle(nom, (ouvre2/13)*canvas.width, ((i/7)*(9/10)*canvas.height), ((ferme2-ouvre2)/13)*canvas.width, ((1/7)*(9/10)*canvas.height), 'rgba(0, 150, 0, 0.75)');

    }
  }
}




function typeSite(type){
  if(type == "tente"){
    //console.log("tente: ⛺");
    return "tente: ⛺";
  }
  else if(type == "pharmacie"){
    //console.log("pharmacie: ⚕️");
    return "pharmacie: ⚕️";
  }
  else if(type == "laboratoire"){
    //console.log("laboratoire: 🧪");
    return "laboratoire: 🧪";
  }
  else{
    //console.log("hôpital: 🏥");
    return "hôpital: 🏥";
  }
}

function typeTest(test){
  if(test == "salivaire"){
    return "salivaire 👄"
  }
  else if(test == "sérologique"){
    return "sérologique 💉";
  }
  else{
    return "pcr 👃";
  }
}

function nbEtoiles(nb){ // donne le nombre d'étoiles avec un arrondie
  res = "";
  while(nb > 0){
      if(nb < 1){
        if(nb < 0.25){
          nb = 0;
        }
        else if(nb >= 0.25 && nb <= 0.75){
          res += '<i class="star half icon"></i>';
          nb = 0;
        }
        else{
          res += '<i class="star icon"></i>';
          nb = 0;
        }
      }
      else{
          res += '<i class="star icon"></i>';
          nb -= 1.0;
      }
  }
  return res;
};

function avisSite(note, total){
  return nbEtoiles(note) + " (" + note + "/5 étoiles sur " + total + " avis)" ;
}



function afficherInfo(site){ //passer le site entier en paramètre
  let div = document.createElement('div');
  div.id = nomG + " info div";

  let texte = document.createElement('p');
  texte.id = nomG + " info";

  texte.innerHTML += "<strong>Type de site:</strong> "          + typeSite(site.type)              + "<br>";
  texte.innerHTML += "<strong>Test effectué:</strong> "         + typeTest(site.typeTest)          + "<br>";
  texte.innerHTML += "<strong>Vaccin utilisé:</strong> "        + site.typeVaccin                  + "<br>";
  texte.innerHTML += "<strong>Nombre de dépistage:</strong> "   + site.nbTest                      + "<br>";
  texte.innerHTML += "<strong>Nombre de vaccination:</strong> " + site.nbVaccin                    + "<br>";
  texte.innerHTML += "<strong>Avis:</strong> "                  + avisSite(site.avis, site.nbAvis) + "<br>";

  document.body.appendChild(div);
  document.getElementById(div.id).appendChild(texte);
}



function stats(numSite, pere){
  let site = sites[numSite];
  let largueur = document.getElementById(pere).offsetWidth;
  let hauteur = largueur*0.75;
  console.log("appel stats()")
  nomG = numSite + " " + site.nom;
  createHoraires(nomG + " horaires canvas", largueur, hauteur, site.horairesOuverture);
  afficherInfo(site);
}
/*
stats(sites[0], null);
stats(sites[1], null);
stats(sites[2], null);
*/









