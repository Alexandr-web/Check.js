class Valval {
    constructor() {
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
            this.checkValid(item.classInvalid, item.classValid, item, item.element);
            this.checkValidationElement(item);
            this.invalidSize = this.addInvalidElementsInArray(item);
        }
    }
    getOptions() {
        return this.options;
    }
    addInvalidElementsInArray(item) {
        const set = new Set();

        for (let i in item.objOptions) {
            !item.objOptions[i].valid && set.add(item.objOptions[i]);
        }

        return set.size;
    }
    checkValidationElement(item) {
        if (item.validationElement) {
            if (item.validationElement.have) {
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
    }
    validationElement(regexp, value, item) {
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
    checkValid(invalidClass, validClass, item, el) {
        console.log();
        if (item.valid) {
            el.classList.add(validClass);
            el.classList.remove(invalidClass);
        } else {
            el.classList.remove(validClass);
            el.classList.add(invalidClass);
        }
    }
    start() {
        const options = arguments[0];

        for (let item in options) {
            if (this.all_options.includes(item)) {
                const el = document.querySelector(options[item].selectorEl);

                // Default params
                // Prevent default
                options[item].preventDefault = true;
                // Element
                if (el.className.includes(options[item].selectorEl.replace(/\./, '')) ||
                    el.id.includes(options[item].selectorEl.replace(/\#/, ''))) {
                    options[item].element = el;
                } else {
                    options[item].element = false;
                }
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
                if (item !== 'date' && item !== 'mail' && item !== 'repeatPassword' && item !== 'radio') {
                    // Min length
                    options[item].minLength = options[item].minLength ? options[item].minLength : 1;
                    // Max length
                    options[item].maxLength = options[item].maxLength ? options[item].maxLength : '';
                }

                // Regular expressions
                if (item === 'password') {
                    this.regexp_password = eval(`/^.{${options[item].minLength},${options[item].maxLength}}$/`);
                    this.regexp_password_only_rus = eval(`/^[А-Я|а-я]{${options[item].minLength},${options[item].maxLength}}$/`);
                    this.regexp_password_only_numbers = eval(`/^\\d{${options[item].minLength},${options[item].maxLength}}$/`);
                    this.regexp_password_only_en = eval(`/^[A-Z|a-z]{${options[item].minLength},${options[item].maxLength}}$/`);
                }
                if (item === 'mail') {
                    this.regexp_mail = /^[A-Z|a-z|\d|\_|\-|\.]{1,}@[A-Z|a-z]{1,}\.[A-Z|a-z]{1,}$/;
                }
                if (item === 'date') {
                    this.regexp_date = /^(\d{2,2}[\/|\.|\-]){2,2}\d{4,4}$/;
                    this.regexp_date_only_slash = /^(\d{2,2}\/){2,2}\d{4,4}$/;
                    this.regexp_date_only_dot = /^(\d{2,2}\.){2,2}\d{4,4}$/;
                    this.regexp_date_only_hyphen = /^(\d{2,2}\-){2,2}\d{4,4}$/;
                }
                if (item === 'tel') {
                    this.regexp_tel = eval(`/^\\d{${options[item].minLength},${options[item].maxLength}}$/`);
                }
                if (item === 'firstName') {
                    this.regexp_first_name = eval(`/^[a-z|A-Z|а-я|А-Я]{${options[item].minLength},${options[item].maxLength}}$/`);
                    this.regexp_first_name_only_rus = eval(`/^[А-Я|а-я]{${options[item].minLength},${options[item].maxLength}}$/`);
                    this.regexp_first_name_only_en = eval(`/^[A-Z|a-z]{${options[item].minLength},${options[item].maxLength}}$/`);
                }
                if (item === 'lastName') {
                    this.regexp_last_name = eval(`/^[a-z|A-Z|а-я|А-Я]{${options[item].minLength},${options[item].maxLength}}$/`);
                    this.regexp_last_name_only_rus = eval(`/^[А-Я|а-я]{${options[item].minLength},${options[item].maxLength}}$/`);
                    this.regexp_last_name_only_en = eval(`/^[A-Z|a-z]{${options[item].minLength},${options[item].maxLength}}$/`);
                }
                this.regexp_required = /.{1,}/;

                this.options = options;

                const getSize = () => {
                    const set = new Set();

                    for (let i in options[item].objOptions) {
                        set.add(i);
                    }

                    this.invalidSize = set.size;
                }

                getSize();

                options[item].element.addEventListener('input', () => {
                    const value = options[item].element.value;

                    if (item === 'password' &&
                        !options[item].onlyRus &&
                        !options[item].onlyNumbers &&
                        !options[item].onlyEn) {
                        if (options[item].objOptions.repeatPassword) {
                            if (value) {
                                this.regexp_repeat_password = eval(`/^${document.querySelector(options['repeatPassword'].repeatAt).value}$/`);
                                this.validationElement(this.regexp_password, value, options[item]);
                                this.validationElement(this.regexp_repeat_password, document.querySelector(options['repeatPassword'].selectorEl).value, options['repeatPassword']);
                            } else {
                                options[item].valid = false;
                                this.checkValid(options[item].classInvalid, options[item].classValid, options[item], options[item].element);
                                this.checkValidationElement(options[item]);
                                this.invalidSize = this.addInvalidElementsInArray(options[item]);
                            }
                        } else {
                            this.validationElement(this.regexp_password, value, options[item]);
                        }
                    }
                    if (item === 'password' && options[item].onlyRus) {
                        if (options[item].objOptions.repeatPassword) {
                            if (value) {
                                this.regexp_repeat_password = eval(`/^${document.querySelector(options['repeatPassword'].repeatAt).value}$/`);
                                this.validationElement(this.regexp_password_only_rus, value, options[item]);
                                this.validationElement(this.regexp_repeat_password, document.querySelector(options['repeatPassword'].selectorEl).value, options['repeatPassword']);
                            } else {
                                options[item].valid = false;
                                this.checkValid(options[item].classInvalid, options[item].classValid, options[item], options[item].element);
                                this.checkValidationElement(options[item]);
                                this.invalidSize = this.addInvalidElementsInArray(options[item]);
                            }
                        } else {
                            this.validationElement(this.regexp_password_only_rus, value, options[item]);
                        }
                    }
                    if (item === 'password' && options[item].onlyNumbers) {
                        if (options[item].objOptions.repeatPassword) {
                            if (value) {
                                this.regexp_repeat_password = eval(`/^${document.querySelector(options['repeatPassword'].repeatAt).value}$/`);
                                this.validationElement(this.regexp_password_only_numbers, value, options[item]);
                                this.validationElement(this.regexp_repeat_password, document.querySelector(options['repeatPassword'].selectorEl).value, options['repeatPassword']);
                            } else {
                                options[item].valid = false;
                                this.checkValid(options[item].classInvalid, options[item].classValid, options[item], options[item].element);
                                this.checkValidationElement(options[item]);
                                this.invalidSize = this.addInvalidElementsInArray(options[item]);
                            }
                        } else {
                            this.validationElement(this.regexp_password_only_numbers, value, options[item]);
                        }
                    }
                    if (item === 'password' && options[item].onlyEn) {
                        if (options[item].objOptions.repeatPassword) {
                            if (value) {
                                this.regexp_repeat_password = eval(`/^${document.querySelector(options['repeatPassword'].repeatAt).value}$/`);
                                this.validationElement(this.regexp_password_only_en, value, options[item]);
                                this.validationElement(this.regexp_repeat_password, document.querySelector(options['repeatPassword'].selectorEl).value, options['repeatPassword']);
                            } else {
                                options[item].valid = false;
                                this.checkValid(options[item].classInvalid, options[item].classValid, options[item], options[item].element);
                                this.checkValidationElement(options[item]);
                                this.invalidSize = this.addInvalidElementsInArray(options[item]);
                            }
                        } else {
                            this.validationElement(this.regexp_password_only_en, value, options[item]);
                        }
                    }
                    if (item === 'mail') {
                        this.validationElement(this.regexp_mail, value, options[item]);
                    }
                    if (item === 'date' &&
                        !options[item].onlySlash &&
                        !options[item].onlyDot &&
                        !options[item].onlyHyphen) {
                        this.validationElement(this.regexp_date, value, options[item]);
                    }
                    if (item === 'date' && options[item].onlySlash) {
                        this.validationElement(this.regexp_date_only_slash, value, options[item]);
                    }
                    if (item === 'date' && options[item].onlyDot) {
                        this.validationElement(this.regexp_date_only_dot, value, options[item]);
                    }
                    if (item === 'date' && options[item].onlyHyphen) {
                        this.validationElement(this.regexp_date_only_hyphen, value, options[item]);
                    }
                    if (item === 'tel') {
                        this.validationElement(this.regexp_tel, value, options[item]);
                    }
                    if (item === 'repeatPassword') {
                        if (!document.querySelector(options['repeatPassword'].repeatAt).value) {
                            options[item].valid = false;
                            this.checkValid(options[item].classInvalid, options[item].classValid, options[item], options[item].element);
                            this.checkValidationElement(options[item]);
                            this.invalidSize = this.addInvalidElementsInArray(options[item]);
                        } else {
                            this.regexp_repeat_password = this.regexp_repeat_password = eval(`/^${document.querySelector(options['repeatPassword'].repeatAt).value}$/`);
                            this.validationElement(this.regexp_repeat_password, value, options[item]);
                        }
                    }
                    if (item === 'firstName' &&
                        !options[item].onlyRus &&
                        !options[item].onlyEn &&
                        !options[item].bigFirstSymbol) {
                        this.validationElement(this.regexp_first_name, value, options[item]);
                    }
                    if (item === 'firstName' && options[item].bigFirstSymbol) {
                        this.regexp_first_name = eval(`/^[A-Z|А-Я]{1,1}[a-z|а-я]{${options[item].minLength},${options[item].maxLength}}$/`);
                        this.validationElement(this.regexp_first_name, value, options[item]);
                    }
                    if (item === 'firstName' && options[item].onlyEn) {
                        this.regexp_first_name_only_en = eval(`/^[A-Z]{1,1}[a-z]{${options[item].minLength},${options[item].maxLength}}$/`);
                        this.validationElement(this.regexp_first_name_only_en, value, options[item]);
                    }
                    if (item === 'firstName' && options[item].onlyRus) {
                        this.regexp_first_name_only_rus = eval(`/^[А-Я]{1,1}[а-я]{${options[item].minLength},${options[item].maxLength}}$/`);
                        this.validationElement(this.regexp_first_name_only_rus, value, options[item]);
                    }
                    if (item === 'lastName' &&
                        !options[item].onlyRus &&
                        !options[item].onlyEn) {
                        this.validationElement(this.regexp_last_name, value, options[item]);
                    }
                    if (item === 'lastName' && options[item].bigFirstSymbol) {
                        this.regexp_last_name = eval(`/^[A-Z|А-Я]{1,1}[a-z|а-я]{${options[item].minLength},${options[item].maxLength}}$/`);
                        this.validationElement(this.regexp_last_name, value, options[item]);
                    }
                    if (item === 'lastName' && options[item].onlyEn) {
                        this.regexp_last_name_only_en = eval(`/^[A-Z]{1,1}[a-z]{${options[item].minLength},${options[item].maxLength}}$/`);
                        this.validationElement(this.regexp_last_name_only_en, value, options[item]);
                    }
                    if (item === 'lastName' && options[item].onlyRus) {
                        this.regexp_last_name_only_rus = eval(`/^[А-Я]{1,1}[а-я]{${options[item].minLength},${options[item].maxLength}}$/`);
                        this.validationElement(this.regexp_last_name_only_rus, value, options[item]);
                    }
                });
            }

            this.submitForm(options[item]);
        }

        return this;
    }
}

module.exports.Valval = Valval;