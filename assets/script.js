//Initialisation des variables du jeu
function initGame() {
	var nbrctivities = 5;
	//initialisation des variables locales
	var etapesactivated = Array(nbrctivities).fill(0);
	etapesactivated[0] = 1;
	localStorage.setItem("etapeActivated", JSON.stringify(etapesactivated)); //NBR de 0 par étape (avec intro et conclusion)
	localStorage.setItem("buttonActivated", JSON.stringify(etapesactivated)); //NBR de 0 par étape (avec intro et conclusion)
	localStorage.setItem("scoreTotal", 0);
	localStorage.setItem("scoreEnCours", 0);
	localStorage.setItem("etapeEnCours", 0);
	localStorage.setItem("datedebut", Date.now());
	localStorage.setItem("vainqueur", 1);	
	localStorage.setItem("popupTexte", "");	
	//Gestion des indices
	var indicesActivated = Array(nbrctivities);
	var indicesTexte = Array(nbrctivities);
		//Etape 0 => Pas d'indices
	indicesActivated[0] = Array();
	indicesTexte[0] = Array();
		//Etape 1 => 2 indices
	indicesActivated[1] = Array(2).fill(0);
	indicesTexte[1] = Array(2);
	indicesTexte[1][0] = "Le calendrier de ce rébu change tous les jours en fonction de la date du jour !";
	indicesTexte[1][1] = "La note de musique est un MI !";
		//Etape 3 =>  1 indice
	indicesActivated[3] = Array(1).fill(0);
	indicesTexte[3] = Array(1);
	indicesTexte[3][0] = "C'est une blague ?! Quel ingrédient utilises-tu dans ta soupe favorite ?";
  	    //Etape 4 =>  2 indice
	indicesActivated[4] = Array(2).fill(0);
	indicesTexte[4] = Array(2);
	indicesTexte[4][0] = "Le nom de cette fleur devrait t'aider !";
    indicesTexte[4][1] = "C'est le seul endroit de ton appartement où il est normal d'en trouver !";
        //Etape 6 =>  2 indice
	indicesActivated[6] = Array(2).fill(0);
	indicesTexte[6] = Array(2);
	indicesTexte[6][0] = "Harry Potter";
    indicesTexte[6][1] = "Où est la chambre d'Harry potter ?";
        //Etape 7 =>  2 indice
	indicesActivated[7] = Array(2).fill(0);
	indicesTexte[7] = Array(2);
	indicesTexte[7][0] = "Qu'as-tu déjà trouvé ?";
    indicesTexte[7][1] = "La couleur de la boîte de thé découverte";
        //Etape 9 =>  3 indice
	indicesActivated[9] = Array(3).fill(0);
	indicesTexte[9] = Array(3);
	indicesTexte[9][0] = "Tu as déjà trouvé des objets chez toi ?";
    indicesTexte[9][1] = "Positionne les objets trouvés et trace 2 traits";
    indicesTexte[9][2] = "Le code se trouve au croisement des 2 traits";
		//Chargement des variables en stockage
	localStorage.setItem("indicesActivated", JSON.stringify(indicesActivated)); 
	localStorage.setItem("indicesTexte", JSON.stringify(indicesTexte)); 
}

//chargePage : Au chargement de la page en fonction de la page 
function chargePage(numPage) {
	switch(numPage) {
		case "menu" :
			var array = JSON.parse(localStorage.getItem("etapeActivated"))
			for (var i = 0; i < array.length; i++) {
				if (array[i]=="0") {
					document.getElementById("e"+i).classList.add("inactiv")
				} else {
					document.getElementById("e"+i).classList.add("activ")
				}
			  }
			if (localStorage.getItem("vainqueur") == 1) {
				document.getElementById("myPopup").innerHTML = localStorage.getItem("popupTexte");
				document.getElementById("myPopupscore").innerHTML = "+ " + localStorage.getItem("scoreEnCours")
				document.getElementById("popup").style.display = 'block';
			}
			break;
		case "p3263e" :
			var dateauj = new Date().getDate();
			var datehier = dateauj-1;
			document.getElementById("i3").src="/assets/cal/" + datehier + ".png";
			//Chargement des indices :
			ChargeIndices(1);
			break;
		case "g4144h" :
			//Chargement des indices :
			ChargeIndices(3);
			break;
        case "s1571a" :
            //Chargement des indices :
            ChargeIndices(4);
            break;
	    case "m6182p" :
		    //Chargement des indices :
		    MasterMind.initialise();
            ChargeIndices(5);
		    break;
        case "f4190b" :
		    //Chargement des indices :
            ChargeIndices(6);
		    break;
        case "o2550u" :
		    //Chargement des indices :
            ChargeIndices(7);
		    break;
        case "w9743q" :
		    //Chargement des indices :
            ChargeIndices(8);
		    break;
        case "t3643u" :
		    //Chargement des indices :
            ChargeIndices(9);
		    break;
        case "z7946f" :
		    //Chargement des indices :
            puzzle.game_init();
            ChargeIndices(10);
		    break;
	    default:
			break;
	}
}

