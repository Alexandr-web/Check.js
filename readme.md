## What it is?
This is a library for form validation. This library is under development, so don't judge strictly)
## How it works?
>**Use together with input type="submit" and form**
- **HTML**
```html
    <form action="" data-valval="form">
        <!-- In "data-valval" put the name -->
        <input type="text" data-valval="firstName" />
        <input type="password" data-valval="password" />
        <input type="password" data-valval="repeatPassword" />
        <input type="submit" data-valval="button" value="Submit">
    </form>
```
- **CSS**
```css
    .valid {
        background-color: rgba(0, 255, 0, .3);
    }

    .invalid {
        background-color: rgba(255, 0, 0, .3);
    }
```
- **JavaScript**
```javascript
    import { Valval } from 'valval';

    const options = {
        // Name which we indicated in "data-valval"
        firstName: {
            // Indicate params
            required: true,
            minLength: 6,
            maxLength: 12,
            name: true,
            classValid: 'valid',
            classInvalid: 'invalid',
            onlyEn: true
        },
        // Name which we indicated in "data-valval"
        password: {
            // Indicate params
            required: true,
            minLength: 6,
            password: true,
            classValid: 'valid',
            classInvalid: 'invalid',
            contentInPassword: ["alex", "123"]
        },
        // Name which we indicated in "data-valval"
        repeatPassword: {
            // Indicate params
            required: true,
            repeatPassword: true,
            repeatAt: 'password',
            classValid: 'valid',
            classInvalid: 'invalid'
        },
        // Name which we indicated in "data-valval"
        button: {
            // Indicate params
            textWhenValid: 'Valid form',
            textWhenInvalid: 'Invalid form',
            button: true
        },
        form: {
            formSubmit: true,
            classValid: 'valid-form',
            classValid: ['invalid-form', 'invalid-form2'],
            handlerWhenValidForm: function() {
                alert('Valid!');
            },
            handlerWhenInvalidForm: function() {
                alert('Invalid!');
            }
        } 
    }

    // Put options in method "start"
    new Valval().start(options);
```
## Options
- **General**
    | Option | Type | Value | Example |
    | ------ | ------ | ------ | ------ |
    | password | Boolean | For password | ``` password: true ``` |
    | mail | Boolean | For email | ``` mail: true ``` |
    | message | Boolean | For message | ``` message: true ``` |
    | date | Boolean | For date | ``` date: true ``` |
    | tel | Boolean | For phone | ``` tel: true ``` |
    | repeatPassword | Boolean | For repeat password | ``` repeatPassword: true ``` |
    | name | Boolean | For name | ``` name: true ``` |
    | button | Boolean | For button (type="submit") | ``` button: true ``` |
    | formSubmit | Boolean | For form | ``` formSubmit: true ``` |

    Options in ``` validationElement ```
    | Option | Type | Value | Example |
    | ------ | ------ | ------ | ------ |
    | have | Boolean | Will there be an item to check | ``` have: true ``` |
    | classValid | String or Object | Element class after successful check (the default class is .valval-valid-el). Or multiple classes ``` classValid: ['class1', 'class2', ...] ``` | ``` classValid: 'valid-el' ``` |
    | classInvalid | String or Object | Element class after unsuccessful check (the default class is .valval-invalid-el). Or multiple classes ``` classInvalid: ['class1', 'class2', ...] ``` | ``` classInvalid: 'invalid-el' ``` |
    | selectorEl | String | Element selector | ``` selectorEl: '.validation-el' ``` |
    | textWhenValid | String | Element text after successful check | ``` textWhenValid: 'Successfully' ``` |
    | textWhenInvalid | String | Element text after unsuccessful check | ``` textWhenValid: 'Unsuccessfully' ``` |
