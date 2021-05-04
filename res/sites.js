//faire une fonction ou un truc pour charger tout les sites de la BD à la place de ces trois exemples
var sites = [ 
    {
        ville: "Albi",
        type: "hospital",
        nom: "Centre Hospitalier d'Albi",
        adresse: "22 Boulevard Général Sibille",
        codePostal: "81000",
        horairesOuverture: [ [[8,16]] , [[8.5,18.5]] , [[8.5,12], [14, 15]] , [] , [[9,15]] , [[8.5,12],[14,18.5]] , []], //lun, mar, mrc, jeu, vdd, sam, dim ; []-fermé
        heureAffuence: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], //avant 8h, 8-9, 9-10, ... , 18-19
        numTel: "0563474747",
        typeTest: "pcr",
        nbTest: 82,
        typeVaccin: "x",
        nbVaccin: 12,
        avis: 4.1,
        nbAvis: 51
    }, 

    {
        ville: "Albi",
        type: "tente",
        nom: "le site 2",
        adresse: "22 Boulevard Général Sibille",
        codePostal: "81000",
        horairesOuverture: [ [[7,16.5]] , [[8.5,14.5]] , [[8.5,14.5]] , [[8.5,18.5]] , [[8.5,18.5]] , [] , [[8.5,12],[14,18.5]] ], //lun, mar, mrc, jeu, vdd, sam, dim ; []-fermé
        heureAffuence: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], //avant 8h, 8-9, 9-10, ... , 18-19
        numTel: "0563474747",
        typeTest: "salivaire",
        nbTest: 30,
        typeVaccin: "x",
        nbVaccin: 12,
        avis: 3.1,
        nbAvis: 24
    }, 

    {
        ville: "Albi",
        type: "laboratoire",
        nom: "Dalaboratoareu",
        adresse: "22 Boulevard Général Sibille",
        codePostal: "81000",
        horairesOuverture: [ [[8.5,18.5]] , [[8.5,18.5]] , [[8.5,18.5]] , [[8.5,18.5]] , [[8.5,18.5]] , [[8.5,12],[14,18.5]] , []], //lun, mar, mrc, jeu, vdd, sam, dim ; []-fermé
        heureAffuence: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], //avant 8h, 8-9, 9-10, ... , 18-19
        numTel: "0563474747",
        typeTest: "sérologique",
        nbTest: 50,
        typeVaccin: "x",
        nbVaccin: 102,
        avis: 1.5,
        nbAvis: 80
    }
    
]