//Chargement des indices
function ChargeIndices(numPage) {
	var indicesActivated = JSON.parse(localStorage.getItem("indicesActivated"));
	var indicesTexte = JSON.parse(localStorage.getItem("indicesTexte"));
	//On boucle sur tous les indices en questions
	var indicesActivated_e = indicesActivated[numPage];
	var indicesTexte_e = indicesTexte[numPage];
	var TexteHtml = "";
	for (var i = 0; i < indicesActivated_e.length; i++) {
		ind = i+1;
		//Est-ce qu'il est free ?
		if (indicesActivated_e[i]==1) {
			TexteHtml = TexteHtml + '<button id="' + numPage + '_' + i + '" type="button" style="display:inline;" class="button_indice button_indice_on" onclick="popupIndice(' + numPage + ',' + i + ')">' + ind + '</button>';
		} else {
			TexteHtml = TexteHtml + '<button id="' + numPage + '_' + i + '" type="button" style="display:inline;" class="button_indice" onclick="popupIndice(' + numPage + ',' + i + ')">' + ind + '</button>';
		}
	}
	document.getElementById("indicesBoxButton").innerHTML = TexteHtml;
}

//Menu : Désactiver le popup 
function popupNone() {
	document.getElementById("popup").style.display = "none";
	localStorage.setItem("scoreTotal", parseInt(localStorage.getItem("scoreEnCours"))+parseInt(localStorage.getItem("scoreTotal")));
	localStorage.setItem("scoreEnCours",0)
	localStorage.setItem("vainqueur",0)
}

//Popup Indice 
function popupIndice(numEtape, numIndice) {
	var indicesActivated = JSON.parse(localStorage.getItem("indicesActivated"));
	var indicesTexte = JSON.parse(localStorage.getItem("indicesTexte"));	
	if (indicesActivated[numEtape][numIndice] == 0) {
		indicesActivated[numEtape][numIndice] = 1;
		localStorage.setItem("indicesActivated", JSON.stringify(indicesActivated));
		localStorage.setItem("scoreTotal", parseInt(localStorage.getItem("scoreTotal"))-100);
		var boxIndiceId = numEtape + '_' + numIndice;
		document.getElementById(boxIndiceId).classList.add("button_indice_on");
	}
	document.getElementById("myPopupIndice").innerHTML = indicesTexte[numEtape][numIndice];
	document.getElementById("popup").style.display = 'block';	
}

function popupIndiceNone() {
	document.getElementById("popup").style.display = "none";
}

