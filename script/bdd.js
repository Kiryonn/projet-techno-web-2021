// Sur la ligne suivante, vous devez inclure les préfixes des implémentations que vous souhaitez tester.
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
// N'UTILISEZ PAS "var indexedDB = ..." si vous n'êtes pas dans une fonction.
// De plus, vous pourriez avoir besoin de réferences à des objets window.IDB*:
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange
// (Mozilla n'a jamais préfixé ces objets, donc nous n'avons pas besoin de window.mozIDB*)

if (!window.indexedDB) {
  window.alert("Votre navigateur ne supporte pas une version stable d'IndexedDB. Quelques fonctionnalités ne seront pas disponibles.")
}


let dbconnection = window.indexedDB.open('DepistageDatabase', 10);
//création des constante nessaire

var listeTypeTest = ['antigenique', ' virologique', 'sérologique'];
var listeTypeVaccin = ['Pfizer-BioNTech', 'Moderna', 'AstraZeneca', 'Johnson&Johnson'];
var listeType = ["hôpital", "tente", "laboratoire", "pharmacie"];

dbconnection.onupgradeneeded = function (event) {
  var db = event.target.result;
  var objectStore = db.createObjectStore('centres', { keyPath: "id", autoIncrement: true });
  objectStore.createIndex("ville", "ville", { unique: false });
  objectStore.createIndex("nom", "nom", { unique: false });
  objectStore.createIndex("type", "type", { unique: false });
  objectStore.createIndex("adresse", "adresse", { unique: false });
  objectStore.createIndex("codePostal", "codePostal", { unique: false });
  objectStore.createIndex("longitude", "longitude", { unique: false });
  objectStore.createIndex("latitude", "latitude", { unique: false });
  objectStore.createIndex("horairesOuverture", "horairesOuverture", { unique: false });
  objectStore.createIndex("heureAffuence", "heureAffuence", { unique: false });
  objectStore.createIndex("numTel", "numTel", { unique: false });
  objectStore.createIndex("typeTest", "typeTest", { unique: false });
  objectStore.createIndex("nbTest", "nbTest", { unique: false });
  objectStore.createIndex("typeVaccin", "typeVaccin", { unique: false });
  objectStore.createIndex("nbVaccin", "nbVaccin", { unique: false });
  objectStore.createIndex("avis", "avis", { unique: false });
  objectStore.createIndex("nbAvis", "nbAvis", { unique: false });
  objectStore.createIndex("age", "age", { unique: false });

  for (i = 0; i < filtered_database.length; i++) {
    //préparation des variables nessaire : 
    var t = Math.floor(Math.random() * listeTypeVaccin.length); //id type de vaccin
    var v = Math.floor(Math.random() * listeTypeTest.length);   //id type de test
    var ty = Math.floor(Math.random() * listeType.length);      //id type site

    let horraires = [];
    let affl = []
    for (let jour = 0; jour < 6; jour++) {
      let h = getRandomH()
      let affl_h = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      horraires.push(h);
      if (h[0] instanceof Array) {
        for (let deb = h[0][0]-8; deb <= h[0][1]-8; deb+= 0.5) {
          affl_h[Math.floor(deb)] += myRandom(2, 15);
        }
        for (let deb = h[1][0]-8; deb <= h[1][1]-8; deb+=0.5) {
          affl_h[Math.floor(deb)] = myRandom(2, 15);
        }
      } else {
        for (let deb = h[0]-8; deb <= h[1]-8; deb+= 0.5) {
          affl_h[Math.floor(deb)] += myRandom(2, 15);
        }
      }
      affl.push(affl_h);
    }
    horraires.push([]);
    affl.push([]);

    el = {
      ville: filtered_database[i].ville,
      nom: filtered_database[i].rs,

      type: listeType[ty],
      adresse: filtered_database[i].adresse,
      codePostal: filtered_database[i].code,
      latitude: filtered_database[i].latitude,
      longitude: filtered_database[i].longitude,
      horairesOuverture: horraires, //lun, mar, mrc, jeu, vdd, sam, dim ; []-fermé
      heureAffuence: affl, //creationHeureAffuence(horairesOuverture),
      //avant 8h, 8-9, 9-10, ... , 18-19
      numTel: filtered_database[i].tel_rdv,
      typeTest: listeTypeTest[v],
      nbTest: Math.floor(Math.random() * 200) + 1,
      typeVaccin: listeTypeVaccin[t],
      nbVaccin: Math.floor(Math.random() * 80) + 1,
      avis: Math.floor(Math.random() * (5 - 1) + 1) + Math.floor(Math.random() * 10) / 10, //partie entière + partie décimale
      nbAvis: Math.floor(Math.random() * 100) + 1, // alétoire entre m<x<n+m
      age: [1, 2, 3, 4, 5, 6, 7]
    };
    objectStore.add(el);
  }
}

//on charge tout les sites la dedans


