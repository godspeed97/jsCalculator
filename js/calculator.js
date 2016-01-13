var Calculator = (function () {
	
    var display = '0',
	firstOperand = '0',
	lastKey = '0',
	operator = '+',
	captureModeOn = false,
	memory = '0';
	
	var keyMap = {
		
		'0': processDigit,
		'1': processDigit,
		'2': processDigit,
		'3': processDigit,
		'4': processDigit,
		'5': processDigit,
		'6': processDigit,
		'7': processDigit,
		'8': processDigit,
		'9': processDigit,
		'.': processDot,
		
		'+': processBasicOperator,
		'-': processBasicOperator,
		'*': processBasicOperator,
		'/': processBasicOperator,
		'=': processBasicOperator,
		
		'\u2190': processBackspace,
		'\u221A': processSquareRoot,
		'1/x': processOneOverX,
		'%': processPercent,
		'+/-': processPlusMinus,
		'C': processClear,
		'CE': processClear,
		
		'MC': processMemory,
		'MR': processMemory,
		'MS': processMemory,
		'M+': processMemory,
		'M-': processMemory
		
	};
	
	function processDigit(key) {
		if (!captureModeOn) {
			display = key;
			captureModeOn = true;
		}
		else {
			if (display === '0') {
				if (key !== '0') {
					display = key;
				}
			}
			else {
				display += key;
			}
		}
	}
	
	function processDot() {
		if (!captureModeOn) {
			display = '0.';
			captureModeOn = true;
		}
		else {
			if (display.indexOf(".") === -1) {
				display += '.';
			}
		}
	}
	
	function processBasicOperator(key) {
		captureModeOn = false;
		firstOperand = calculateBasic(firstOperand, display, operator);
		display = firstOperand;
		operator = key;
		if (key === '=') {
			firstOperand = '0';
			operator = '+';
		}
	}
	
	function calculateBasic(firstNum, secondNum, operator) {
		var a = parseFloat(firstNum),
		b = parseFloat(secondNum),
		c;
		switch (operator) {
			case '+':
			c = a + b;
			break;
			case '-':
			c = a - b;
			break;
			case '*':
			c = a * b;
			break;
			case '/':
			c = a / b;
			break;
		}
		return c.toString();
	}
	
	function processPlusMinus() {
		if (display.charAt(0) === '-') {
			display = display.substring(1);
		}
		else {
			display = '-' + display;
		}
	}
	
	function processSquareRoot() {
		display = Math.sqrt(parseFloat(display)).toString();
		captureModeOn = false;
	}
	
	function processOneOverX() {
		display = calculateBasic(1, display, '/');
		captureModeOn = false;
	}
	
	function processPercent() {
		display = calculateBasic(display, 100, '/');
		captureModeOn = false;
	}
	
	function processClear(key) {
		display = '0';
		captureModeOn = false;
		if (key === 'C') {
			operator = '+';
			lastKey = '0';
			firstOperand = '0';
		}
	}
	
	function processBackspace() {
		if (captureModeOn) {
			display = display.substr(0, display.length - 1);
			if (display === '' || display === '-0' || display === '-') {
				display = '0';
			}
		}
	}
	
	function processMemory(key) {
		switch (key) {
			case 'MS':
			memory = display;
			break;
			case 'M+':
			memory = calculateBasic(memory, display, '+');
			break;
			case 'M-':
			memory = calculateBasic(memory, display, '-');
			break;
			case 'MC':
			memory = '0';
			break;
			case 'MR':
			display = memory;
			break;
		}
		captureModeOn = false;
	}
	
	function isDuplicateOperator(key) {
		return (key === lastKey && '+-*/='.indexOf(key) !== -1);
	}
	
	function keyPressed(key) {
		if (!isDuplicateOperator(key)) {
			keyMap[key](key);
		}
		lastKey = key;
		return [display, memory];
	}
	
	return {
		keyPressed: keyPressed
	};

})();