//validation d'une étape
function valid(etapevalidee, score) {
	//On teste si les resultats sont les bons
	switch (etapevalidee) {
		//Si étape 0 : initialisation du jeu
		case 0:
			initGame();
			vainqueur(etapevalidee, score);
			return true;
			break;
		//Si 1 : Code suite au Rébu
		case 1:
			var code = document.forms["RegForm"]["code"];
			switch (code.value) {
				case "":
					alert("Remplir le code !");
					code.focus();
					return false;
					break;
				case "1908":
					vainqueur(etapevalidee, score);
					return true;
					break;
				default :
					alert("Le code n'est pas bon !");
					code.focus();
					return false;
					break;
			}
			break;
		// Si 2 : Numéro de téléphone
		case 2 :
			var code = document.forms["RegForm"]["code"];
			switch (code.value) {
				case "":
					alert("Remplir le numéro !");
					code.focus();
					return false;
					break;
				case "33763228554":
					vainqueur(etapevalidee, score);
					return true;
					break;
				default :
					alert("Le numéro n'est pas bon !");
					code.focus();
					return false;
					break;
			}
			break;
		// Si 3 : Ingrédient par sms -> Code retour
		case 3 :
			var code = document.forms["RegForm"]["code"];
			switch (code.value) {
				case "":
					alert("Remplir le code !");
					code.focus();
					return false;
					break;
				case "0716":
					vainqueur(etapevalidee, score);
					return true;
					break;
        case "716":
            vainqueur(etapevalidee, score);
            return true;
            break;
				default :
					alert("Le code n'est pas bon !");
					code.focus();
					return false;
					break;
			}
    // Si 4 : Il flash le QRcode
		case 4 :
      vainqueur(etapevalidee, score);
      return true;
			break;
    // Si 5 : Code du MasterMind
		case 5 :
			var code = document.forms["RegForm"]["code"];
			switch (code.value) {
				case "":
					alert("Remplir le code !");
					code.focus();
					return false;
					break;
				case "682134":
					vainqueur(etapevalidee, score);
					return true;
					break;
				default :
					alert("Le code n'est pas bon !");
					code.focus();
					return false;
					break;
			}
    // Si 6 : Il flash le Nfc
		case 6 :
            vainqueur(etapevalidee, score);
            return true;
			break;
    // Si 7 : couleur
		case 7 :
			var code = document.forms["RegForm"]["code"];
			switch (code.value) {
				case "Bleu":
					vainqueur(etapevalidee, score);
					return true;
					break;
				default :
					alert("Ce n'est pas la bonne couleur");
					code.focus();
					return false;
					break;
			}
    // Si 8 : Il flash le nfc
		case 8 :
            vainqueur(etapevalidee, score);
            return true;
            break;
    // Si 9 : Code sous le canapé
		case 9 :
			var code = document.forms["RegForm"]["code"];
			switch (code.value) {
				case "":
					alert("Remplir le code !");
					code.focus();
					return false;
					break;
				case "1712":
					vainqueur(etapevalidee, score);
					return true;
					break;
				default :
					alert("Le code n'est pas bon !");
					code.focus();
					return false;
					break;
			}
    // Si 10 : Mini_jeu : On vérifie si tous les éléments sont bien placés
		case 10 :
            correctnum = 0
            for (i=0 ; i<=7 ; i++) {
                //On teste chaque nombre
                if (document.getElementById(i).innerHTML == i+1) {
                    correctnum++  
                }
            }
            if (correctnum == 8) {
                vainqueur(etapevalidee, score);
                return true;
            } else {
                alert("Tu n'as pas résolu le puzzle !");
                return false;
            }
            break;
    default :
      	break;
	}
}

//Etape OK - Vainqueur + Texte du Popup
function vainqueur(etapevalidee, score) {
	//On signale pour activer le popup
	localStorage.setItem("vainqueur",1);
	//On permet l'accès à l'étape suivante
	var etapes = JSON.parse(localStorage.getItem("etapeActivated"));
	etapes[etapevalidee+1] = 1;
	localStorage.setItem("etapeActivated", JSON.stringify(etapes));
	//Récupération du score et chargement du texte du popup
	localStorage.setItem("scoreEnCours", score);
	switch (etapevalidee) {
		case 0:
			localStorage.setItem("popupTexte", "Mario t'a laissé quelques pièces pour bien commencer !");
			break;
		case 1:
			localStorage.setItem("popupTexte", "Top ! C'est le bon code !");
			break;
		case 2:
			localStorage.setItem("popupTexte", "Super ! Nous allons certainement pouvoir contacter Luigi prochainement !");
			break;
    case 3:
			localStorage.setItem("popupTexte", "Top ! Tu viens d'activer le système ! Je reçois des premières infos.");
			break;
    case 4:
			localStorage.setItem("popupTexte", "Cette étoile te rapporte pas mal de coins !");
			break;
    case 5:
			localStorage.setItem("popupTexte", "Bien joué ! La connexion est rétablie !");
			break;
    case 6:
			localStorage.setItem("popupTexte", "Tu as trouvé la boîte ! Fais-y attention, c'est fragile et elle semble fortement piégée !");
			break;
    case 7:
			localStorage.setItem("popupTexte", "Tu peux couper le fil bleu, c'était la bonne couleur !");
			break;
    case 8:
			localStorage.setItem("popupTexte", "Superbe ! Tu l'as trouvé super vite !");
			break;
    case 9:
			localStorage.setItem("popupTexte", "Bien joué ! Tu l'as trouvé ! Retient ce code, comme les autres, il te reservira surement ... ");
			break;
	}
}

