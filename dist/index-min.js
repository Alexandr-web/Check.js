"use strict";function _toConsumableArray(e){return _arrayWithoutHoles(e)||_iterableToArray(e)||_unsupportedIterableToArray(e)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return _arrayLikeToArray(e,t);var i=Object.prototype.toString.call(e).slice(8,-1);return"Object"===i&&e.constructor&&(i=e.constructor.name),"Map"===i||"Set"===i?Array.from(e):"Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?_arrayLikeToArray(e,t):void 0}}function _iterableToArray(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}function _arrayWithoutHoles(e){if(Array.isArray(e))return _arrayLikeToArray(e)}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var i=0,n=new Array(t);i<t;i++)n[i]=e[i];return n}function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function _createClass(e,t,i){return t&&_defineProperties(e.prototype,t),i&&_defineProperties(e,i),e}var Valval=function(){function Valval(){_classCallCheck(this,Valval),this.options={},this.regexp_message="",this.regexp_message_only_rus="",this.regexp_message_only_en="",this.regexp_password="",this.regexp_password_only_rus="",this.regexp_password_only_numbers="",this.regexp_password_only_en="",this.regexp_mail="",this.regexp_date="",this.regexp_tel="",this.regexp_required="",this.regexp_repeat_password="",this.regexp_date_only_slash="",this.regexp_date_only_dot="",this.regexp_date_only_hyphen="",this.regexp_name="",this.regexp_name_only_en="",this.regexp_name_only_rus="",this.invalidSize=0}return _createClass(Valval,[{key:"getOptions",value:function(){return this.options}},{key:"getInvalidSize",value:function(){return this.invalidSize}},{key:"submitForm",value:function(e){var t=this,i=e.form;i.addEventListener("submit",function(n){e.preventDefault&&n.preventDefault(),t.outputCallbackWhenElementValid(e),t.outputCallbackWhenElementInvalid(e),t.invalidSize?(e.required&&t.checkRequired(e),e.button&&("object"===_typeof(e.classInvalid)?e.classInvalid.map(function(t){return e.element.classList.add(t)}):e.element.classList.add(e.classInvalid),"object"===_typeof(e.classValid)?e.classValid.map(function(t){return e.element.classList.remove(t)}):e.element.classList.remove(e.classValid),e.element.value?e.element.value=e.textWhenInvalid:e.element.innerText=e.textWhenInvalid)):(i.submit(),e.button&&("object"===_typeof(e.classInvalid)?e.classInvalid.map(function(t){return e.element.classList.remove(t)}):e.element.classList.remove(e.classInvalid),"object"===_typeof(e.classValid)?e.classValid.map(function(t){return e.element.classList.add(t)}):e.element.classList.add(e.classValid),e.element.value?e.element.value=e.textWhenValid:e.element.innerText=e.textWhenValid))})}},{key:"checkRequired",value:function(e){this.regexp_required.test(e.element.value)||(e.valid=!1,this.checkValid(e),this.checkValidationElement(e),this.invalidSize=this.getInvalidElementsSize(e),this.outputCallbackWhenElementValid(e),this.outputCallbackWhenElementInvalid(e))}},{key:"getInvalidElementsSize",value:function(e){var t=new Set;for(var i in e.objOptions)!e.objOptions[i].valid&&e.objOptions[i].required&&t.add(e.objOptions[i]);return t.size}},{key:"checkValidationElement",value:function(e){if(e.validationElement&&e.validationElement.have){var t=document.querySelector(e.validationElement.selectorEl);e.valid?(t.innerText=e.validationElement.textWhenValid,"object"===_typeof(e.validationElement.classInvalid)?e.validationElement.classInvalid.map(function(e){return t.classList.remove(e)}):t.classList.remove(e.validationElement.classInvalid||"valval-invalid-el"),"object"===_typeof(e.validationElement.classValid)?e.validationElement.classValid.map(function(e){return t.classList.add(e)}):t.classList.add(e.validationElement.classValid||"valval-valid-el")):(t.innerText=e.validationElement.textWhenInvalid,"object"===_typeof(e.validationElement.classInvalid)?e.validationElement.classInvalid.map(function(e){return t.classList.add(e)}):t.classList.add(e.validationElement.classInvalid||"valval-invalid-el"),"object"===_typeof(e.validationElement.classValid)?e.validationElement.classValid.map(function(e){return t.classList.remove(e)}):t.classList.remove(e.validationElement.classValid||"valval-valid-el"))}}},{key:"validationElement",value:function(e,t,i){(e=e||/^''$/).test(t)?(i.valid=!0,this.checkValid(i),this.checkValidationElement(i),this.invalidSize=this.getInvalidElementsSize(i),this.outputCallbackWhenElementValid(i),this.outputCallbackWhenElementInvalid(i)):(i.valid=!1,this.checkValid(i),this.checkValidationElement(i),this.invalidSize=this.getInvalidElementsSize(i),this.outputCallbackWhenElementValid(i),this.outputCallbackWhenElementInvalid(i))}},{key:"checkValid",value:function(e){e.valid?("object"===_typeof(e.classInvalid)?e.classInvalid.map(function(t){return e.element.classList.remove(t)}):e.element.classList.remove(e.classInvalid),"object"===_typeof(e.classValid)?e.classValid.map(function(t){return e.element.classList.add(t)}):e.element.classList.add(e.classValid)):("object"===_typeof(e.classInvalid)?e.classInvalid.map(function(t){return e.element.classList.add(t)}):e.element.classList.add(e.classInvalid),"object"===_typeof(e.classValid)?e.classValid.map(function(t){return e.element.classList.remove(t)}):e.element.classList.remove(e.classValid))}},{key:"outputCallbackWhenElementValid",value:function(e){e.handlerWhenValidElement&&e.valid&&e.handlerWhenValidElement()}},{key:"outputCallbackWhenElementInvalid",value:function(e){e.handlerWhenInvalidElement&&(e.valid||e.handlerWhenInvalidElement())}},{key:"getRegularExpressions",value:function getRegularExpressions(options){for(var item in options)options[item].password&&(this.regexp_password=eval("/^.{".concat(options[item].minLength,",").concat(options[item].maxLength,"}$/")),this.regexp_password_only_rus=eval("/^[А-Я|а-я]{".concat(options[item].minLength,",").concat(options[item].maxLength,"}$/")),this.regexp_password_only_numbers=eval("/^\\d{".concat(options[item].minLength,",").concat(options[item].maxLength,"}$/")),this.regexp_password_only_en=eval("/^[A-Z|a-z]{".concat(options[item].minLength,",").concat(options[item].maxLength,"}$/"))),options[item].mail&&(this.regexp_mail=/^[A-Z|a-z|\d|\_|\-|\.]{0,63}@[A-Z|a-z]{1,63}\.[A-Z|a-z]{2,63}$/),options[item].date&&(this.regexp_date=/^(\d{2,2}[\/|\.|\-]){2,2}\d{4,4}$/,this.regexp_date_only_slash=/^(\d{2,2}\/){2,2}\d{4,4}$/,this.regexp_date_only_dot=/^(\d{2,2}\.){2,2}\d{4,4}$/,this.regexp_date_only_hyphen=/^(\d{2,2}\-){2,2}\d{4,4}$/),options[item].tel&&(this.regexp_tel=eval("/^\\d{".concat(options[item].minLength,",").concat(options[item].maxLength,"}$/"))),options[item].name&&(this.regexp_name=eval("/^[a-z|A-Z|а-я|А-Я]{".concat(options[item].minLength,",").concat(options[item].maxLength,"}$/")),this.regexp_name_only_rus=eval("/^[А-Я|а-я]{".concat(options[item].minLength,",").concat(options[item].maxLength,"}$/")),this.regexp_name_only_en=eval("/^[A-Z|a-z]{".concat(options[item].minLength,",").concat(options[item].maxLength,"}$/"))),this.regexp_required=/.{1,}/}},{key:"getDefaultParams",value:function(e){for(var t in e)e[t].element=document.querySelector('[data-valval="'.concat(t,'"]')),e[t].preventDefault=!0,e[t].form=e[t].element.form,e[t].elementsInForm=_toConsumableArray(e[t].element.form.elements).filter(function(e){return"submit"!==e.type}),e[t].objOptions=e,e[t].valid=!e[t].required,e[t].button||(e[t].required=!!e[t].required&&e[t].required,e[t].classValid=e[t].classValid?e[t].classValid:"valval-valid",e[t].classInvalid=e[t].classInvalid?e[t].classInvalid:"valval-invalid",e[t].submit=_toConsumableArray(e[t].element.form.elements).find(function(e){return"submit"===e.type}),e[t].validationElement=e[t].validationElement?e[t].validationElement:{},e[t].handlerWhenInvalidElement=!!e[t].handlerWhenInvalidElement&&e[t].handlerWhenInvalidElement,e[t].handlerWhenValidElement=!!e[t].handlerWhenValidElement&&e[t].handlerWhenValidElement),e[t].date||e[t].mail||e[t].repeatPassword||e[t].button||(e[t].minLength=e[t].minLength?e[t].minLength:1,e[t].maxLength=e[t].maxLength?e[t].maxLength:""),e[t].button&&(e[t].valid=!0,e[t].classInvalid=e[t].classInvalid?e[t].classInvalid:"valval-invalid-btn",e[t].classValid=e[t].classValid?e[t].classValid:"valval-valid-btn",e[t].element.value?(e[t].textWhenValid=e[t].textWhenValid?e[t].textWhenValid:e[t].element.value,e[t].textWhenInvalid=e[t].textWhenInvalid?e[t].textWhenInvalid:e[t].element.value):(e[t].textWhenValid=e[t].textWhenValid?e[t].textWhenValid:e[t].element.innerText,e[t].textWhenInvalid=e[t].textWhenInvalid?e[t].textWhenInvalid:e[t].element.innerText))}},{key:"getSizeOptions",value:function(e){for(var t in e){var i=new Set;for(var n in e[t].objOptions)i.add(n);this.invalidSize=i.size}}},{key:"start",value:function start(options){var _this2=this;if("object"===_typeof(options)){this.getDefaultParams(options),this.getSizeOptions(options),this.getRegularExpressions(options),this.options=options;var _loop=function _loop(item){if(!options[item].button){options[item].element.addEventListener("input",function(){var value=options[item].element.value;if(!options[item].password||options[item].onlyRus||options[item].onlyNumbers||options[item].onlyEn||_this2.validationElement(_this2.regexp_password,value,options[item]),options[item].password&&options[item].contentInPassword){var items=options[item].contentInPassword.join("|");_this2.regexp_password=eval("/".concat(items,"/g"));var size_options=options[item].contentInPassword.length,size_search=value.match(_this2.regexp_password)?value.match(_this2.regexp_password).length:0;options[item].maxLength?size_search===size_options&&value.length>=options[item].minLength&&value.length<=options[item].maxLength?(options[item].valid=!0,_this2.checkValid(options[item]),_this2.checkValidationElement(options[item]),_this2.invalidSize=_this2.getInvalidElementsSize(options[item]),_this2.outputCallbackWhenElementValid(options[item]),_this2.outputCallbackWhenElementInvalid(options[item])):(options[item].valid=!1,_this2.checkValid(options[item]),_this2.checkValidationElement(options[item]),_this2.invalidSize=_this2.getInvalidElementsSize(options[item]),_this2.outputCallbackWhenElementValid(options[item]),_this2.outputCallbackWhenElementInvalid(options[item])):size_search===size_options&&value.length>=options[item].minLength?(options[item].valid=!0,_this2.checkValid(options[item]),_this2.checkValidationElement(options[item]),_this2.invalidSize=_this2.getInvalidElementsSize(options[item]),_this2.outputCallbackWhenElementValid(options[item]),_this2.outputCallbackWhenElementInvalid(options[item])):(options[item].valid=!1,_this2.checkValid(options[item]),_this2.checkValidationElement(options[item]),_this2.invalidSize=_this2.getInvalidElementsSize(options[item]),_this2.outputCallbackWhenElementValid(options[item]),_this2.outputCallbackWhenElementInvalid(options[item]))}if(options[item].password&&options[item].onlyRus&&_this2.validationElement(_this2.regexp_password_only_rus,value,options[item]),options[item].password&&options[item].onlyNumbers&&_this2.validationElement(_this2.regexp_password_only_numbers,value,options[item]),options[item].password&&options[item].onlyEn&&_this2.validationElement(_this2.regexp_password_only_en,value,options[item]),options[item].mail&&_this2.validationElement(_this2.regexp_mail,value,options[item]),!options[item].date||options[item].onlySlash||options[item].onlyDot||options[item].onlyHyphen||_this2.validationElement(_this2.regexp_date,value,options[item]),options[item].date&&options[item].onlySlash&&_this2.validationElement(_this2.regexp_date_only_slash,value,options[item]),options[item].date&&options[item].onlyDot&&_this2.validationElement(_this2.regexp_date_only_dot,value,options[item]),options[item].date&&options[item].onlyHyphen&&_this2.validationElement(_this2.regexp_date_only_hyphen,value,options[item]),options[item].tel&&_this2.validationElement(_this2.regexp_tel,value,options[item]),options[item].message&&options[item].onlyEn&&_this2.validationElement(_this2.regexp_message_only_en,value,options[item]),options[item].message&&options[item].onlyRus&&_this2.validationElement(_this2.regexp_message_only_rus,value,options[item]),options[item].repeatPassword)for(var i in options[item].objOptions)i===options[item].repeatAt&&(options[item].objOptions[i].element.value?(_this2.regexp_repeat_password=eval("/^".concat(options[item].objOptions[i].element.value,"$/")),_this2.validationElement(_this2.regexp_repeat_password,value,options[item])):(options[item].valid=!1,_this2.checkValid(options[item]),_this2.checkValidationElement(options[item]),_this2.invalidSize=_this2.getInvalidElementsSize(options[item]),_this2.outputCallbackWhenElementValid(options[item]),_this2.outputCallbackWhenElementInvalid(options[item]),options[item].objOptions[i].valid=!1,_this2.checkValid(options[item].objOptions[i]),_this2.checkValidationElement(options[item].objOptions[i]),_this2.invalidSize=_this2.getInvalidElementsSize(options[item].objOptions[i]),_this2.outputCallbackWhenElementValid(options[item].objOptions[i]),_this2.outputCallbackWhenElementInvalid(options[item].objOptions[i])));!options[item].name||options[item].onlyRus||options[item].onlyEn||options[item].bigFirstSymbol||_this2.validationElement(_this2.regexp_name,value,options[item]),options[item].name&&options[item].bigFirstSymbol&&(_this2.regexp_name=eval("/^[A-Z|А-Я]{1,1}[a-z|а-я]{".concat(options[item].minLength,",").concat(options[item].maxLength,"}$/")),_this2.validationElement(_this2.regexp_name,value,options[item])),options[item].name&&options[item].onlyEn&&(_this2.regexp_name_only_en=eval("/^[A-Z|a-z]{".concat(options[item].minLength,",").concat(options[item].maxLength,"}$/")),_this2.validationElement(_this2.regexp_name_only_en,value,options[item])),options[item].name&&options[item].onlyEn&&options[item].bigFirstSymbol&&(_this2.regexp_first_name_only_en=eval("/^[A-Z]{1,1}[a-z]{".concat(options[item].minLength,",").concat(options[item].maxLength,"}$/")),_this2.validationElement(_this2.regexp_first_name_only_en,value,options[item])),options[item].name&&options[item].onlyRus&&(_this2.regexp_name_only_rus=eval("/^[А-Я|а-я]{".concat(options[item].minLength,",").concat(options[item].maxLength,"}$/")),_this2.validationElement(_this2.regexp_name_only_rus,value,options[item])),options[item].name&&options[item].onlyRus&&options[item].bigFirstSymbol&&(_this2.regexp_name_only_rus=eval("/^[А-Я]{1,1}[а-я]{".concat(options[item].minLength,",").concat(options[item].maxLength,"}$/")),_this2.validationElement(_this2.regexp_name_only_rus,value,options[item])),options[item].message&&(options[item].maxLength?value.length<=options[item].maxLength&&value.length>=options[item].minLength?(options[item].valid=!0,_this2.checkValid(options[item]),_this2.checkValidationElement(options[item]),_this2.invalidSize=_this2.getInvalidElementsSize(options[item]),_this2.outputCallbackWhenElementValid(options[item]),_this2.outputCallbackWhenElementInvalid(options[item])):(options[item].valid=!1,_this2.checkValid(options[item]),_this2.checkValidationElement(options[item]),_this2.invalidSize=_this2.getInvalidElementsSize(options[item]),_this2.outputCallbackWhenElementValid(options[item]),_this2.outputCallbackWhenElementInvalid(options[item])):value.length>=options[item].minLength?(options[item].valid=!0,_this2.checkValid(options[item]),_this2.checkValidationElement(options[item]),_this2.invalidSize=_this2.getInvalidElementsSize(options[item]),_this2.outputCallbackWhenElementValid(options[item]),_this2.outputCallbackWhenElementInvalid(options[item])):(options[item].valid=!1,_this2.checkValid(options[item]),_this2.checkValidationElement(options[item]),_this2.invalidSize=_this2.getInvalidElementsSize(options[item]),_this2.outputCallbackWhenElementValid(options[item]),_this2.outputCallbackWhenElementInvalid(options[item])))});var _loop2=function _loop2(i){i===options[item].repeatAt&&options[item].objOptions[i].element.addEventListener("input",function(){options[item].objOptions[i].element.value?options[item].repeatPassword&&(_this2.regexp_repeat_password=eval("/^".concat(options[item].objOptions[i].element.value,"$/")),_this2.validationElement(_this2.regexp_repeat_password,options[item].element.value,options[item])):(options[item].repeatPassword&&(options[item].valid=!1,_this2.checkValid(options[item]),_this2.checkValidationElement(options[item]),_this2.invalidSize=_this2.getInvalidElementsSize(options[item]),_this2.outputCallbackWhenElementValid(options[item]),_this2.outputCallbackWhenElementInvalid(options[item])),options[item].objOptions[i].valid=!1,_this2.checkValid(options[item].objOptions[i]),_this2.checkValidationElement(options[item].objOptions[i]),_this2.invalidSize=_this2.getInvalidElementsSize(options[item].objOptions[i]),_this2.outputCallbackWhenElementValid(options[item].objOptions[i]),_this2.outputCallbackWhenElementInvalid(options[item].objOptions[i]))})};for(var i in options[item].objOptions)_loop2(i)}_this2.submitForm(options[item])};for(var item in options)_loop(item)}return this}}]),Valval}();module.exports.Valval=Valval;