dbconnection.onsuccess = ev => {
  console.log('Connected');
  const db = ev.target.result;
  const transaction = db.transaction('centres', 'readwrite');
  const store = transaction.objectStore('centres');
  var request = store.get("");
  request.onerror = function (event) {
    // gestion des erreurs!
  };
  request.onsuccess = function (event) {
    // Faire quelque chose avec request.result !
    // console.log(request.result);
  };

  //const clearRequest = store.clear();

  //console.log(filtered_database);
  //el est l'objet json qui contient toutes les infos
  //centreDeDepistage_info.forEach(el => store.add(el));

  function creationHeureAffuence(horairesOuverture) {
    var listAffuence = [];
    for (let i = 0; i < 13; i++) { //il y a 12 int dans la liste
      if (i === cats.length - 1) {
        info += 'and ' + cats[i] + '.';
      } else {
        info += cats[i] + ', ';
      }
    }
  }

  transaction.onerror = ev => {
    console.error('An error has occured!', ev.target.error.message);
  };

  transaction.oncomplete = ev => {
    console.log('Data imported');
    const store = db.transaction('centres', 'readonly').objectStore('centres');
    //demander la position 1 de la table Centres :
    //const query = store.get(1); // a single query
    //demander toute la table Centres :
    const query = store.openCursor()
    query.onerror = ev => {
      console.error('Request error', ev.target.error.message);
    };
    /*
    // chercher un item
    query.onsuccess = ev => {
      if (query.result) {
        console.log('Dataset 1', query.result.Nickname, query.result.eMail);
      } else {
        console.warn('No entry available!');
      }
    };
    */
    query.onsuccess = ev => {
      const cursor = ev.target.result;
      if (cursor) {

        /*console.log(cursor.key, 
          cursor.value.ville, 
          cursor.value.nom,
          cursor.value.adresse,
          cursor.value.codePostal,
          cursor.value.latitude,
          cursor.value.longitude,
          cursor.value.horairesOuverture,
          cursor.value.heureAffuence,
          cursor.value.numTel,
          cursor.value.typeTest,
          cursor.value.nbTest,
          cursor.value.typeVaccin,
          cursor.value.nbVaccin,
          cursor.value.avis,
          cursor.value.nbAvis,
          cursor.value.age);*/

        let point = L.marker([cursor.value.latitude, cursor.value.longitude], { icon: maison });

        let description = "<p hidden>" + cursor.value.id + "</p><br>" + cursor.value.nom;

        point.bindPopup(description);

        point.on('click', (e) => {
          id = parseInt(e.target._popup._content.split('<br>')[0].split('>')[1].split('<')[0]);
          if (isFirstSelect) {
            tableau[0] = id - 1;
            form1.value = id;
            console.log(id);
            majAff();
          } else {
            tableau[1] = id - 1;
            form2.value = id;
            majAff();
          }
          isFirstSelect = !isFirstSelect;
        });
        point.on('mouseover', (e) => {
          point.openPopup();
        });
        point.on('mouseout', (e) => {
          point.closePopup();
        })

        group.addLayer(point);  // cluster

        sites.push({
          id: cursor.value.id,
          ville: cursor.value.ville,
          nom: cursor.value.nom,
          type: cursor.value.type,
          adresse: cursor.value.adresse,
          codePostal: cursor.value.codePostal,
          latitude: cursor.value.latitude,
          longitude: cursor.value.longitude,
          horairesOuverture: cursor.value.horairesOuverture,
          heureAffluence: cursor.value.heureAffuence,
          numTel: cursor.value.numTel,
          typeTest: cursor.value.typeTest,
          nbTest: cursor.value.nbTest,
          typeVaccin: cursor.value.typeVaccin,
          nbVaccin: cursor.value.nbVaccin,
          avis: cursor.value.avis,
          nbAvis: cursor.value.nbAvis,
          age: cursor.value.age
        });
        cursor.continue();
      } else {
        console.log('Finished output');
        load();
      }
    }
  }
}


function getRandomH() {
  if (myRandom(0, 100) > 15) {
    let poss1 = [8, 8.5, 9, 9.5, 10, 10.5];
    let poss2 = [10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14];
    let poss3 = [14, 14.5, 15, 15.5, 16, 16.5];
    let poss4 = [16, 16.5, 17, 17.5, 18, 18.5, 19];

    let deb1 = poss1[myRandom(0, poss1.length - 1)];
    while (poss2[0] < deb1 + 2)
      poss2.splice(0, 1);
    let fin1 = poss2[myRandom(0, poss2.length - 1)];
    while (poss3[0] < fin1 + 2)
      poss3.splice(0, 1);
    let deb2 = poss3[myRandom(0, poss3.length - 1)];
    while (poss4[0] < deb2 + 2)
      poss4.splice(0, 1);
    let fin2 = poss4[myRandom(0, poss3.length - 1)];
    return [[deb1, fin1], [deb2, fin2]];
  } else {
    let poss1 = [8, 8.5, 9, 9.5, 10];
    let poss2 = [16, 16.5, 17, 17.5, 18, 18.5, 19];
    return [poss1[myRandom(0, poss1.length-1)], poss2[myRandom(0, poss2.length-1)]];
  }
}

function myRandom(deb, fin) {
  return Math.floor(Math.random() * (fin))+deb;
}
