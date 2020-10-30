"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Valval = /*#__PURE__*/function () {
  function Valval() {
    _classCallCheck(this, Valval);

    this.all_options = ['mail', 'date', 'password', 'tel', 'firstName', 'lastName', 'repeatPassword'];
    this.options = {};
    this.regexp_password = '';
    this.regexp_password_only_rus = '';
    this.regexp_password_only_numbers = '';
    this.regexp_password_only_en = '';
    this.regexp_mail = '';
    this.regexp_date = '';
    this.regexp_tel = '';
    this.regexp_required = '';
    this.regexp_repeat_password = '';
    this.regexp_date_only_slash = '';
    this.regexp_date_only_dot = '';
    this.regexp_date_only_hyphen = '';
    this.regexp_first_name = '';
    this.regexp_first_name_only_en = '';
    this.regexp_first_name_only_rus = '';
    this.regexp_last_name = '';
    this.regexp_last_name_only_en = '';
    this.regexp_last_name_only_rus = '';
    this.invalidSize = 0;
  }

  _createClass(Valval, [{
    key: "submitForm",
    value: function submitForm(item) {
      var _this = this;

      var form = item.form;
      form.addEventListener('submit', function (event) {
        item.preventDefault && event.preventDefault();

        if (!_this.invalidSize) {
          form.submit();
        } else {
          if (item.required) {
            _this.checkRequired(item);
          }
        }
      });
    }
  }, {
    key: "checkRequired",
    value: function checkRequired(item) {
      if (!this.regexp_required.test(item.element.value)) {
        item.valid = false;
        this.checkValid(item.classInvalid, item.classValid, item, item.element);
        this.checkValidationElement(item);
        this.invalidSize = this.addInvalidElementsInArray(item);
      }
    }
  }, {
    key: "getOptions",
    value: function getOptions() {
      return this.options;
    }
  }, {
    key: "addInvalidElementsInArray",
    value: function addInvalidElementsInArray(item) {
      var set = new Set();

      for (var i in item.objOptions) {
        !item.objOptions[i].valid && set.add(item.objOptions[i]);
      }

      return set.size;
    }
  }, {
    key: "checkValidationElement",
    value: function checkValidationElement(item) {
      if (item.validationElement) {
        if (item.validationElement.have) {
          var validationEl = document.querySelector(item.validationElement.selectorEl);

          if (item.valid) {
            validationEl.innerText = item.validationElement.textWhenValid;
            validationEl.classList.add(item.validationElement.classValid || 'valval-valid-el');
            validationEl.classList.remove(item.validationElement.classInvalid || 'valval-invalid-el');
          } else {
            validationEl.innerText = item.validationElement.textWhenInvalid;
            validationEl.classList.remove(item.validationElement.classValid || 'valval-valid-el');
            validationEl.classList.add(item.validationElement.classInvalid || 'valval-invalid-el');
          }
        }
      }
    }
  }, {
    key: "validationElement",
    value: function validationElement(regexp, value, item) {
      regexp = regexp ? regexp : /^''$/;

      if (regexp.test(value)) {
        item.valid = true;
        this.checkValid(item.classInvalid, item.classValid, item, item.element);
        this.checkValidationElement(item);
        this.invalidSize = this.addInvalidElementsInArray(item);
      } else {
        item.valid = false;
        this.checkValid(item.classInvalid, item.classValid, item, item.element);
        this.checkValidationElement(item);
        this.invalidSize = this.addInvalidElementsInArray(item);
      }
    }
  }, {
    key: "checkValid",
    value: function checkValid(invalidClass, validClass, item, el) {
      console.log();

      if (item.valid) {
        el.classList.add(validClass);
        el.classList.remove(invalidClass);
      } else {
        el.classList.remove(validClass);
        el.classList.add(invalidClass);
      }
    }
  }, {
    key: "start",
    value: function start() {
      var _this2 = this;

      var options = arguments[0];

      var _loop = function _loop(item) {
        if (_this2.all_options.includes(item)) {
          var el = document.querySelector(options[item].selectorEl); // Default params
          // Prevent default

          options[item].preventDefault = true; // Element

          if (el.className.includes(options[item].selectorEl.replace(/\./, '')) || el.id.includes(options[item].selectorEl.replace(/\#/, ''))) {
            options[item].element = el;
          } else {
            options[item].element = false;
          } // Form


          options[item].form = options[item].element.form; // Elements in form

          options[item].elementsInForm = _toConsumableArray(options[item].element.form.elements).filter(function (item) {
            return item.type !== 'submit';
          }); // Submit

          options[item].submit = _toConsumableArray(options[item].element.form.elements).find(function (item) {
            return item.type === 'submit';
          }); // Obj options

          options[item].objOptions = options; // Class invalid

          options[item].classInvalid = options[item].classInvalid ? options[item].classInvalid : 'valval-invalid'; // Class valid

          options[item].classValid = options[item].classValid ? options[item].classValid : 'valval-valid'; // Valid

          options[item].valid = options[item].required ? false : true; // Required

          options[item].required = options[item].required ? options[item].required : false;

          if (item !== 'date' && item !== 'mail' && item !== 'repeatPassword' && item !== 'radio') {
            // Min length
            options[item].minLength = options[item].minLength ? options[item].minLength : 1; // Max length

            options[item].maxLength = options[item].maxLength ? options[item].maxLength : '';
          } // Regular expressions password


          if (item === 'password') {
            _this2.regexp_password = eval("/^.{".concat(options[item].minLength, ",").concat(options[item].maxLength, "}$/"));
            _this2.regexp_password_only_rus = eval("/^[\u0410-\u042F|\u0430-\u044F]{".concat(options[item].minLength, ",").concat(options[item].maxLength, "}$/"));
            _this2.regexp_password_only_numbers = eval("/^\\d{".concat(options[item].minLength, ",").concat(options[item].maxLength, "}$/"));
            _this2.regexp_password_only_en = eval("/^[A-Z|a-z]{".concat(options[item].minLength, ",").concat(options[item].maxLength, "}$/"));
          } // Regular expressions mail


          if (item === 'mail') {
            _this2.regexp_mail = /^[A-Z|a-z|\d|\_|\-|\.]{1,}@[A-Z|a-z]{1,}\.[A-Z|a-z]{1,}$/;
          } // Regular expressions date


          if (item === 'date') {
            _this2.regexp_date = /^(\d{2,2}[\/|\.|\-]){2,2}\d{4,4}$/;
            _this2.regexp_date_only_slash = /^(\d{2,2}\/){2,2}\d{4,4}$/;
            _this2.regexp_date_only_dot = /^(\d{2,2}\.){2,2}\d{4,4}$/;
            _this2.regexp_date_only_hyphen = /^(\d{2,2}\-){2,2}\d{4,4}$/;
          } // Regular expressions tel


          if (item === 'tel') {
            _this2.regexp_tel = eval("/^\\d{".concat(options[item].minLength, ",").concat(options[item].maxLength, "}$/"));
          } // Regular expressions first name


          if (item === 'firstName') {
            _this2.regexp_first_name = eval("/^[a-z|A-Z|\u0430-\u044F|\u0410-\u042F]{".concat(options[item].minLength, ",").concat(options[item].maxLength, "}$/"));
            _this2.regexp_first_name_only_rus = eval("/^[\u0410-\u042F|\u0430-\u044F]{".concat(options[item].minLength, ",").concat(options[item].maxLength, "}$/"));
            _this2.regexp_first_name_only_en = eval("/^[A-Z|a-z]{".concat(options[item].minLength, ",").concat(options[item].maxLength, "}$/"));
          } // Regular expressions last name


          if (item === 'lastName') {
            _this2.regexp_last_name = eval("/^[a-z|A-Z|\u0430-\u044F|\u0410-\u042F]{".concat(options[item].minLength, ",").concat(options[item].maxLength, "}$/"));
            _this2.regexp_last_name_only_rus = eval("/^[\u0410-\u042F|\u0430-\u044F]{".concat(options[item].minLength, ",").concat(options[item].maxLength, "}$/"));
            _this2.regexp_last_name_only_en = eval("/^[A-Z|a-z]{".concat(options[item].minLength, ",").concat(options[item].maxLength, "}$/"));
          } // Regular expressions required


          _this2.regexp_required = /.{1,}/;
          _this2.options = options; // get size

          var getSize = function getSize() {
            var set = new Set();

            for (var i in options[item].objOptions) {
              set.add(i);
            }

            _this2.invalidSize = set.size;
          };

          getSize();
          options[item].element.addEventListener('input', function () {
            var value = options[item].element.value; // password

            if (item === 'password' && !options[item].onlyRus && !options[item].onlyNumbers && !options[item].onlyEn) {
              if (options[item].objOptions.repeatPassword) {
                if (value) {
                  _this2.regexp_repeat_password = eval("/^".concat(document.querySelector(options['repeatPassword'].repeatAt).value, "$/"));

                  _this2.validationElement(_this2.regexp_password, value, options[item]);

                  _this2.validationElement(_this2.regexp_repeat_password, document.querySelector(options['repeatPassword'].selectorEl).value, options['repeatPassword']);
                } else {
                  options[item].valid = false;

                  _this2.checkValid(options[item].classInvalid, options[item].classValid, options[item], options[item].element);

                  _this2.checkValidationElement(options[item]);

                  _this2.invalidSize = _this2.addInvalidElementsInArray(options[item]);
                }
              } else {
                _this2.validationElement(_this2.regexp_password, value, options[item]);
              }
            } // password and only rus


            if (item === 'password' && options[item].onlyRus) {
              if (options[item].objOptions.repeatPassword) {
                if (value) {
                  _this2.regexp_repeat_password = eval("/^".concat(document.querySelector(options['repeatPassword'].repeatAt).value, "$/"));

                  _this2.validationElement(_this2.regexp_password_only_rus, value, options[item]);

                  _this2.validationElement(_this2.regexp_repeat_password, document.querySelector(options['repeatPassword'].selectorEl).value, options['repeatPassword']);
                } else {
                  options[item].valid = false;

                  _this2.checkValid(options[item].classInvalid, options[item].classValid, options[item], options[item].element);

                  _this2.checkValidationElement(options[item]);

                  _this2.invalidSize = _this2.addInvalidElementsInArray(options[item]);
                }
              } else {
                _this2.validationElement(_this2.regexp_password_only_rus, value, options[item]);
              }
            } // password and only numbers


            if (item === 'password' && options[item].onlyNumbers) {
              if (options[item].objOptions.repeatPassword) {
                if (value) {
                  _this2.regexp_repeat_password = eval("/^".concat(document.querySelector(options['repeatPassword'].repeatAt).value, "$/"));

                  _this2.validationElement(_this2.regexp_password_only_numbers, value, options[item]);

                  _this2.validationElement(_this2.regexp_repeat_password, document.querySelector(options['repeatPassword'].selectorEl).value, options['repeatPassword']);
                } else {
                  options[item].valid = false;

                  _this2.checkValid(options[item].classInvalid, options[item].classValid, options[item], options[item].element);

                  _this2.checkValidationElement(options[item]);

                  _this2.invalidSize = _this2.addInvalidElementsInArray(options[item]);
                }
              } else {
                _this2.validationElement(_this2.regexp_password_only_numbers, value, options[item]);
              }
            } // password and only en


            if (item === 'password' && options[item].onlyEn) {
              if (options[item].objOptions.repeatPassword) {
                if (value) {
                  _this2.regexp_repeat_password = eval("/^".concat(document.querySelector(options['repeatPassword'].repeatAt).value, "$/"));

                  _this2.validationElement(_this2.regexp_password_only_en, value, options[item]);

                  _this2.validationElement(_this2.regexp_repeat_password, document.querySelector(options['repeatPassword'].selectorEl).value, options['repeatPassword']);
                } else {
                  options[item].valid = false;

                  _this2.checkValid(options[item].classInvalid, options[item].classValid, options[item], options[item].element);

                  _this2.checkValidationElement(options[item]);

                  _this2.invalidSize = _this2.addInvalidElementsInArray(options[item]);
                }
              } else {
                _this2.validationElement(_this2.regexp_password_only_en, value, options[item]);
              }
            } // mail


            if (item === 'mail') {
              _this2.validationElement(_this2.regexp_mail, value, options[item]);
            } // date


            if (item === 'date' && !options[item].onlySlash && !options[item].onlyDot && !options[item].onlyHyphen) {
              _this2.validationElement(_this2.regexp_date, value, options[item]);
            } // date and only only slash


            if (item === 'date' && options[item].onlySlash) {
              _this2.validationElement(_this2.regexp_date_only_slash, value, options[item]);
            } // date and only only dot


            if (item === 'date' && options[item].onlyDot) {
              _this2.validationElement(_this2.regexp_date_only_dot, value, options[item]);
            } // date and only only hyphen


            if (item === 'date' && options[item].onlyHyphen) {
              _this2.validationElement(_this2.regexp_date_only_hyphen, value, options[item]);
            } // tel


            if (item === 'tel') {
              _this2.validationElement(_this2.regexp_tel, value, options[item]);
            } // repeat password


            if (item === 'repeatPassword') {
              if (!document.querySelector(options['repeatPassword'].repeatAt).value) {
                options[item].valid = false;

                _this2.checkValid(options[item].classInvalid, options[item].classValid, options[item], options[item].element);

                _this2.checkValidationElement(options[item]);

                _this2.invalidSize = _this2.addInvalidElementsInArray(options[item]);
              } else {
                _this2.regexp_repeat_password = _this2.regexp_repeat_password = eval("/^".concat(document.querySelector(options['repeatPassword'].repeatAt).value, "$/"));

                _this2.validationElement(_this2.regexp_repeat_password, value, options[item]);
              }
            } // First name


            if (item === 'firstName' && !options[item].onlyRus && !options[item].onlyEn && !options[item].bigFirstSymbol) {
              _this2.validationElement(_this2.regexp_first_name, value, options[item]);
            } // First name and big first symbol


            if (item === 'firstName' && options[item].bigFirstSymbol) {
              _this2.regexp_first_name = eval("/^[A-Z|\u0410-\u042F]{1,1}[a-z|\u0430-\u044F]{".concat(options[item].minLength, ",").concat(options[item].maxLength, "}$/"));

              _this2.validationElement(_this2.regexp_first_name, value, options[item]);
            } // First name and only en


            if (item === 'firstName' && options[item].onlyEn) {
              _this2.regexp_first_name_only_en = eval("/^[a-z]{".concat(options[item].minLength, ",").concat(options[item].maxLength, "}$/"));

              _this2.validationElement(_this2.regexp_first_name_only_en, value, options[item]);
            } // First name and only en and big first symbol


            if (item === 'firstName' && options[item].onlyEn && options[item].bigFirstSymbol) {
              _this2.regexp_first_name_only_en = eval("/^[A-Z]{1,1}[a-z]{".concat(options[item].minLength, ",").concat(options[item].maxLength, "}$/"));

              _this2.validationElement(_this2.regexp_first_name_only_en, value, options[item]);
            } // First name and only rus


            if (item === 'firstName' && options[item].onlyRus) {
              _this2.regexp_first_name_only_rus = eval("/^[\u0430-\u044F]{".concat(options[item].minLength, ",").concat(options[item].maxLength, "}$/"));

              _this2.validationElement(_this2.regexp_first_name_only_rus, value, options[item]);
            } // First name and only rus and big first symbol


            if (item === 'firstName' && options[item].onlyRus && options[item].bigFirstSymbol) {
              _this2.regexp_first_name_only_rus = eval("/^[\u0410-\u042F]{1,1}[\u0430-\u044F]{".concat(options[item].minLength, ",").concat(options[item].maxLength, "}$/"));

              _this2.validationElement(_this2.regexp_first_name_only_rus, value, options[item]);
            } // last name


            if (item === 'lastName' && !options[item].onlyRus && !options[item].onlyEn) {
              _this2.validationElement(_this2.regexp_last_name, value, options[item]);
            } // last name and big first symbol


            if (item === 'lastName' && options[item].bigFirstSymbol) {
              _this2.regexp_last_name = eval("/^[A-Z|\u0410-\u042F]{1,1}[a-z|\u0430-\u044F]{".concat(options[item].minLength, ",").concat(options[item].maxLength, "}$/"));

              _this2.validationElement(_this2.regexp_last_name, value, options[item]);
            } // last name and only en


            if (item === 'lastName' && options[item].onlyEn) {
              _this2.regexp_last_name_only_en = eval("/^[a-z]{".concat(options[item].minLength, ",").concat(options[item].maxLength, "}$/"));

              _this2.validationElement(_this2.regexp_last_name_only_en, value, options[item]);
            } // last name and only en and big first symbol


            if (item === 'lastName' && options[item].onlyEn && options[item].bigFirstSymbol) {
              _this2.regexp_last_name_only_en = eval("/^[A-Z]{1,1}[a-z]{".concat(options[item].minLength, ",").concat(options[item].maxLength, "}$/"));

              _this2.validationElement(_this2.regexp_last_name_only_en, value, options[item]);
            } // last name and only rus


            if (item === 'lastName' && options[item].onlyRus) {
              _this2.regexp_last_name_only_rus = eval("/^[\u0430-\u044F]{".concat(options[item].minLength, ",").concat(options[item].maxLength, "}$/"));

              _this2.validationElement(_this2.regexp_last_name_only_rus, value, options[item]);
            } // last name and only rus and big first symbol


            if (item === 'lastName' && options[item].onlyRus && options[item].bigFirstSymbol) {
              _this2.regexp_last_name_only_rus = eval("/^[\u0410-\u042F]{1,1}[\u0430-\u044F]{".concat(options[item].minLength, ",").concat(options[item].maxLength, "}$/"));

              _this2.validationElement(_this2.regexp_last_name_only_rus, value, options[item]);
            }
          });
        }

        _this2.submitForm(options[item]);
      };

      for (var item in options) {
        _loop(item);
      }

      return this;
    }
  }]);

  return Valval;
}();

module.exports.Valval = Valval;