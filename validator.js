//doi tuong
function Validator(options) {
	function validate(inputElement, rule) {
		var errorElement = inputElement.parentElement.querySelector(
			".form-message"
		);
		var errorMessage = rule.test(inputElement.value);

		if (errorMessage) {
			errorElement.innerText = errorMessage;
			inputElement.parentElement.classList.add("invalid");
		} else {
			errorElement.innerText = "";
			inputElement.parentElement.classList.remove("invalid");
		}
	}
	//lay element
	var formElement = document.querySelector(options.form);

	if (formElement) {
		options.rules.forEach(function(rule) {
			var inputElement = formElement.querySelector(rule.selector);

			if (inputElement) {
				//xu ly blủ khỏi input
				inputElement.onblur = function() {
					validate(inputElement, rule);
				};
				//xy ly moi khi nhap input
				inputElement.oninput = function() {
					var errorElement = inputElement.parentElement.querySelector(
						options.errorSelector
					);
					errorElement.innerText = "";
					inputElement.parentElement.classList.remove("invalid");
				};
			}
		});
	}
}
//dinh nghia rule
Validator.isRequired = function(selector) {
	return {
		selector: selector,
		test: function(value) {
			return value.trim() ? undefined : "Please you must input here !";
		}
	};
};

Validator.isEmail = function(selector) {
	return {
		selector: selector,
		test: function(value) {
			var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
			return regex.test(value)
				? undefined
				: "Please you must input email here !";
		}
	};
};
Validator.isMobile = function(selector) {
	return {
		selector: selector,
		test: function(value) {
			return value.trim() ? undefined : "Input phone here!";
		}
	};
};
