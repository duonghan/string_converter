let btnConvert = $('#btnConvert');
let btnCopy = $('#btnCopy');

let inputString = $('#inputString'); 
let outputString = $('#outputString');

let optionalMethod = $('#optionalMethod');
let alertCopyResult = $('#alertCopyResult');

let strOutput;

// chrome.storage.sync.get('color', function(data){
//     changeColor.style.backgroundColor = data.color;
//     changeColor.setAttribute('value', data.color);
// })

// changeColor.onclick = function(element) {
//     let color = element.target.value;

//     chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//         chrome.tabs.executeScript(
//             tabs[0].id,
//             {code: 'document.body.style.backgroundColor = "' + color + '";'}
//         );
//     })
// }

// optionalMethod.onload = function() {
// 	method = chrome.storage.sync.get('method', function(data) {
// 		alert (data.method);
// 		optionalMethod.val(data.method);
// 		console.log('Value currently is ' + data.method);
// 	});
// }
alertCopyResult.hide();

chrome.storage.sync.get('method', function(data) {
	optionalMethod.val(data.method);
});

optionalMethod.on('change', function(){
	chrome.storage.sync.set({method: optionalMethod.val()}, function(){
		console.log('Method is saved!!!');
	});
})

btnConvert.on('click', function(element) {
    if (inputString.val()) {
		outputString.val(handleConvert(inputString.val(), optionalMethod.val()));
		outputString.select();
		document.execCommand("copy");
		alertCopyResult.show();
		alertCopyResult.text("Copied to clipboard!");
	}
});

function handleConvert(str, method) {
	switch(method.trim()) {
		case "Base64 Decoder":
			strOutput = base64Decode(str);
			break;
		case "Base64 Encoder":
			strOutput = base64Encode(str);
			break;
		case "Hex Decoder":
			strOutput = hexDecode(str);
			break;
		case "Hex Encoder":
			strOutput = hexEncode(str);
			break;
		case "Url Decoder":
			strOutput = decodeURIComponent(str);
			break;
		case "Url Encoder":
			strOutput = encodeURIComponent(str);
			break;
		case "Html Decoder":
			strOutput = htmlDecode(str);
			break;
		case "Html Encoder":
			strOutput = htmlEncode(str);
			break;
		default:
	}
	return strOutput;
}

function hexDecode(str) {
    var hex  = str.toString().replace(/\s/g,'');
	var result = '';
	for (var n = 0; n < hex.length; n += 2) {
		result += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
	}
	return result;
}

function hexEncode(str) {
    var arr1 = [];
	for (var n = 0, l = str.length; n < l; n ++) 
     {
		var hex = Number(str.charCodeAt(n)).toString(16);
		arr1.push(hex);
	 }
	return arr1.join(' ');
}

function base64Encode(str) {
	return window.atob(str);
}

function base64Decode(str) {
	return window.btoa(str);
}

function htmlEncode(str) {
	return str.replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
		return '&#'+i.charCodeAt(0)+';';
	 });
}

function htmlDecode(str) {
	return str.replace(/&#([0-9]{1,3});/gi, function(match, num) {
        return String.fromCharCode(parseInt(num));
    });
}