//MASTERMIND

var MasterMind = {
    name: 'MasterMind',

    difficulties: {
        hard: {
            lines: 8,
            columns: 6,
            colors: 10,
            double: true,
            locCheck: false,
        },
    },

    colors: {
        1: '#593511', // marron
        2: '#F44900', // orange
        3: '#C0B81C', // jaune
        4: '#109932', // vert foncé
        5: '#73A37F', // vert clair
        6: '#13666F', // bleu azur
        7: '#B478DE', // violet pastel
        8: '#501C72', // violet
        9: '#1A30AC', // bleu foncé
        10: '#97245A', // rose
    },

    game: {
        turn: 1, // tour en cours
        column: 1, // colonne en cours
        selection: new Array(), // sélection de couleur du joueur
        soluce: new Array(), // solution de la partie
    },

    initialise: function() {
        this.startGame();
    },

    startGame: function() {
        this.settings = this.difficulties['hard'];
        this.drawGameBoard();
        this.resetGame();
        this.defineSoluce();
    },

    drawGameBoard: function() {
        board = document.getElementById('plateau');
        board.innerHTML = '';

        for (i = this.settings['lines']; i>0; i--) {

            line = document.createElement('tr');
            line.id = 'turn-'+i;

            cell = document.createElement('td');
            cell.innerHTML = i;
            cell.style.width = '50px';
            line.appendChild(cell);

            for (j = 1; j <= this.settings['columns']; j++) {
                cell = document.createElement('td');
                cell.innerHTML = '';
                cell.id = 'turn-'+i+'-'+j;
                cell.style.width = '50px';
                cell.setAttribute('onclick', this.name+'.selectColumn('+i+', '+j+');');
                line.appendChild(cell);
            }

            cell = document.createElement('td');
            cell.innerHTML = 'OK';
            cell.id = 'valid-'+i;
            cell.className = 'valid';
            cell.style.width = '16px';
            cell.setAttribute('onclick', this.name+'.checkLine('+i+');');
            line.appendChild(cell);

            board.appendChild(line);
        }

        colorSelector = document.getElementById('colorSelector');
        colorSelector.innerHTML = '';

        line = document.createElement('tr');
        for (i=1; i <= this.settings['colors']; i++) {
            cell = document.createElement('td');
            cell.innerHTML = '';
            cell.style.width = '50px';
            line.appendChild(cell);

            pion = document.createElement('div');
            pion.className = 'pion';
            pion.style.background = this.colors[i];
            pion.setAttribute('onclick', this.name+'.selectColor('+i+');');
            cell.appendChild(pion);
        }
        colorSelector.appendChild(line);
    },

    resetGame: function() {
        this.game['turn'] = 1;
        this.game['column'] = 1;

        document.getElementById('turn-1').className = 'selected';
        document.getElementById('turn-1-1').className = 'selected';
    },

    defineSoluce: function() {
        this.game['soluce'] = new Array();
        /*Définition du code*/
        this.game['soluce'][1] = 6;
        this.game['soluce'][2] = 8;
        this.game['soluce'][3] = 2;
        this.game['soluce'][4] = 1;
        this.game['soluce'][5] = 3;
        this.game['soluce'][6] = 4;
        
    },

    selectColor: function(color) {
        /* Verifie si la partie est toujours active */
        if (this.game['turn'] == -1) {
            return;
        }

        /* Retire la precedente selection si elle existe */
        document.getElementById('turn-'+this.game['turn']+'-'+this.game['column']).innerHTML = '';

        /* Ajoute la couleur a la selection faite par le joueur */
        this.game['selection'][this.game['column']] = color;

        /* Ajoute visuellement la couleur sur le plateau */
        pion = document.createElement('div');
        pion.className = 'pion';
        pion.style.background = this.colors[color];
        document.getElementById('turn-'+this.game['turn']+'-'+this.game['column']).appendChild(pion);

        /* Retire le marquage visuel de la case courante */
        document.getElementById('turn-'+this.game['turn']+'-'+this.game['column']).className = '';

        /* Verifie que le curseur n'est pas sur la derniere case */
        if (this.game['column'] == this.settings['columns']) {
            /* Place le curseur a la premiere case */
            this.game['column'] = 1;
        } else {
            /* Deplace le curseur du joueur sur la case suivante */
            this.game['column'] ++;
        }

        /* Ajoute le marquage visuel sur la nouvelle case courante */
        document.getElementById('turn-'+this.game['turn']+'-'+this.game['column']).className = 'selected';
    },

    selectColumn: function(line, column) {
        /* Verifie si la ligne est bien la ligne courante, verifie en meme temps, si la partie est toujours active */
        if (line != this.game['turn']) {
            return;
        }

        /* Retire le marquage visuel de la case courante */
        document.getElementById('turn-'+line+'-'+this.game['column']).className = '';

        /* Selectionne la nouvelle colonne */
        this.game['column'] = column;

        /* Applique le marquage visuel sur la nouvelle case courante */
        document.getElementById('turn-'+line+'-'+this.game['column']).className = 'selected';
    },

    checkLine: function(line) {
        /* Verifie si la ligne est bien la ligne courante, verifie en meme temps, si la partie est toujours active */
        if (line != this.game['turn']) {
            return;
        }

        /* Verifie que la ligne a ete entierement remplie par le joueur */
        for (i = 1; i <= this.settings['columns']; i++) {
            if (!this.game['selection'][i]) {
                return;
            }
        }

        /* Duplique la solution pour pouvoir la modifier sans alterer l'originale */
        soluce = this.game['soluce'].slice(0);

        /* Initialise les variables de verification */
            correct = 0;
            misplaced = 0;
            tabres = new Array();

            /* Verifie les pions bien places */
            for (i = 1; i <= this.settings['columns']; i++) {
                if (this.game['selection'][i] == soluce[i]) {
                    correct++;
                    soluce[i] = 0;
                    tabres[i]=2;
                    this.game['selection'][i] = 0;
                } else {
                    tabres[i]=0;
                }
            }

            /* Verifie si tous les pions sont biens places, et auquel cas, afficher la victoire */
            if (correct == this.settings['columns']) {
                /* Utilise un return pour sortir de la method et ne pas continuer la verification */
                document.getElementById("myPopupIndice").innerHTML = "Trouvé";
	              return document.getElementById("popup").style.display = 'block';	
            }

            /* Verifie les pions mal places, parmi les pions restant */
            for (i = 1; i <= this.settings['columns']; i++) {
                if (this.game['selection'][i] == 0) {
                    continue;
                }
                loc = soluce.indexOf(this.game['selection'][i]);

                if (loc != -1) {
                    this.game['selection'][i] = 0;
                    soluce[loc] = 0;
                    misplaced++;
                    tabres[i]=1;
                }
            }

            /* Affiche les pions bien ou mal placés */
            for (i = 1; i <= this.settings['columns']; i++) {
                //S'il est bien placé
                if (tabres[i]==2) {
                  document.getElementById('turn-'+this.game['turn']+'-'+i).style.backgroundColor = "black";
                } else if (tabres[i]==1) {
                  document.getElementById('turn-'+this.game['turn']+'-'+i).style.backgroundColor = "white";
                } 
            }

        /* Prepare le jeu pour le tour suivant */

        /* Re-initialise la selection du joueur */
        this.game['selection'] = new Array();

        /* Retire le marquage visuel de la ligne courante  */
        document.getElementById('turn-'+this.game['turn']).className = '';

        /* Verifie que la ligne n'etait pas la derniere, si auquel cas, afficher la defaite */
        if (this.game['turn'] == this.settings['lines']) {
            /* Utilise un return pour sortir de la method et ne pas continuer la verification */
            return this.displayLose();
        }

        /* Deplace le curseur sur la ligne suivante */
        this.game['turn'] ++;

        /* Applique le marquage sur la nouvelle ligne courante */
        document.getElementById('turn-'+this.game['turn']).className = 'selected';

        /* Place le curseur sur la premiere case */
        this.game['column'] = 1;

        /* Applique le marquage sur la premiere case */
        document.getElementById('turn-'+this.game['turn']+'-1').className = 'selected';
    },



    displayLose: function() {
        /* Affiche le resultat dans l'espace dedie, en couleur */
        document.getElementById("myPopupIndice").innerHTML = "Perdu";
	      document.getElementById("popup").style.display = 'block';

        /* Marque la fin de la partie en indiquant une valeur null au tour en cours */
        this.Initialise();
    },
};

