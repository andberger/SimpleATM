$(document).ready(function(){
	$("#amountField").val("\u00A3 ");
	buttonAbler(false);
});
$("#amountField").on("keydown keypress keyup mousedown mouseup", false);
$("#numberpad").on("click", "li", function(event){
	let pushedButton = event.target;
	function buttonClick(btn, btnBackground, btnNumber){
		btn.style.background = btnBackground;
		btn.style.color = btnNumber;
	}
	buttonClick(pushedButton, "white", "#2bbed3");
	setTimeout(() => buttonClick(pushedButton, "#2bbed3", "white"), 100);

	updateAmount(pushedButton.innerText);
});
$("#submitButton").on("click", function(){
	let amount = getAmount();
	$("#amount").text("\u00A3 " + amount);
});

function updateAmount(num){
	let maxLength = 6;
	let minLength = 2;
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
