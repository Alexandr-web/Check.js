# Version 2.0.0
## What it is?
This is a library for form validation. This library is under development, so don't judge strictly)
## How it works?
>**Use together with input type="submit"**
- **HTML**
```html
    <form>
        <!-- In "data-valval" put the name -->
        <input type="text" data-valval="firstName" />
        <input type="password" data-valval="password" />
        <input type="password" data-valval="repeatPassword" />
        <input type="submit" value="Submit">
    </form>
```
- **CSS**
```css
    .valid {
        background-color: green;
    }
        
    .invalid {
        background-color: red;
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
                firstName: true,
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
                classInvalid: 'invalid'
            },
            // Name which we indicated in "data-valval"
            repeatPassword: {
                // Indicate params
                required: true,
                repeatPassword: true,
                repeatAt: 'password',
                classValid: 'valid',
                classInvalid: 'invalid'
            }
        }
    // Put options in method "start"
    new Valval().start(options);
```
## Options
- **General**
    | Option | Type | Value | Example |
    | ------ | ------ | ------ | ------ |
    | required | Boolean | Required input field | ``` required: true  ``` |
    | validationElement | Object | Item options to check | ``` validationElement: { have: true, selectorEl: '.password__valid' } ``` |
    | classValid | String | Element class after successful check (the default class is .valval-valid) | ``` classValid: 'valid' ``` |
    | classInvalid | String | Element class after unsuccessful validation (the default class is .valval-invalid) | ``` classInvalid: 'invalid' ``` |
    | preventDefault | Boolean | To cancel page reload when sending data (default true) | ``` preventDefault: false ``` |
    | password | Boolean | For password | ``` password: true ``` |
    | mail | Boolean | For email | ``` mail: true ``` |
    | message | Booelan | For message | ``` message: true ``` |
    | date | Boolean | For date | ``` date: true ``` |
    | tel | Boolean | For phone | ``` tel: true ``` |
    | repeatPassword | Boolean | For repeat password | ``` repeatPassword: true ``` |
    | firstName | Boolean | For first name | ``` firstName: true ``` |
    | lastName | Boolean | For last name | ``` lastName: true ``` |

    Options in ``` validationElement ```
    | Option | Type | Value | Example |
    | ------ | ------ | ------ | ------ |
    | have | Boolean | Will there be an item to check | ``` have: true ``` |
    | classValid | String | Element class after successful check (the default class is .valval-valid-el) | ``` classValid: 'valid-el' ``` |
    | classInvalid | String | Element class after unsuccessful check (the default class is .valval-invalid-el) | ``` classInvalid: 'invalid-el' ``` |
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
    | minLength | Number | Minimum number of characters per line (default 1) | ``` minLength: 6 ``` |
    | maxLength | Number | Maximum number of characters per line (infinity by default) | ``` maxLength: 6 ``` |

    Options in ``` repeatPassword ```
    | Option | Type | Value | Example |
    | ------ | ------ | ------ | ------ |
    | repeatAt | String | The name of the item in the object at which you want to repeat the password | ``` repeatAt: 'password' ``` |
    
    Options in ``` date ```
    | Option | Type | Value | Example |
    | ------ | ------ | ------ | ------ |
    | onlyDot | Boolean | The date goes only through a dot (11.11.1111) | ``` onlyDot: true ``` |
    | onlySlash | Boolean | The date goes only through a slash (11/11/1111) | ``` onlySlash: true ``` |
    | onlyHyphen | Boolean | The date goes only through a hyphen (11-11-1111) | ``` onlyHyphen: true ``` |
    >**If all of these properties are disabled (false),**
    >**then the default is either a slash, a dot, or a hyphen**
        
    Options in ``` tel ```
    | Option | Type | Value | Example |
    | ------ | ------ | ------ | ------ |
    | minLength | Number | Minimum number of characters per line (default 1) | ``` minLength: 6 ``` |
    | maxLength | Number | Maximum number of characters per line (infinity by default) | ``` maxLength: 6 ``` |
    
    Options in ``` firstName ``` and ``` lastName ```
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
