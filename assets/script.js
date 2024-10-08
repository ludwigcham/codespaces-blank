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
	indicesTexte[1][0] = "Le calendrier de ce rébu change tous les jours !";
	indicesTexte[1][1] = "C'est un MI !";
		//Etape 3 =>  1 indice
	indicesActivated[3] = Array(1).fill(0);
	indicesTexte[3] = Array(1);
	indicesTexte[3][0] = "C'est une blague ?! Quel ingrédient utilises-tu dans ta soupe favorite ?";
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
				document.getElementById("myPopupscore").innerHTML = "+ " + localStorage.getItem("scoreEnCours") + " 🪙"
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
		case "m6182p" :
			//Chargement des indices :
			ChargeIndices(5);
			MasterMind.initialise();
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
				case "1400":
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
		case 3 :
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
	}
}






//MASTERMIND

var MasterMind = {
    name: 'MasterMind',

    difficulties: {
        easy: {
            lines: 12,
            columns: 4,
            colors: 4,
            double: false,
            locCheck: true,
        },
        normal: {
            lines: 12,
            columns: 4,
            colors: 6,
            double: true,
            locCheck: true,
        },
        hard: {
            lines: 12,
            columns: 5,
            colors: 8,
            double: true,
            locCheck: false,
        },
        extreme: {
            lines: 12,
            columns: 6,
            colors: 10,
            double: true,
            locCheck: false,
        },
    },

    colors: {
        1: '#000000', // noir
        2: '#FFFFFF', // blanc
        3: '#CC3333', // rouge
        4: '#ff9600', // orange
        5: '#fff000', // jaune
        6: '#0005c2', // bleu
        7: '#00d8d5', // cyan
        8: '#8a05fa', // violet
    },

    settings: {
        lines: 12, // lignes disponibles pour arriver au résultat
        columns: 4, // colonnes de couleurs
        colors: 6, // couleurs disponibles
    },

    game: {
        turn: 1, // tour en cours
        column: 1, // colonne en cours
        selection: new Array(), // sélection de couleur du joueur
        soluce: new Array(), // solution de la partie
    },

    initialise: function() {
        this.startGame('easy');
    },

    startGame: function(difficulty) {
        this.settings = this.difficulties[difficulty];
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
            cell.style.width = '32px';
            line.appendChild(cell);

            for (j = 1; j <= this.settings['columns']; j++) {
                cell = document.createElement('td');
                cell.innerHTML = '';
                cell.id = 'turn-'+i+'-'+j;
                cell.style.width = '32px';
                cell.setAttribute('onclick', this.name+'.selectColumn('+i+', '+j+');');
                line.appendChild(cell);
            }

            for (j = 1; j <= this.settings['columns']; j++) {
                cell = document.createElement('td');
                cell.innerHTML = '';
                cell.id = 'result-'+i+'-'+j;
                cell.style.width = '16px';
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
            cell.style.width = '32px';
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
        for (i = 1; i <= this.settings['columns']; i++) {
            color = parseInt(Math.random()*this.settings['colors'])+1;
            while (this.settings['double'] == false && this.game['soluce'].indexOf(color) != -1) {
                color = parseInt(Math.random()*this.settings['colors'])+1;
            }
            this.game['soluce'][i] = color;
        }
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

        /* Verifie le mode de verification */
        if (this.settings['locCheck'] === false) {
            /* Initialise les variables de verification */
            correct = 0;
            misplaced = 0;

            /* Verifie les pions bien places */
            for (i = 1; i <= this.settings['columns']; i++) {
                if (this.game['selection'][i] == soluce[i]) {
                    correct++;
                    soluce[i] = 0;
                    this.game['selection'][i] = 0;
                }
            }

            /* Verifie si tous les pions sont biens places, et auquel cas, afficher la victoire */
            if (correct == this.settings['columns']) {
                /* Utilise un return pour sortir de la method et ne pas continuer la verification */
                return this.displayWin();
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
                }
            }

            /* Affiche le bon nombre de pions bien places */
            for (i = 1; i <= correct; i++) {
                pion = document.createElement('div');
                pion.className = 'correct';
                document.getElementById('result-'+this.game['turn']+'-'+i).appendChild(pion);
            }

            /* Affiche le bon nombre de pions mal places */
            for (j = i; j < i+misplaced; j++) {
                pion = document.createElement('div');
                pion.className = 'misplaced';
                document.getElementById('result-'+this.game['turn']+'-'+j).appendChild(pion);
            }

        } else {
            correct = 0;

            /* Check well placed */
            for (i = 1; i <= this.settings['columns']; i++) {
                if (this.game['selection'][i] == this.game['soluce'][i]) {
                    //console.log('correct pos '+i+' : '+soluce[i]);
                    correct++;
                    this.game['selection'][i] = 0;
                    soluce[i] = 0;

                    pion = document.createElement('div');
                    pion.className = 'correct';
                    document.getElementById('result-'+this.game['turn']+'-'+i).appendChild(pion);
                }
            }

            /* Check win */
            if (correct == this.settings['columns'])
                return this.displayWin();

            /* Check misplaced */
            for (i = 1; i <= this.settings['columns']; i++) {
                if (this.game['selection'][i] == 0)
                    continue;
                loc = soluce.indexOf(this.game['selection'][i]);

                if (loc != -1) {
                    this.game['selection'][i] = 0;
                    soluce[loc] = 0;

                    pion = document.createElement('div');
                    pion.className = 'misplaced';
                    document.getElementById('result-'+this.game['turn']+'-'+i).appendChild(pion);
                }
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

    displayWin: function() {
        /* Affiche le resultat dans l'espace dedie, en couleur */
        document.getElementById('result').innerHTML = 'Gagn&eacute;';
        document.getElementById('result').style.color = '#43b456';

        /* Affiche le marquage specific a la victoire sur la ligne courante */
        document.getElementById('turn-'+this.game['turn']).className = 'win';

        /* Marque la fin de la partie en indiquant une valeur null au tour en cours */
        this.game['turn'] = -1;
    },

    displayLose: function() {
        /* Affiche le resultat dans l'espace dedie, en couleur */
        document.getElementById('result').innerHTML = 'Perdu';
        document.getElementById('result').style.color = '#CC3333';

        /* Marque la fin de la partie en indiquant une valeur null au tour en cours */
        this.game['turn'] = -1;
    },
};





































  
function testit(ref) {
  switch(ref) {
    case "rk73d5l":
		var numero = document.forms["RegForm"]["Numero"];
		if (numero.value == "") {
			alert("Remplir le numéro");
  			numero.focus();
	  		return false;
		}
  		else if (numero.value != "33763428554") {
	  		alert("Le numéro n'est pas bon");
		  	numero.focus();
			return false;
  		}
	  	else if (numero.value == "33763428554") {
		  	localStorage.setItem("activity", JSON.stringify([0,1,1,0,0,0,0,0,0,0,0,0,0,0]));
			addpts(10);
  		}
	  	return true;
		break;
    case "m4ds296":
  		var numero = document.forms["RegForm"]["code"];
	  	if (numero.value == "") {
		  	alert("Remplir le code");
			numero.focus();
  			return false;
	  	}
		else if (numero.value != "ARGONNE" && numero.value != "argonne" && numero.value != "Argonne") {
			alert("Le code n'est pas bon");
  			numero.focus();
	  		return false;
		}
	  	else if (numero.value == "ARGONNE" || numero.value == "argonne"  || numero.value == "Argonne") {
			localStorage.setItem("activity", JSON.stringify([0,1,1,1,0,0,0,0,0,0,0,0,0,0]));
			addpts(10);
		}
		return true;
		break;
    case "fr8246k":
		localStorage.setItem("activity", JSON.stringify([0,1,1,1,1,0,0,0,0,0,0,0,0,0]));
		addpts(20);
		return true;
		break;
    case "mp703d5":
		var numero = document.forms["RegForm"]["couleur"];
        if (numero.value == "") {
			alert("Remplir la couleur");
			numero.focus();
			return false;
        }
        if (numero.value != "Bleu") {
			alert("Ce n'est pas la bonne couleur");
			numero.focus();
			return false;
        }
		if (numero.value == "Bleu") {
			localStorage.setItem("activity", JSON.stringify([0,1,1,1,1,1,0,0,0,0,0,0,0,0]));
			addpts(20);
        }
        return true;
		break;
	case "ks63b93":
        var numero = document.forms["RegForm"]["code"];
        if (numero.value == "") {
			alert("Remplir le code");
			numero.focus();
			return false;
        }
        if (numero.value != "il est a moi" && numero.value != "IL EST A MOI" && numero.value != "Il est à moi") {
			alert("Le code n'est pas bon");
			numero.focus();
			return false;
        }
		if (numero.value == "il est a moi" || numero.value == "IL EST A MOI" || numero.value == "Il est à moi") {
			localStorage.setItem("activity", JSON.stringify([0,1,1,1,1,1,1,0,0,0,0,0,0,0]));
			addpts(10);
        }
		return true;
		break;
	case "l4s05m3":
		var numero = document.forms["RegForm"]["code"];
        if (numero.value == "") {
			alert("Remplir le code");
			numero.focus();
			return false;
        }
        if (numero.value != "1256") {
			alert("Le code n'est pas bon");
			numero.focus();
			return false;
        }
		if (numero.value == "1256") {
			localStorage.setItem("activity", JSON.stringify([0,1,1,1,1,1,1,1,0,0,0,0,0,0]));
			addpts(10);
        }
        return true;
		break;
	case "bm410f4":
        var numero = document.forms["RegForm"]["code"];
        if (numero.value == "") {
			alert("Remplir le code ! Indice : Positionne les objets précédement trouvés et trace des traits sur le plan");
			numero.focus();
			return false;
        }
        if (numero.value != "8325") {
			alert("Le code n'est pas bon ! Indice : Positionne les objets précédement trouvés et trace des traits sur le plan");
			numero.focus();
			return false;
        }
		if (numero.value == "8325") {
			localStorage.setItem("activity", JSON.stringify([0,1,1,1,1,1,1,1,1,0,0,0,0,0]));
			addpts(10);
        }
        return true;
		break;
	case "92drt4":
        var numero = document.forms["RegForm"]["code"];
        if (numero.value == "") {
			alert("Remplir le code !");
			numero.focus();
			return false;
        }
        if (numero.value != "4341") {
			alert("Le code n'est pas bon !");
			numero.focus();
			return false;
        }
		if (numero.value == "4341") {
          localStorage.setItem("activity", JSON.stringify([0,1,1,1,1,1,1,1,1,1,0,0,0,0]));
		  addpts(20);
        }
        return true;
		break;
	case "234fcw6":
        var numero = document.forms["RegForm"]["Numero"];
        if (numero.value == "") {
			alert("Remplir le mot");
			numero.focus();
			return false;
        }
        if (numero.value != "froid" && numero.value != "FROID" && numero.value != "Froid") {
			alert("Le mot n'est pas bon");
			numero.focus();
			return false;
        }
		if (numero.value == "froid" || numero.value == "FROID" || numero.value == "Froid") {
			localStorage.setItem("activity", JSON.stringify([0,1,1,1,1,1,1,1,1,1,1,0,0,0]));
			addpts(10);
        }
        return true;
		break;
	case "9h5d35g":
		var numero = document.forms["RegForm"]["Numero"];
		var pin = document.forms["RegForm"]["pin"];
        if (numero.value == "" || pin.value == "") {
			alert("Remplir les éléments");
			numero.focus();
			return false;
        }
        if (numero.value != "CA73b") {
			alert("La référence n'est pas la bonne");
			numero.focus();
			return false;
        }
		if (pin.value != "1234567890") {
			alert("Le PIN n'est pas le bon");
			numero.focus();
			return false;
        }
		if (numero.value == "CA73b" && pin.value == "1234567890") {
			localStorage.setItem("activity", JSON.stringify([0,1,1,1,1,1,1,1,1,1,1,1,0,0]));
			addpts(20);
        }
        return true;
		break;
	case "9mf31sg":
        var numero = document.forms["RegForm"]["code"];
        if (numero.value == "") {
			alert("Tu dois trouver quelques choses !");
			numero.focus();
			return false;
        }
        if (numero.value != "28/02") {
			alert("Ce n'est pas la bonne info");
			numero.focus();
			return false;
        }
		if (numero.value == "28/02") {
			localStorage.setItem("activity", JSON.stringify([0,1,1,1,1,1,1,1,1,1,1,1,1,0]));
			addpts(10);
        }
        return true;
		break;
    case "kj74d8k":
        var numero = document.forms["RegForm"]["code"];
        if (numero.value == "") {
			alert("Tu dois trouver quelques choses !");
			numero.focus();
			return false;
        }
        if (numero.value != "Grand théâtre" && numero.value != "GRAND THEATRE" && numero.value != "Grand theatre" && numero.value != "Grand Théâtre") {
			alert("Ce n'est pas la bonne info");
			numero.focus();
			return false;
        }
		if (numero.value == "Grand théâtre" || numero.value == "GRAND THEATRE" || numero.value == "Grand theatre" || numero.value == "Grand Théâtre") {
			localStorage.setItem("activity", JSON.stringify([0,1,1,1,1,1,1,1,1,1,1,1,1,1]));
			addpts(10);
        }
        return true;
		break;
    default:
      // code block
  }
}

function addpts(num) {
  localStorage.setItem("score", parseInt(localStorage.getItem("score"))+num);
}

function useindice(refetape, refindice) {
  switch(refetape) {
    case "fr8246k":
	  localStorage.setItem("score", parseInt(localStorage.getItem("score"))-5);
      if (refindice==1) {
        document.getElementById('i1').style ="width:20%;display:inline;";
        document.getElementById('indice1').style ="display:none;";
      }
      else if (refindice==2){
        document.getElementById('i2').style ="width:20%;display:inline;";
        document.getElementById('indice2').style ="display:none;";
      }
      else if (refindice==3){
        document.getElementById('i3').style ="width:20%;display:inline;";
        document.getElementById('indice3').style ="display:none;";
      }
      else if (refindice==4){
        document.getElementById('i4').style ="width:20%;display:inline;";
        document.getElementById('indice4').style ="display:none;"; 
      }
      break;
    case "mp703d5":
	  localStorage.setItem("score", parseInt(localStorage.getItem("score"))-5);
      if (refindice==1) {
        document.getElementById('i1').style ="width:20%;display:inline;";
        document.getElementById('indice1').style ="display:none;";
      }
      else if (refindice==2){
        document.getElementById('i2').style ="width:20%;display:inline;";
        document.getElementById('indice2').style ="display:none;";
      }
      else if (refindice==3){
        document.getElementById('i3').style ="width:20%;display:inline;";
        document.getElementById('indice3').style ="display:none;";
      }
      else if (refindice==4){
        document.getElementById('i4').style ="width:20%;display:inline;";
        document.getElementById('indice4').style ="display:none;"; 
      }
      break;
	case "9h5d35g":
	  localStorage.setItem("score", parseInt(localStorage.getItem("score"))-10);
      if (refindice==1) {
        document.getElementById('i1').style ="width:20%;display:inline;";
        document.getElementById('indice1').style ="display:none;";
      }
      break;
    default:
  }
}

function addCompteurs(){
	document.getElementById("compteur")
}

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

  return h + ':' + m + ':' + s;
}