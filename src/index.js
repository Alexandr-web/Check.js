class Valval {
    constructor() {
        this.options = {};
        this.regexp_message = '';
        this.regexp_message_only_rus = '';
        this.regexp_message_only_en = '';
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
        this.regexp_name = '';
        this.regexp_name_only_en = '';
        this.regexp_name_only_rus = '';
        this.invalidSize = 0;
    }
    getOptions() {
        return this.options;
    }
    getInvalidSize() {
        return this.invalidSize;
    }
    submitForm(item) {
        const form = item.form;

        form.addEventListener('submit', event => {
            item.preventDefault && event.preventDefault();

            this.outputCallbackWhenElementValid(item);
            this.outputCallbackWhenElementInvalid(item);

            if (!this.invalidSize) {
                form.submit();

                if (item.button) {
                    // if type object
                    if (typeof item.classInvalid === 'object') {
                        item.classInvalid.map(className => item.element.classList.remove(className));
                    } else {
                        item.element.classList.remove(item.classInvalid);
                    }

                    // if type object
                    if (typeof item.classValid === 'object') {
                        item.classValid.map(className => item.element.classList.add(className));
                    } else {
                        item.element.classList.add(item.classValid);
                    }

                    // If have value
                    if (item.element.value) {
                        item.element.value = item.textWhenValid;
                    } else {
                        item.element.innerText = item.textWhenValid;
                    }
                }
            } else {
                if (item.required) {
                    this.checkRequired(item);
                }

                if (item.button) {
                    // if type object
                    if (typeof item.classInvalid === 'object') {
                        item.classInvalid.map(className => item.element.classList.add(className));
                    } else {
                        item.element.classList.add(item.classInvalid);
                    }

                    // if type object
                    if (typeof item.classValid === 'object') {
                        item.classValid.map(className => item.element.classList.remove(className));
                    } else {
                        item.element.classList.remove(item.classValid);
                    }

                    // If have value
                    if (item.element.value) {
                        item.element.value = item.textWhenInvalid;
                    } else {
                        item.element.innerText = item.textWhenInvalid;
                    }
                }
            }
        });
    }
    checkRequired(item) {
        if (!this.regexp_required.test(item.element.value)) {
            item.valid = false;
            this.checkAllChange(item);
        }
    }
    getInvalidElementsSize(item) {
        const set = new Set();

        for (let i in item.objOptions) {
            if (!item.objOptions[i].valid && item.objOptions[i].required) {
                set.add(item.objOptions[i]);
            }
        }

        return set.size;
    }
    checkValidationElement(item) {
        if (item.validationElement && item.validationElement.have) {
            const validationEl = document.querySelector(item.validationElement.selectorEl);

            if (item.valid) {
                validationEl.innerText = item.validationElement.textWhenValid;

                // if type object
                if (typeof item.validationElement.classInvalid === 'object') {
                    item.validationElement.classInvalid.map(className => validationEl.classList.remove(className));
                } else {
                    validationEl.classList.remove(item.validationElement.classInvalid || 'valval-invalid-el');
                }

                // if type object
                if (typeof item.validationElement.classValid === 'object') {
                    item.validationElement.classValid.map(className => validationEl.classList.add(className));
                } else {
                    validationEl.classList.add(item.validationElement.classValid || 'valval-valid-el');
                }
            } else {
                validationEl.innerText = item.validationElement.textWhenInvalid;

                // if type object
                if (typeof item.validationElement.classInvalid === 'object') {
                    item.validationElement.classInvalid.map(className => validationEl.classList.add(className));
                } else {
                    validationEl.classList.add(item.validationElement.classInvalid || 'valval-invalid-el');
                }

                // if type object
                if (typeof item.validationElement.classValid === 'object') {
                    item.validationElement.classValid.map(className => validationEl.classList.remove(className));
                } else {
                    validationEl.classList.remove(item.validationElement.classValid || 'valval-valid-el');
                }
            }
        }
    }
    validationElement(regexp, value, item) {
        regexp = regexp ? regexp : /^''$/;

        // if matched
        if (regexp.test(value)) {
            item.valid = true;
            this.checkAllChange(item);
        } else {
            item.valid = false;
            this.checkAllChange(item);
        }
    }
    checkValid(item) {
        if (item.valid) {
            // if type object
            if (typeof item.classInvalid === 'object') {
                item.classInvalid.map(className => item.element.classList.remove(className));
            } else {
                item.element.classList.remove(item.classInvalid);
            }

            // if type object
            if (typeof item.classValid === 'object') {
                item.classValid.map(className => item.element.classList.add(className));
            } else {
                item.element.classList.add(item.classValid);
            }
        } else {
            // if type object
            if (typeof item.classInvalid === 'object') {
                item.classInvalid.map(className => item.element.classList.add(className));
            } else {
                item.element.classList.add(item.classInvalid);
            }

            // if type object
            if (typeof item.classValid === 'object') {
                item.classValid.map(className => item.element.classList.remove(className));
            } else {
                item.element.classList.remove(item.classValid);
            }
        }
    }
    outputCallbackWhenElementValid(item) {
        if (item.handlerWhenValidElement) {
            if (item.valid) {
                item.handlerWhenValidElement();
            }
        }
    }
    outputCallbackWhenElementInvalid(item) {
        if (item.handlerWhenInvalidElement) {
               if (!item.valid) {
                item.handlerWhenInvalidElement();
            }
        }
    }
    getRegularExpressions(options) {
        // Start regular expressions
        for (let item in options) {
            // Regular expressions password
            if (options[item].password) {
                this.regexp_password = eval(`/^.{${options[item].minLength},${options[item].maxLength}}$/`);
                this.regexp_password_only_rus = eval(`/^[А-Я|а-я]{${options[item].minLength},${options[item].maxLength}}$/`);
                this.regexp_password_only_numbers = eval(`/^\\d{${options[item].minLength},${options[item].maxLength}}$/`);
                this.regexp_password_only_en = eval(`/^[A-Z|a-z]{${options[item].minLength},${options[item].maxLength}}$/`);
            }
            // Regular expressions mail
            if (options[item].mail) {
                this.regexp_mail = /^[A-Z|a-z|\d|\_|\-|\.]{0,63}@[A-Z|a-z]{1,63}\.[A-Z|a-z]{2,63}$/;
            }
            // Regular expressions date
            if (options[item].date) {
                this.regexp_date = /^(\d{2,2}[\/|\.|\-]){2,2}\d{4,4}$/;
                this.regexp_date_only_slash = /^(\d{2,2}\/){2,2}\d{4,4}$/;
                this.regexp_date_only_dot = /^(\d{2,2}\.){2,2}\d{4,4}$/;
                this.regexp_date_only_hyphen = /^(\d{2,2}\-){2,2}\d{4,4}$/;
            }
            // Regular expressions tel
            if (options[item].tel) {
                this.regexp_tel = eval(`/^\\d{${options[item].minLength},${options[item].maxLength}}$/`);
            }
            // Regular expressions name
            if (options[item].name) {
                this.regexp_name = eval(`/^[a-z|A-Z|а-я|А-Я]{${options[item].minLength},${options[item].maxLength}}$/`);
                this.regexp_name_only_rus = eval(`/^[А-Я|а-я]{${options[item].minLength},${options[item].maxLength}}$/`);
                this.regexp_name_only_en = eval(`/^[A-Z|a-z]{${options[item].minLength},${options[item].maxLength}}$/`);
            }
            // Regular expressions required
            this.regexp_required = /.{1,}/;
        }
        // End regular expressions
    }
    getDefaultParams(options) {
        for (let item in options) {
            // Start default params
            // Element
            options[item].element = document.querySelector(`[data-valval="${item}"]`);
            // Prevent default
            options[item].preventDefault = true;
            // Form
            options[item].form = options[item].element.form;
            // Elements in form
            options[item].elementsInForm = [...options[item].element.form.elements].filter(item => item.type !== 'submit');
            // Obj options
            options[item].objOptions = options;
            // Valid
            options[item].valid = options[item].required ? false : true;

            // Everything except the button
            if (!options[item].button) {
                // Required
                options[item].required = options[item].required ? options[item].required : false;
                // Class valid
                options[item].classValid = options[item].classValid ? options[item].classValid : 'valval-valid';
                // Class invalid
                options[item].classInvalid = options[item].classInvalid ? options[item].classInvalid : 'valval-invalid';
                // Submit
                options[item].submit = [...options[item].element.form.elements].find(item => item.type === 'submit');
                // Validation element
                options[item].validationElement = options[item].validationElement ? options[item].validationElement : {};
                // Handler when invalid form
                options[item].handlerWhenInvalidElement = options[item].handlerWhenInvalidElement ? options[item].handlerWhenInvalidElement : false;
                // Handler when valid form
                options[item].handlerWhenValidElement = options[item].handlerWhenValidElement ? options[item].handlerWhenValidElement : false;
            }

            // Everything except the date, mail repeat password and button
            if (!options[item].date && !options[item].mail && !options[item].repeatPassword && !options[item].button) {
                // Min length
                options[item].minLength = options[item].minLength ? options[item].minLength : 1;
                // Max length
                options[item].maxLength = options[item].maxLength ? options[item].maxLength : '';
            }

            // Only button
            if (options[item].button) {
                // Valid
                options[item].valid = true;
                // Class invalid
                options[item].classInvalid = options[item].classInvalid ? options[item].classInvalid : 'valval-invalid-btn';
                // Class valid
                options[item].classValid = options[item].classValid ? options[item].classValid : 'valval-valid-btn';

                if (options[item].element.value) {
                    // text when valid
                    options[item].textWhenValid = options[item].textWhenValid ? options[item].textWhenValid : options[item].element.value;
                    // text when invalid
                    options[item].textWhenInvalid = options[item].textWhenInvalid ? options[item].textWhenInvalid : options[item].element.value;
                } else {
                    // text when valid
                    options[item].textWhenValid = options[item].textWhenValid ? options[item].textWhenValid : options[item].element.innerText;
                    // text when invalid
                    options[item].textWhenInvalid = options[item].textWhenInvalid ? options[item].textWhenInvalid : options[item].element.innerText;
                }
            }
        }
    }
    checkAllChange(item) {
        this.checkValid(item);
        this.checkValidationElement(item);
        this.invalidSize = this.getInvalidElementsSize(item);
        this.outputCallbackWhenElementValid(item);
        this.outputCallbackWhenElementInvalid(item);
    }
    getSizeOptions(options) {
        for (let item in options) {
            const set = new Set();

            for (let i in options[item].objOptions) {
                set.add(i);
            }

            this.invalidSize = set.size;
        }
    }
    start(options) {
        if (typeof options === 'object') {
            // Default params
            this.getDefaultParams(options);
            // Size options
            this.getSizeOptions(options);
            // Regular expressions
            this.getRegularExpressions(options);

            this.options = options;

            for (let item in options) {
                if (!options[item].button) {

                    options[item].element.addEventListener('input', () => {
                        const value = options[item].element.value;

                        // password
                        if (options[item].password &&
                            !options[item].onlyRus &&
                            !options[item].onlyNumbers &&
                            !options[item].onlyEn) {
                            this.validationElement(this.regexp_password, value, options[item]);
                        }
                        // password and content in password
                        if (options[item].password && options[item].contentInPassword) {
                            const items = options[item].contentInPassword.join('|');
                            this.regexp_password = eval(`/${items}/g`);
                            const size_options = options[item].contentInPassword.length;
                            const size_search = value.match(this.regexp_password) ? value.match(this.regexp_password).length : 0;

                            if (!options[item].maxLength) {
                                if (size_search === size_options && value.length >= options[item].minLength) {
                                    options[item].valid = true;
                                    this.checkAllChange(options[item]);
                                } else {
                                    options[item].valid = false;
                                    this.checkAllChange(options[item]);
                                }
                            } else {
                                if (size_search === size_options && value.length >= options[item].minLength && value.length <= options[item].maxLength) {
                                    options[item].valid = true;
                                    this.checkAllChange(options[item]);
                                } else {
                                    options[item].valid = false;
                                    this.checkAllChange(options[item]);
                                }
                            }
                        }
                        // password and only rus
                        if (options[item].password && options[item].onlyRus) {
                            this.validationElement(this.regexp_password_only_rus, value, options[item]);
                        }
                        // password and only numbers
                        if (options[item].password && options[item].onlyNumbers) {
                            this.validationElement(this.regexp_password_only_numbers, value, options[item]);
                        }
                        // password and only en
                        if (options[item].password && options[item].onlyEn) {
                            this.validationElement(this.regexp_password_only_en, value, options[item]);
                        }
                        // mail
                        if (options[item].mail) {
                            this.validationElement(this.regexp_mail, value, options[item]);
                        }
                        // date
                        if (options[item].date &&
                            !options[item].onlySlash &&
                            !options[item].onlyDot &&
                            !options[item].onlyHyphen) {
                            this.validationElement(this.regexp_date, value, options[item]);
                        }
                        // date and only slash
                        if (options[item].date && options[item].onlySlash) {
                            this.validationElement(this.regexp_date_only_slash, value, options[item]);
                        }
                        // date and only dot
                        if (options[item].date && options[item].onlyDot) {
                            this.validationElement(this.regexp_date_only_dot, value, options[item]);
                        }
                        // date and only hyphen
                        if (options[item].date && options[item].onlyHyphen) {
                            this.validationElement(this.regexp_date_only_hyphen, value, options[item]);
                        }
                        // tel
                        if (options[item].tel) {
                            this.validationElement(this.regexp_tel, value, options[item]);
                        }
                        // message and only en
                        if (options[item].message && options[item].onlyEn) {
                            this.validationElement(this.regexp_message_only_en, value, options[item]);
                        }
                        // message and only rus
                        if (options[item].message && options[item].onlyRus) {
                            this.validationElement(this.regexp_message_only_rus, value, options[item]);
                        }
                        // repeat password
                        if (options[item].repeatPassword) {
                            for (let i in options[item].objOptions) {
                                if (i === options[item].repeatAt) {
                                    if (!options[item].objOptions[i].element.value) {
                                        options[item].valid = false;
                                        this.checkAllChange(options[item]);

                                        options[item].objOptions[i].valid = false;
                                        this.checkAllChange(options[item].objOptions[i]);
                                    } else {
                                        this.regexp_repeat_password = eval(`/^${options[item].objOptions[i].element.value}$/`);
                                        this.validationElement(this.regexp_repeat_password, value, options[item]);
                                    }
                                }
                            }
                        }
                        // name
                        if (options[item].name &&
                            !options[item].onlyRus &&
                            !options[item].onlyEn &&
                            !options[item].bigFirstSymbol) {
                            this.validationElement(this.regexp_name, value, options[item]);
                        }
                        // name and big first symbol
                        if (options[item].name && options[item].bigFirstSymbol) {
                            this.regexp_name = eval(`/^[A-Z|А-Я]{1,1}[a-z|а-я]{${options[item].minLength},${options[item].maxLength}}$/`);
                            this.validationElement(this.regexp_name, value, options[item]);
                        }
                        // name and only en
                        if (options[item].name && options[item].onlyEn) {
                            this.regexp_name_only_en = eval(`/^[A-Z|a-z]{${options[item].minLength},${options[item].maxLength}}$/`);
                            this.validationElement(this.regexp_name_only_en, value, options[item]);
                        }
                        // name and only en and big first symbol
                        if (options[item].name && options[item].onlyEn && options[item].bigFirstSymbol) {
                            this.regexp_first_name_only_en = eval(`/^[A-Z]{1,1}[a-z]{${options[item].minLength},${options[item].maxLength}}$/`);
                            this.validationElement(this.regexp_first_name_only_en, value, options[item]);
                        }
                        // name and only rus
                        if (options[item].name && options[item].onlyRus) {
                            this.regexp_name_only_rus = eval(`/^[А-Я|а-я]{${options[item].minLength},${options[item].maxLength}}$/`);
                            this.validationElement(this.regexp_name_only_rus, value, options[item]);
                        }
                        // name and only rus and big first symbol
                        if (options[item].name && options[item].onlyRus && options[item].bigFirstSymbol) {
                            this.regexp_name_only_rus = eval(`/^[А-Я]{1,1}[а-я]{${options[item].minLength},${options[item].maxLength}}$/`);
                            this.validationElement(this.regexp_name_only_rus, value, options[item]);
                        }
                        // message
                        if (options[item].message) {
                            if (options[item].maxLength) {
                                if (value.length <= options[item].maxLength && value.length >= options[item].minLength) {
                                    options[item].valid = true;
                                    this.checkAllChange(options[item]);
                                } else {
                                    options[item].valid = false;
                                    this.checkAllChange(options[item]);
                                }
                            } else {
                                if (value.length >= options[item].minLength) {
                                    options[item].valid = true;
                                    this.checkAllChange(options[item]);
                                } else {
                                    options[item].valid = false;
                                    this.checkAllChange(options[item]);
                                }
                            }
                        }
                    });

                    for (let i in options[item].objOptions) {
                        if (i === options[item].repeatAt) {
                            options[item].objOptions[i].element.addEventListener('input', () => {
                                if (!options[item].objOptions[i].element.value) {
                                    if (options[item].repeatPassword) {
                                        options[item].valid = false;
                                        this.checkAllChange(options[item]);
                                    }

                                    options[item].objOptions[i].valid = false;
                                    this.checkAllChange(options[item].objOptions[i]);
                                } else {
                                    if (options[item].repeatPassword) {
                                        this.regexp_repeat_password = eval(`/^${options[item].objOptions[i].element.value}$/`);
                                        this.validationElement(this.regexp_repeat_password, options[item].element.value, options[item]);
                                    }
                                }
                            });
                        }
                    }
                }

                this.submitForm(options[item]);
            }
        }

        return this;
    }
}

// module.exports.Valval = Valval;
