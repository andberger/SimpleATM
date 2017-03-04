$(document).ready(function(){
	$("#amountField").val("\u00A3 ");
	buttonAbler(false);
});
$("#amountField").on("keydown keypress keyup mousedown mouseup", false);
$("#numberpad").on("click", "li", function(event){
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
	calculateAmount(amount);
});

const money = {
	Notes: [1000,500,200,100,50],
	Coins: [
		{val: 20, diameter: 40},
		{val: 10, diameter: 20},
		{val: 5, diameter: 50},
		{val: 2, diameter: 30},
		{val: 1, diameter: 10},
	]
};

function calculateAmount(totalAmount){

	let amount = totalAmount;
	let notes = [];
	let coins = [];

	for (let note of money.Notes){
		while(amount >= note){
			if(amount >= note){
				notes.push(note);
				amount -= note;
			}
		}
	}

	for (let coin of money.Coins){
		while(amount >= coin.val){
			if(amount >= coin.val){
				coins.push(coin.val);
				amount -= coin.val;
			}
		}
	}

	let moneyBuilder = [...notes, ... coins];

	displayMoney(moneyBuilder);
	console.log(moneyBuilder);
	console.log(moneyBuilder.reduce((acc, val) => acc + val, 0));
}

function displayMoney(moneyToPayOut){
	let minNote = Math.min(...money.Notes);
	for (let m of moneyToPayOut) {
		if(m >= minNote){
			$("<li></li>").text(m).appendTo("#notes");
		}
		else if (m < minNote) {
			let diameter = money.Coins.find(x => x.val == m).diameter;
			if(diameter > 20){
				$("<li></li>").text(m).appendTo("#bigCoins");
			}
			else{
				$("<li></li>").text(m).appendTo("#smallCoins");
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
				buttonAbler(true);
			}
		}
	}
	else{
		if(currVal.length > minLength){
			$("#amountField").val(currVal.slice(0, -1));
		}
		if(currVal.length - 1  == minLength){
			buttonAbler(false);
		}
	}
}

function buttonAbler(enableOrNo){
	if(enableOrNo){
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