function parseMillisecondsIntoReadableTime(milliseconds){
  var hours = milliseconds / (1000*60*60);
  var absoluteHours = Math.floor(hours);
  var h = absoluteHours > 9 ? absoluteHours : '0' + absoluteHours;

  var minutes = (hours - absoluteHours) * 60;
  var absoluteMinutes = Math.floor(minutes);
  var m = absoluteMinutes > 9 ? absoluteMinutes : '0' +  absoluteMinutes;

  var seconds = (minutes - absoluteMinutes) * 60;
  var absoluteSeconds = Math.floor(seconds);
  var s = absoluteSeconds > 9 ? absoluteSeconds : '0' + absoluteSeconds;

  if (h>0) {
    return h + ':' + m + ':' + s;
  } else if (m>0) {
    return m + ':' + s;
  } else {
    return m + ':' + s;
  } 
}

//PUZZLE
var puzzle = {
    blockOrder:Array(9),

    //Start
    game_init: function() {
        this.blockOrder = ["1", "2", "3", "4", "", "5", "6", "7", "8"];
        this.write();
        this.suffle();
        document.addEventListener("click",function (e) {moveBlock(e.target.id);},false);
    },

    //Write
    write: function() {
        this.blockOrder.forEach(function (item, index) {
            document.getElementById(index).innerHTML = item;
            let element1 = document.getElementById(index);
            element1.classList.remove("emptyblock");
            if (item == "") {
              let element = document.getElementById(index);
              element.classList.add("emptyblock");
            }
        });
    },

    //Write
    suffle: function() {
        for (let i = 0; i < 100; i++) {
            var block = Math.floor(Math.random() * (8 + 1));
            this.moveBlock(block);
        }
    },

    //Move block
    moveBlock: function(block) {
        if (block == 0) {
            if (this.blockOrder[1] == 0) {
              this.swap(0, 1);
              return;
            }
            if (this.blockOrder[3] == 0) {
              this.swap(0, 3);
              return;
            }
          }
        
          if (block == 1) {
            if (this.blockOrder[0] == 0) {
              this.swap(1, 0);
              return;
            }
            if (this.blockOrder[4] == 0) {
              this.swap(1, 4);
              return;
            }
            if (this.blockOrder[2] == 0) {
              this.swap(1, 2);
              return;
            }
          }
        
          if (block == 2) {
            if (this.blockOrder[1] == 0) {
              this.swap(2, 1);
              return;
            }
            if (this.blockOrder[5] == 0) {
              this.swap(2, 5);
              return;
            }
          }
        
          if (block == 3) {
            if (this.blockOrder[0] == 0) {
              this.swap(3, 0);
              return;
            }
            if (this.blockOrder[4] == 0) {
              this.swap(3, 4);
              return;
            }
            if (this.blockOrder[6] == 0) {
              this.swap(3, 6);
              return;
            }
          }
        
          if (block == 4) {
            if (this.blockOrder[1] == 0) {
              this.swap(4, 1);
              return;
            }
            if (this.blockOrder[3] == 0) {
              this.swap(4, 3);
              return;
            }
            if (this.blockOrder[5] == 0) {
              this.swap(4, 5);
              return;
            }
            if (this.blockOrder[7] == 0) {
              this.swap(4, 7);
              return;
            }
          }
        
          if (block == 5) {
            if (this.blockOrder[2] == 0) {
              this.swap(5, 2);
              return;
            }
            if (this.blockOrder[4] == 0) {
              this.swap(5, 4);
              return;
            }
            if (this.blockOrder[8] == 0) {
              this.swap(5, 8);
              return;
            }
          }
        
          if (block == 6) {
            if (this.blockOrder[3] == 0) {
              this.swap(6, 3);
              return;
            }
            if (this.blockOrder[7] == 0) {
              this.swap(6, 7);
              return;
            }
          }
        
          if (block == 7) {
            if (this.blockOrder[6] == 0) {
              this.swap(7, 6);
              return;
            }
            if (this.blockOrder[4] == 0) {
              this.swap(7, 4);
              return;
            }
            if (this.blockOrder[8] == 0) {
              this.swap(7, 8);
              return;
            }
          }
        
          if (block == 8) {
            if (this.blockOrder[5] == 0) {
              this.swap(8, 5);
              return;
            }
            if (this.blockOrder[7] == 0) {
              this.swap(8, 7);
              return;
            }
          }
    },

    //Swap
    swap: function(s1, s2) {
        let temp = this.blockOrder[s1];
        this.blockOrder[s1] = this.blockOrder[s2];
        this.blockOrder[s2] = temp;
        this.write();
    },
};