// ==UserScript==
// @name        Evolution
// @namespace   bazinio
// @include     https://www.bazinio.com/evolution.c
// @downloadURL	https://github.com/AurelienHarle/Script---GreaseMonkey/master/bazinio/Evolution.user.js
// @updateURL	https://github.com/AurelienHarle/Script---GreaseMonkey/master/bazinio/Evolution.user.js
// @version     1.01a
// @grant       none
// ==/UserScript==

/**
Monte de niveau distribue les xp TODO pour tout les niveau + controle depuis le menu
*/
function evo(){
	
	const niveauObjectif = 13;
	
	niveau = document.getElementsByClassName('lfiche')[1].innerHTML;
	niveau = niveau.split('<')[0];
	niveau = parseInt(niveau.replace(/N/g,""));

	if(localStorage.xpDistr == "false"){
		
		if(niveau < niveauObjectif){
		
			localStorage.xpDistr = "false";
			document.getElementsByName('up')[0].click();
		
		}else if(niveau == niveauObjectif){
		
			force = document.getElementById('forc');
			habilite = document.getElementById('h');
			resistance = document.getElementById('r');
			esquive = document.getElementById('e');
			
			force.value = 15;
			habilite.value = 18;
			resistance.value = 10;
			esquive.value = 10;
			localStorage.xpDistr = "true";
			document.getElementsByName('goxp')[0].click();
			
		}
	}else{
		
		setTimeout(changementCompte,randomTimeout);
		
	}
}

/**
Changement de compte
*/
function changementCompte(){
	
	localStorage.xpDistr = "false";
	
	accountList = document.getElementById('chat').getElementsByTagName('a');
	currentAccount = document.getElementsByClassName('lfiche')[0].getElementsByTagName('a')[0].innerHTML;
	currentNumber = parseInt(currentAccount.split('e')[1]);
	if(currentNumber == 200){
		nextNumber = 1
	}else{
		nextNumber = currentNumber + 1;
	}
	nextAccount = "Suicide" + nextNumber;
	for(i = 0;i < accountList.length;i++){
		
		if(accountList[i].innerHTML ==  nextAccount){
			accountList[i].click();
		}
	}
}
	
/**
Génere un chiffre aleatoire entre 750 et 2000, et est retourné pour generé un timeout aleatoire en milliseconde
*/
function randomTimeout(){
	
	var max = 2550;
	var min = 950;
    var randTimeout = min + (max-min+1) * Math.random();
    randTimeout = Math.trunc(randTimeout)
	return randTimeout;
}

setTimeout(evo,randomTimeout);