- **Unique**

    Options in ``` password ```
    | Option | Type | Value | Example |
    | ------ | ------ | ------ | ------ |
    | onlyRus | Boolean | Only russian language (русский) | ``` onlyRus: true ``` |
    | onlyEn | Boolean | Only english language (english) | ``` onlyEn: true ``` |
    | onlyNumbers | Boolean | Only numbers (123456) | ``` onlyNumbers: true ``` |
    >**If all these properties are disabled (false),**
    >**then the default is any value in the line**

    | Option | Type | Value | Example |
    | ------ | ------ | ------ | ------ |
    | handlerWhenValidElement | Function | Works handler when valid element | ``` handlerWhenValidElement: () => {} ``` |
    | handlerWhenInvalidElement | Function | Works handler when invalid element | ``` handlerWhenInvalidElement: () => {} ``` |
    | required | Boolean | Required input field | ``` required: true  ``` |
    | minLength | Number | Minimum number of characters per line (default 1) | ``` minLength: 6 ``` |
    | maxLength | Number | Maximum number of characters per line (infinity by default) | ``` maxLength: 6 ``` |
    | contentInPassword | Object | What should be in the password | ``` contentInPassword: ["alex", "123", "A"] ``` |
    | classValid | String or Object | Element class after successful check (the default class is .valval-valid). Or multiple classes ``` classValid: ['class1', 'class2', ...] ``` | ``` classValid: 'valid' ``` |
    | classInvalid | String or Object | Element class after unsuccessful validation (the default class is .valval-invalid). Or multiple classes ``` classInvalid: ['class1', 'class2', ...] ``` | ``` classInvalid: 'invalid' ``` |
    | validationElement | Object | Item options to check | ``` validationElement: { have: true, selectorEl: '.password__valid' } ``` |
    | preventDefault | Boolean | To cancel page reload when sending data (default true) | ``` preventDefault: false ``` |

    >**besides: '*', '+', '(', ')', '$', '^', '?', '/', '|', '\\'.**
    >**Used when items (onlyEn, onlyRus, onlyNumbers) are disabled**

    Options in ``` repeatPassword ```
    | Option | Type | Value | Example |
    | ------ | ------ | ------ | ------ |
    | repeatAt | String | The name of the item in the object at which you want to repeat the password | ``` repeatAt: 'password' ``` |
    | handlerWhenValidElement | Function | Works handler when valid element | ``` handlerWhenValidElement: () => {} ``` |
    | handlerWhenInvalidElement | Function | Works handler when invalid element | ``` handlerWhenInvalidElement: () => {} ``` |
    | classValid | String or Object | Element class after successful check (the default class is .valval-valid). Or multiple classes ``` classValid: ['class1', 'class2', ...] ``` | ``` classValid: 'valid' ``` |
    | classInvalid | String or Object | Element class after unsuccessful validation (the default class is .valval-invalid). Or multiple classes ``` classInvalid: ['class1', 'class2', ...] ``` | ``` classInvalid: 'invalid' ``` |
    | validationElement | Object | Item options to check | ``` validationElement: { have: true, selectorEl: '.repeat-password__valid' } ``` |
    | preventDefault | Boolean | To cancel page reload when sending data (default true) | ``` preventDefault: false ``` |

    Options in ``` mail ```
    | Option | Type | Value | Example |
    | ------ | ------ | ------ | ------ |
    | handlerWhenValidElement | Function | Works handler when valid element | ``` handlerWhenValidElement: () => {} ``` |
    | handlerWhenInvalidElement | Function | Works handler when invalid element | ``` handlerWhenInvalidElement: () => {} ``` |
    | required | Boolean | Required input field | ``` required: true  ``` |
    | classValid | String or Object | Element class after successful check (the default class is .valval-valid). Or multiple classes ``` classValid: ['class1', 'class2', ...] ``` | ``` classValid: 'valid' ``` |
    | classInvalid | String or Object | Element class after unsuccessful validation (the default class is .valval-invalid). Or multiple classes ``` classInvalid: ['class1', 'class2', ...] ``` | ``` classInvalid: 'invalid' ``` |
    | validationElement | Object | Item options to check | ``` validationElement: { have: true, selectorEl: '.mail__valid' } ``` |
    | preventDefault | Boolean | To cancel page reload when sending data (default true) | ``` preventDefault: false ``` |

    Options in ``` date ```
    | Option | Type | Value | Example |
    | ------ | ------ | ------ | ------ |
    | onlyDot | Boolean | The date goes only through a dot (11.11.1111) | ``` onlyDot: true ``` |
    | onlySlash | Boolean | The date goes only through a slash (11/11/1111) | ``` onlySlash: true ``` |
    | onlyHyphen | Boolean | The date goes only through a hyphen (11-11-1111) | ``` onlyHyphen: true ``` |
    >**If all of these properties are disabled (false),**
    >**then the default is either a slash, a dot, or a hyphen**

    | Option | Type | Value | Example |
    | ------ | ------ | ------ | ------ |
    | required | Boolean | Required input field | ``` required: true  ``` |
    | handlerWhenValidElement | Function | Works handler when valid element | ``` handlerWhenValidElement: () => {} ``` |
    | handlerWhenInvalidElement | Function | Works handler when invalid element | ``` handlerWhenInvalidElement: () => {} ``` |
    | classValid | String or Object | Element class after successful check (the default class is .valval-valid). Or multiple classes ``` classValid: ['class1', 'class2', ...] ``` | ``` classValid: 'valid' ``` |
    | classInvalid | String or Object | Element class after unsuccessful validation (the default class is .valval-invalid). Or multiple classes ``` classInvalid: ['class1', 'class2', ...] ``` | ``` classInvalid: 'invalid' ``` |
    | validationElement | Object | Item options to check | ``` validationElement: { have: true, selectorEl: '.date__valid' } ``` |
    | preventDefault | Boolean | To cancel page reload when sending data (default true) | ``` preventDefault: false ``` |

    Options in ``` tel ```
    | Option | Type | Value | Example |
    | ------ | ------ | ------ | ------ |
    | minLength | Number | Minimum number of characters per line (default 1) | ``` minLength: 6 ``` |
    | maxLength | Number | Maximum number of characters per line (infinity by default) | ``` maxLength: 6 ``` |
    | required | Boolean | Required input field | ``` required: true  ``` |
    | handlerWhenValidElement | Function | Works handler when valid element | ``` handlerWhenValidElement: () => {} ``` |
    | handlerWhenInvalidElement | Function | Works handler when invalid element | ``` handlerWhenInvalidElement: () => {} ``` |
    | classValid | String or Object | Element class after successful check (the default class is .valval-valid). Or multiple classes ``` classValid: ['class1', 'class2', ...] ``` | ``` classValid: 'valid' ``` |
    | classInvalid | String or Object | Element class after unsuccessful validation (the default class is .valval-invalid). Or multiple classes ``` classInvalid: ['class1', 'class2', ...] ``` | ``` classInvalid: 'invalid' ``` |
    | validationElement | Object | Item options to check | ``` validationElement: { have: true, selectorEl: '.tel__valid' } ``` |
    | preventDefault | Boolean | To cancel page reload when sending data (default true) | ``` preventDefault: false ``` |

    Options in ``` name ```
    | Option | Type | Value | Example |
    | ------ | ------ | ------ | ------ |
    | onlyEn | Boolean | Only english language (english) | ``` onlyEn: true ``` |
    | onlyRus | Boolean | Only russian language (русский) | ``` onlyRus: true ``` |
    | bigFirstSymbol | Boolean | Line starts with a capital letter | ``` bigFirstSymbol: true ``` |
    >**If all these properties are disabled (false),**
    >**then by default - any value in a string of type String**

    | Option | Type | Value | Example |
    | ------ | ------ | ------ | ------ |
    | minLength | Number | Minimum number of characters per line (default 1) | ``` minLength: 6 ``` |
    | maxLength | Number | Maximum number of characters per line (infinity by default) | ``` maxLength: 6 ``` |
    | required | Boolean | Required input field | ``` required: true  ``` |
    | handlerWhenValidElement | Function | Works handler when valid element | ``` handlerWhenValidElement: () => {} ``` |
    | handlerWhenInvalidElement | Function | Works handler when invalid element | ``` handlerWhenInvalidElement: () => {} ``` |
    | classValid | String or Object | Element class after successful check (the default class is .valval-valid). Or multiple classes ``` classValid: ['class1', 'class2', ...] ``` | ``` classValid: 'valid' ``` |
    | classInvalid | String or Object | Element class after unsuccessful validation (the default class is .valval-invalid). Or multiple classes ``` classInvalid: ['class1', 'class2', ...] ``` | ``` classInvalid: 'invalid' ``` |
    | validationElement | Object | Item options to check | ``` validationElement: { have: true, selectorEl: '.name__valid' } ``` |
    | preventDefault | Boolean | To cancel page reload when sending data (default true) | ``` preventDefault: false ``` |

    Options in ``` message ```
    | Option | Type | Value | Example |
    | ------ | ------ | ------ | ------ |
    | minLength | Number | Minimum number of characters per line (default 1) | ``` minLength: 6 ``` |
    | maxLength | Number | Maximum number of characters per line (infinity by default) | ``` maxLength: 6 ``` |
    | required | Boolean | Required input field | ``` required: true  ``` |
    | handlerWhenValidElement | Function | Works handler when valid element | ``` handlerWhenValidElement: () => {} ``` |
    | handlerWhenInvalidElement | Function | Works handler when invalid element | ``` handlerWhenInvalidElement: () => {} ``` |
    | classValid | String or Object | Element class after successful check (the default class is .valval-valid). Or multiple classes ``` classValid: ['class1', 'class2', ...] ``` | ``` classValid: 'valid' ``` |
    | classInvalid | String or Object | Element class after unsuccessful validation (the default class is .valval-invalid). Or multiple classes ``` classInvalid: ['class1', 'class2', ...] ``` | ``` classInvalid: 'invalid' ``` |
    | validationElement | Object | Item options to check | ``` validationElement: { have: true, selectorEl: '.message__valid' } ``` |
    | preventDefault | Boolean | To cancel page reload when sending data (default true) | ``` preventDefault: false ``` |

    Options in ``` button ```
    | Option | Type | Value | Example |
    | ------ | ------ | ------ | ------ |
    | textWhenValid | String | Button text on successful check | ``` textWhenValid: 'Valid form' ``` |
    | textWhenInvalid | String | Button text on unsuccessful check | ``` textWhenInvalid: 'Invalid form' ``` |
    | classValid | String or Object | Button class on successful check (the default class is .valval-valid-btn). Or multiple classes: ``` classValid: ['class1', 'class2', ...] ``` | ``` classValid: 'valid-btn' ``` |
    | classInvalid | String or Object | Button class on unsuccessful check (the default class is .valval-invalid-btn). Or multiple classes ``` classInvalid: ['class1', 'class2', ...] ``` | ``` classInvalid: 'invalid-btn' ``` |

    Options in ``` formSubmit ```
    | Option | Type | Value | Example |
    | ------ | ------ | ------ | ------ |
    | classValid | String or Object | Button class on successful check (the default class is .valval-valid-form). Or multiple classes: ``` classValid: ['class1', 'class2', ...] ``` | ``` classValid: 'valid-form' ``` |
    | classInvalid | String or Object | Button class on unsuccessful check (the default class is .valval-invalid-form). Or multiple classes ``` classInvalid: ['class1', 'class2', ...] ``` | ``` classInvalid: 'invalid-form' ``` |
    | handlerWhenInvalidForm | Function | Handler when invalid form | ``` handlerWhenInvalidForm: () => {} ``` |
    | handlerWhenValidForm | Function | Handler when valid form | ``` handlerWhenValidForm: () => {} ``` |
    | validationElement | Object | Item options to check | ``` validationElement: { have: true, selectorEl: '.form__valid' } ``` |