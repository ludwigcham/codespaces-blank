//Initialisation des variables du jeu
function initGame() {
	var nbrctivities = 3;
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
}

//Menu : Récupérer les étapes activées + active popup si besoin
function initMenu() {
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
		document.getElementById("popup").style.display = 'block';
	}

}

//Menu : Désactiver le popup 
function popupNone() {
	document.getElementById("popup").style.display = "none";
	localStorage.setItem("scoreTotal", parseInt(localStorage.getItem("scoreEnCours"))+parseInt(localStorage.getItem("scoreTotal")));
	localStorage.setItem("scoreEnCours",0)
	localStorage.setItem("vainqueur",0)
}

//validation d'une étape
function valid(etapevalidee, score) {
	//Si 1ère étape : initialisation du jeu
	if (etapevalidee===0) {
		initGame();
	} 
	//On signale pour activer le popup
	localStorage.setItem("vainqueur",1);
	//On permet l'accès à l'étape suivante
	var etapes = JSON.parse(localStorage.getItem("etapeActivated"));
	etapes[etapevalidee+1] = 1;
	localStorage.setItem("etapeActivated", JSON.stringify(etapes));
	//Récupération du score et chargement du texte
	localStorage.setItem("scoreEnCours", score);
	switch (etapevalidee) {
		case 0:
			localStorage.setItem("popupTexte", "Mario t'a laissé quelques pièces pour bien commencer !");
			break;
		case 1:
			localStorage.setItem("popupTexte", "Etape 1 validée");
			break;
	}
	console.log("etape validée");
}













  
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

function changecal(){
	var dateauj = new Date().getDate();
	console.log(dateauj)
	var datehier = dateauj-1
	console.log(datehier)
	switch (datehier) {
		case 18: 
			document.getElementById("i3").src="https://cdn.icon-icons.com/icons2/885/PNG/512/18th_icon-icons.com_68905.png";
			break;
		case 19:
			document.getElementById("i3").src="https://cdn.icon-icons.com/icons2/885/PNG/512/19th_icon-icons.com_68917.png";
			break;
		case 20: 
			document.getElementById("i3").src="https://cdn.icon-icons.com/icons2/885/PNG/512/20th_icon-icons.com_68911.png";
			break;
		case 21:
			document.getElementById("i3").src="https://cdn.icon-icons.com/icons2/885/PNG/512/21st_icon-icons.com_68931.png";
			break;
		case 22: 
			document.getElementById("i3").src="https://cdn.icon-icons.com/icons2/885/PNG/512/22nd_icon-icons.com_68934.png";
			break;
		case 23:
			document.getElementById("i3").src="https://cdn.icon-icons.com/icons2/885/PNG/512/23rd_icon-icons.com_68908.png";
			break;
		case 24:
			document.getElementById("i3").src="https://cdn.icon-icons.com/icons2/885/PNG/512/24th_icon-icons.com_68930.png";
			break;
		case 25:
			document.getElementById("i3").src="https://cdn.icon-icons.com/icons2/885/PNG/512/25th_icon-icons.com_68907.png";
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