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
        this.regexp_first_name = '';
        this.regexp_first_name_only_en = '';
        this.regexp_first_name_only_rus = '';
        this.regexp_last_name = '';
        this.regexp_last_name_only_en = '';
        this.regexp_last_name_only_rus = '';
        this.invalidSize = 0;
    }
    getOptions() {
        return this.options;
    }
    submitForm(item) {
        const form = item.form;

        form.addEventListener('submit', event => {
            item.preventDefault && event.preventDefault();

            if (!this.invalidSize) {
                form.submit();
            } else {
                if (item.required) {
                    this.checkRequired(item);
                }
            }
        });
    }
    checkRequired(item) {
        if (!this.regexp_required.test(item.element.value)) {
            item.valid = false;
            this.checkValid(item);
            this.checkValidationElement(item);
            this.invalidSize = this.addInvalidElementsInArray(item);
        }
    }
    addInvalidElementsInArray(item) {
        const set = new Set();

        for (let i in item.objOptions) {
            !item.objOptions[i].valid && set.add(item.objOptions[i]);
        }

        return set.size;
    }
    checkValidationElement(item) {
        if (item.validationElement && item.validationElement.have) {
            const validationEl = document.querySelector(item.validationElement.selectorEl);

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
    validationElement(regexp, value, item) {
        regexp = regexp ? regexp : /^''$/;

        if (regexp.test(value)) {
            item.valid = true;
            this.checkValid(item);
            this.checkValidationElement(item);
            this.invalidSize = this.addInvalidElementsInArray(item);
        } else {
            item.valid = false;
            this.checkValid(item);
            this.checkValidationElement(item);
            this.invalidSize = this.addInvalidElementsInArray(item);
        }
    }
    checkValid(item) {
        if (item.valid) {
            item.element.classList.add(item.classValid);
            item.element.classList.remove(item.classInvalid);
        } else {
            item.element.classList.remove(item.classValid);
            item.element.classList.add(item.classInvalid);
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
                this.regexp_mail = /^[A-Z|a-z|\d|\_|\-|\.]{1,}@[A-Z|a-z]{1,}\.[A-Z|a-z]{1,}$/;
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
            // Regular expressions first name
            if (options[item].firstName) {
                this.regexp_first_name = eval(`/^[a-z|A-Z|а-я|А-Я]{${options[item].minLength},${options[item].maxLength}}$/`);
                this.regexp_first_name_only_rus = eval(`/^[А-Я|а-я]{${options[item].minLength},${options[item].maxLength}}$/`);
                this.regexp_first_name_only_en = eval(`/^[A-Z|a-z]{${options[item].minLength},${options[item].maxLength}}$/`);
            }
            // Regular expressions last name
            if (options[item].lastName) {
                this.regexp_last_name = eval(`/^[a-z|A-Z|а-я|А-Я]{${options[item].minLength},${options[item].maxLength}}$/`);
                this.regexp_last_name_only_rus = eval(`/^[А-Я|а-я]{${options[item].minLength},${options[item].maxLength}}$/`);
                this.regexp_last_name_only_en = eval(`/^[A-Z|a-z]{${options[item].minLength},${options[item].maxLength}}$/`);
            }
            // Regular expressions message
            if (options[item].message) {
                // this.regexp_message = eval(`/[a-z|A-Z|а-я|А-Я]{${options[item].minLength},${options[item].maxLength}}/`);
                // this.regexp_message_only_rus = eval(`/[а-я|А-Я]{${options[item].minLength},${options[item].maxLength}}/`);
                // this.regexp_message_only_en = eval(`/[a-z|A-Z]{${options[item].minLength},${options[item].maxLength}}/`);
            }
            // Regular expressions required
            this.regexp_required = /.{1,}/;
        }
        // End regular expressions
    }
    getDefaultParams(options) {
        for (let item in options) {
            // Start default params
            // Prevent default
            options[item].preventDefault = true;
            // Element
            options[item].element = document.querySelector(`[data-valval="${item}"]`);
            // Form
            options[item].form = options[item].element.form;
            // Elements in form
            options[item].elementsInForm = [...options[item].element.form.elements].filter(item => item.type !== 'submit');
            // Submit
            options[item].submit = [...options[item].element.form.elements].find(item => item.type === 'submit');
            // Obj options
            options[item].objOptions = options;
            // Class invalid
            options[item].classInvalid = options[item].classInvalid ? options[item].classInvalid : 'valval-invalid';
            // Class valid
            options[item].classValid = options[item].classValid ? options[item].classValid : 'valval-valid';
            // Valid
            options[item].valid = options[item].required ? false : true;
            // Required
            options[item].required = options[item].required ? options[item].required : false;
            if (!options[item].date && !options[item].mail && !options[item].repeatPassword) {
                // Min length
                options[item].minLength = options[item].minLength ? options[item].minLength : 1;
                // Max length
                options[item].maxLength = options[item].maxLength ? options[item].maxLength : '';
            }
        }
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
                options[item].element.addEventListener('input', () => {
                    const value = options[item].element.value;

                    // password
                    if (options[item].password &&
                        !options[item].onlyRus &&
                        !options[item].onlyNumbers &&
                        !options[item].onlyEn) {
                        this.validationElement(this.regexp_password, value, options[item]);
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
                    // date and only only slash
                    if (options[item].date && options[item].onlySlash) {
                        this.validationElement(this.regexp_date_only_slash, value, options[item]);
                    }
                    // date and only only dot
                    if (options[item].date && options[item].onlyDot) {
                        this.validationElement(this.regexp_date_only_dot, value, options[item]);
                    }
                    // date and only only hyphen
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
                                    this.checkValid(options[item]);
                                    this.checkValidationElement(options[item]);
                                    this.invalidSize = this.addInvalidElementsInArray(options[item]);

                                    options[item].objOptions[i].valid = false;
                                    this.checkValid(options[item].objOptions[i]);
                                    this.checkValidationElement(options[item].objOptions[i]);
                                    this.invalidSize = this.addInvalidElementsInArray(options[item].objOptions[i]);
                                } else {
                                    this.regexp_repeat_password = eval(`/^${options[item].objOptions[i].element.value}$/`);
                                    this.validationElement(this.regexp_repeat_password, value, options[item]);
                                }
                            }
                        }
                    }
                    // First name
                    if (options[item].firstName &&
                        !options[item].onlyRus &&
                        !options[item].onlyEn &&
                        !options[item].bigFirstSymbol) {
                        this.validationElement(this.regexp_first_name, value, options[item]);
                    }
                    // First name and big first symbol
                    if (options[item].firstName && options[item].bigFirstSymbol) {
                        this.regexp_first_name = eval(`/^[A-Z|А-Я]{1,1}[a-z|а-я]{${options[item].minLength},${options[item].maxLength}}$/`);
                        this.validationElement(this.regexp_first_name, value, options[item]);
                    }
                    // First name and only en
                    if (options[item].firstName && options[item].onlyEn) {
                        this.regexp_first_name_only_en = eval(`/^[a-z]{${options[item].minLength},${options[item].maxLength}}$/`);
                        this.validationElement(this.regexp_first_name_only_en, value, options[item]);
                    }
                    // First name and only en and big first symbol
                    if (options[item].firstName && options[item].onlyEn && options[item].bigFirstSymbol) {
                        this.regexp_first_name_only_en = eval(`/^[A-Z]{1,1}[a-z]{${options[item].minLength},${options[item].maxLength}}$/`);
                        this.validationElement(this.regexp_first_name_only_en, value, options[item]);
                    }
                    // First name and only rus
                    if (options[item].firstName && options[item].onlyRus) {
                        this.regexp_first_name_only_rus = eval(`/^[а-я]{${options[item].minLength},${options[item].maxLength}}$/`);
                        this.validationElement(this.regexp_first_name_only_rus, value, options[item]);
                    }
                    // First name and only rus and big first symbol
                    if (options[item].firstName && options[item].onlyRus && options[item].bigFirstSymbol) {
                        this.regexp_first_name_only_rus = eval(`/^[А-Я]{1,1}[а-я]{${options[item].minLength},${options[item].maxLength}}$/`);
                        this.validationElement(this.regexp_first_name_only_rus, value, options[item]);
                    }
                    // last name
                    if (options[item].lastName &&
                        !options[item].onlyRus &&
                        !options[item].onlyEn) {
                        this.validationElement(this.regexp_last_name, value, options[item]);
                    }
                    // last name and big first symbol
                    if (options[item].lastName && options[item].bigFirstSymbol) {
                        this.regexp_last_name = eval(`/^[A-Z|А-Я]{1,1}[a-z|а-я]{${options[item].minLength},${options[item].maxLength}}$/`);
                        this.validationElement(this.regexp_last_name, value, options[item]);
                    }
                    // last name and only en
                    if (options[item].lastName && options[item].onlyEn) {
                        this.regexp_last_name_only_en = eval(`/^[a-z]{${options[item].minLength},${options[item].maxLength}}$/`);
                        this.validationElement(this.regexp_last_name_only_en, value, options[item]);
                    }
                    // last name and only en and big first symbol
                    if (options[item].lastName && options[item].onlyEn && options[item].bigFirstSymbol) {
                        this.regexp_last_name_only_en = eval(`/^[A-Z]{1,1}[a-z]{${options[item].minLength},${options[item].maxLength}}$/`);
                        this.validationElement(this.regexp_last_name_only_en, value, options[item]);
                    }
                    // last name and only rus
                    if (options[item].lastName && options[item].onlyRus) {
                        this.regexp_last_name_only_rus = eval(`/^[а-я]{${options[item].minLength},${options[item].maxLength}}$/`);
                        this.validationElement(this.regexp_last_name_only_rus, value, options[item]);
                    }
                    // last name and only rus and big first symbol
                    if (options[item].lastName && options[item].onlyRus && options[item].bigFirstSymbol) {
                        this.regexp_last_name_only_rus = eval(`/^[А-Я]{1,1}[а-я]{${options[item].minLength},${options[item].maxLength}}$/`);
                        this.validationElement(this.regexp_last_name_only_rus, value, options[item]);
                    }
                    // message
                    if (options[item].message) {
                        if (options[item].maxLength) {
                            if (value.length <= options[item].maxLength && value.length >= options[item].minLength) {
                                options[item].valid = true;
                                this.checkValid(options[item]);
                                this.checkValidationElement(options[item]);
                                this.invalidSize = this.addInvalidElementsInArray(options[item]);
                            } else {
                                options[item].valid = false;
                                this.checkValid(options[item]);
                                this.checkValidationElement(options[item]);
                                this.invalidSize = this.addInvalidElementsInArray(options[item]);
                            }
                        } else {
                            if (value.length >= options[item].minLength) {
                                options[item].valid = true;
                                this.checkValid(options[item]);
                                this.checkValidationElement(options[item]);
                                this.invalidSize = this.addInvalidElementsInArray(options[item]);
                            } else {
                                options[item].valid = false;
                                this.checkValid(options[item]);
                                this.checkValidationElement(options[item]);
                                this.invalidSize = this.addInvalidElementsInArray(options[item]);
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
                                    this.checkValid(options[item]);
                                    this.checkValidationElement(options[item]);
                                    this.invalidSize = this.addInvalidElementsInArray(options[item]);
                                }

                                options[item].objOptions[i].valid = false;
                                this.checkValid(options[item].objOptions[i]);
                                this.checkValidationElement(options[item].objOptions[i]);
                                this.invalidSize = this.addInvalidElementsInArray(options[item].objOptions[i]);
                            } else {
                                if (options[item].repeatPassword) {
                                    this.regexp_repeat_password = eval(`/^${options[item].objOptions[i].element.value}$/`);
                                    this.validationElement(this.regexp_repeat_password, options[item].element.value, options[item]);
                                }
                            }
                        });
                    }
                }

                this.submitForm(options[item]);
            }
        }

        return this;
    }
}

module.exports.Valval = Valval;