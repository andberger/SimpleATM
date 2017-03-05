$(document).ready(function(){
	$("#amountField").val("\u00A3 ");
	enableSubmit(false);
});
$("#amountField").on("keydown keypress keyup mousedown mouseup", false);
$("#numberpad").on("click tap", "li", function(event){
	let pushedButton = event.target;
	let buttonClick = (btn, btnBackground, btnNumber) => {
		btn.style.background = btnBackground;
		btn.style.color = btnNumber;
	};
	buttonClick(pushedButton, "white", "#2bbed3");
	setTimeout(() => buttonClick(pushedButton, "#2bbed3", "white"), 100);

	updateAmount(pushedButton.innerText);
});
$("#submitButton").on("click", function(){
	let amount = getAmount();
	$("#amount").text("\u00A3 " + amount);
	$("#amountField").val("\u00A3 ");
	enableSubmit(false);
	$(".withdrawal ul").empty();
	$("#atmInterface").hide();
	$("#withdrawalInterface").show();
	calculateDenominations(amount);
});
$("#backButton").on("click", function(){
	$("#atmInterface").show();
	$("#withdrawalInterface").hide();
});

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

function calculateDenominations(totalAmount){

	let amount = totalAmount;
	let notes = [];
	let coins = [];

	for (let note of money.notes){
		while(amount >= note){
			if(amount >= note){
				notes.push(note);
				amount -= note;
			}
		}
	}

	for (let coin of money.coins){
		while(amount >= coin.val){
			if(amount >= coin.val){
				coins.push(coin.val);
				amount -= coin.val;
			}
		}
	}

	let denominations = [...notes, ...coins];
	displayWithdrawal(denominations);
}

function displayWithdrawal(denominations){
	let minNote = Math.min(...money.notes);
	let countMoney = {};
	let moneyToPayOut = Array.from(new Set(denominations));

	denominations.forEach( x => {countMoney[x] = (countMoney[x] || 0) + 1;} );

	for (let m of moneyToPayOut) {
		if(m >= minNote){
			$("<li></li>").html("<span></span>" + countMoney[m] + " x " + m).appendTo("#notes");
		}
		else if (m < minNote) {
			let diameter = money.coins.find(x => x.val == m).diameter;
			if(diameter > 20){
				$("<li></li>").html("<span></span>" + countMoney[m] + " x " + m).appendTo("#bigCoins");
			}
			else{
				$("<li></li>").html("<span></span>" + countMoney[m] + " x " + m).appendTo("#smallCoins");
			}
		}
	}
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
		$("#submitButton").prop("disabled", false);
		$("#submitButton").css("opacity", "1.0");
	}
	else{
		$("#submitButton").prop("disabled", true);
		$("#submitButton").css("opacity", "0.5");
	}
}

function getAmount(){
	let amount = $("#amountField").val();
	return Number(amount.slice(2));
}
