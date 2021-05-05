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
var listeTypeTest = ['antigenique',' virologique','sérologique'];
var listeTypeVaccin = ['Pfizer-BioNTech','Moderna','AstraZeneca','Johnson&Johnson'];

dbconnection.onupgradeneeded = function(event) {
  var db = event.target.result;
  var objectStore = db.createObjectStore('centres', { keyPath: "id", autoIncrement: true });
  objectStore.createIndex("ville", "ville", { unique: false });
  objectStore.createIndex("nom", "nom", { unique: false });
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

  for (i=0 ; i < filtered_database.length ; i++){
    //préparation des variables nessaire : 
    var t = Math.floor(Math.random() * listeTypeVaccin.length); //id type de vaccin
    var v = Math.floor(Math.random() * listeTypeTest.length);   //id type de test
    //console.log(t,v);
    el = {
      ville: filtered_database[i].ville,
      nom: filtered_database[i].rs,
      adresse: filtered_database[i].adresse, 
      codePostal: filtered_database[i].code,
      latitude : filtered_database[i].latitude, 
      longitude : filtered_database[i].longitude,
      horairesOuverture: [ [[8.5,18.5]] , [[8.5,18.5]] , [[8.5,18.5]] , [[8.5,18.5]] , [[8.5,18.5]] , [[8.5,12],[14,18.5]] , []], //lun, mar, mrc, jeu, vdd, sam, dim ; []-fermé
      heureAffuence: [[8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],[],[],[],[],[],[]], //creationHeureAffuence(horairesOuverture),
                     //avant 8h, 8-9, 9-10, ... , 18-19    
      numTel: filtered_database[i].tel_rdv,
      typeTest: listeTypeTest[v],
      nbTest: Math.floor(Math.random() * 200)+ 1,
      typeVaccin: listeTypeVaccin[t],
      nbVaccin: Math.floor(Math.random() * 80)+ 1,
      avis: Math.floor(Math.random() * (5 - 1) + 1)+ Math.floor(Math.random() * 10)/10, //partie entière + partie décimale
      nbAvis: Math.floor(Math.random() * 100)+ 1, // alétoire entre m<x<n+m
      age: [1,2,3,4,5,6,7]
    };
    objectStore.add(el);
  }
}

dbconnection.onsuccess = ev => {
  console.log('Connected');
  const db = ev.target.result;
  const transaction = db.transaction('centres', 'readwrite');
  const store = transaction.objectStore('centres');

  var request = store.get("");
  request.onerror = function(event) {
    // gestion des erreurs!
  };
  request.onsuccess = function(event) {
    // Faire quelque chose avec request.result !
    console.log(request.result);
  };

  //const clearRequest = store.clear();

  console.log(filtered_database);
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
        console.log(cursor.key, 
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
          cursor.value.age);
        cursor.continue();
      } else {
        console.log('Finished output');
      }
    };
  };
}
