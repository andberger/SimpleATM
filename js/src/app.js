const BACKGROUND_BLUE_COLOR = "#2bbed3";
const TEXT_COLOR = "white";
const POUND_SYMBOL = "\u00A3 ";

const money = {
	notes: [1000,500,200,100,50],
	coins: [
		{val: 20, diameter: 40},
		{val: 10, diameter: 20},
		{val: 5, diameter: 50},
		{val: 2, diameter: 30},
		{val: 1, diameter: 10},
	]
};

$(document).ready(initializeApplication());

function initializeApplication(){
	setUpAmountField();
	setUpEventHandlers();
}

function setUpAmountField(){
	$("#amountField").val(POUND_SYMBOL);
	enableSubmit(false);
	$("#amountField").on("keydown keypress keyup mousedown mouseup", false);
}

function setUpEventHandlers(){
	$("#numberpad").on("click tap", "li", onNumberPadClick);
	$("#submit-button").on("click", onSubmitButtonClick);
	$("#back-button").on("click", onBackButtonClick);
}


function onNumberPadClick(){
	const pushedButton = event.target;

	highlightButton(pushedButton);
	setTimeout(() => unhighlightButton(pushedButton), 100);

	updateAmount(pushedButton.innerText);
}

function highlightButton(button){
	button.style.background = TEXT_COLOR;
	button.style.color = BACKGROUND_BLUE_COLOR;
}

function unhighlightButton(button){
	button.style.background = BACKGROUND_BLUE_COLOR;
	button.style.color = TEXT_COLOR;
}

function onSubmitButtonClick(){
	const amount = getAmount();
	$("#amount").text(POUND_SYMBOL + amount);
	$("#amountField").val(POUND_SYMBOL);
	enableSubmit(false);
	$(".withdrawal ul").empty();
	$("#atm-interface").hide();
	$("#withdrawal-interface").show();
	let denominations = calculateDenominations(amount);
	displayWithdrawal(denominations);
}

function onBackButtonClick(){
	$("#atm-interface").show();
	$("#withdrawal-interface").hide();
}

function updateAmount(num){
	const maxLength = 6;
	const minLength = 2;
	let currVal = $("#amountField").val();
	if(Array.from("0123456789").indexOf(num) > -1){
		if(currVal.length < maxLength){
			if(currVal.length != minLength || num != "0"){
				$("#amountField").val(currVal + num);
				enableSubmit(true);
			}
		}
	}
	else{
		if(currVal.length > minLength){
			$("#amountField").val(currVal.slice(0, -1));
		}
		if(currVal.length - 1  == minLength){
			enableSubmit(false);
		}
	}
}

function enableSubmit(enable){
	if(enable){
		$("#submit-button").prop("disabled", false);
		$("#submit-button").css("opacity", "1.0");
	}
	else{
		$("#submit-button").prop("disabled", true);
		$("#submit-button").css("opacity", "0.5");
	}
}

function getAmount(){
	let amount = $("#amountField").val();
	//remove the pound signal, hence the slice
	return Number(amount.slice(2));
}

function calculateDenominations(totalAmount){

	let amount = totalAmount;
	let notes = [];
	let coins = [];

	for (const note of money.notes){
		while(amount >= note){
			if(amount >= note){
				notes.push(note);
				amount -= note;
			}
		}
	}

	for (const coin of money.coins){
		while(amount >= coin.val){
			if(amount >= coin.val){
				coins.push(coin.val);
				amount -= coin.val;
			}
		}
	}

	let denominations = [...notes, ...coins];
	return denominations;
}

function displayWithdrawal(denominations){
	const minNote = Math.min(...money.notes);
	let countMoney = {};
	let moneyToPayOut = Array.from(new Set(denominations));

	//Count the number of occurrences for each note and each coin.
	denominations.forEach( x => {countMoney[x] = (countMoney[x] || 0) + 1;} );

	for (const m of moneyToPayOut) {
		if(m >= minNote){
			$("<li></li>").html("<span></span>" + countMoney[m] + " x " + m).appendTo("#notes");
		}
		else if (m < minNote) {
			const diameter = money.coins.find(x => x.val == m).diameter;
			if(diameter > 20){
				$("<li></li>").html("<span></span>" + countMoney[m] + " x " + m).appendTo("#bigCoins");
			}
			else{
				$("<li></li>").html("<span></span>" + countMoney[m] + " x " + m).appendTo("#smallCoins");
			}
		}
	}
}
