# Documentation Check.js
## Keys
| Key | Explanation |
| ------ | ------ |
| mail | For email |
| password | For password |
| date | For date |
| tel | For phone |
| repeatPassword | For repeat password |
| firstName | For first name |
| lastName | For last name |

>**Keys should not be repeated**
>**(1 object for the whole form)**
- ### mail 
    #### Example
    ```javascript
    const options = {
	    mail: {
		    selectorEl: '.email',
		    required: true
	    }
    }
    
    new Check().start(options);
    ```
- ### firstName 
    #### Example
    ```javascript
    const options = {
	    firstName: {
		    selectorEl: '.first-name',
		    required: true
	    }
    }
    
    new Check().start(options);
    ```
- ### lastName 
    #### Example
    ```javascript
    const options = {
	    lastName: {
		    selectorEl: '.last-name',
		    required: true
	    }
    }
    
    new Check().start(options);
    ```
- ### password
    #### Example
    ```javascript
    const options = {
	    password: {
		    selectorEl: '.password',
		    required: true
	    }
    }
    
    new Check().start(options);
    ```
- ### date
    #### Example
    ```javascript
    const options = {
	    date: {
		    selectorEl: '.date',
		    required: true
	    }
    }
    
    new Check().start(options);
    ```
- ### tel
    #### Example
    ```javascript
    const options = {
	    tel: {
		    selectorEl: '.tel',
		    required: true
	    }
    }
    
    new Check().start(options);
    ```
- ### repeatPassword
    #### Example
    ```javascript
    const options = {
	    repeatPassword: {
		    selectorEl: '.repeatPassword',
		    required: true
	    }
    }
    
    new Check().start(options);
    ```
    
## Options
- ### General
    | Option | Type | Value | Example |
    | ------ | ------ | ------ | ------ |
    | required | Boolean | Required input field | ``` required: true  ``` |
    | selectorEl | String | Element selector | ``` selectorEl: '.password' ``` |
    | validationElement | Object | Item options to check | ``` validationElement: { have: true, selectorEl: '.password__valid' } ``` |
    | classValid | String | Element class after successful check (the default class is .check-valid) | ``` classValid: 'valid' ``` |
    | classInvalid | String | Element class after unsuccessful validation (the default class is .check-invalid) | ``` classInvalid: 'invalid' ``` |
        
    ### Options in ``` validationElement ```
    | Option | Type | Value | Example |
    | ------ | ------ | ------ | ------ |
    | have | Boolean | Will there be an item to check | ``` have: true ``` |
    | classValid | String | Element class after successful check (the default class is .check-valid-el) | ``` classValid: 'valid-el' ``` |
    | classInvalid | String | Element class after unsuccessful check (the default class is .check-invalid-el) | ``` classInvalid: 'invalid-el' ``` |
    | selectorEl | String | Element selector | ``` selectorEl: '.validation-el' ``` |
    | textWhenValid | String | Element text after successful check | ``` textWhenValid: 'Successfully' ``` |
    | textWhenInvalid | String | Element text after unsuccessful check | ``` textWhenValid: 'Unsuccessfully' ``` |
- ### Unique
    ### Options in ``` password ```
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
    ### Options in ``` repeatPassword ```
    | Option | Type | Value | Example |
    | ------ | ------ | ------ | ------ |
    | repeatAt | String | The element selector at which you want to repeat the password | ``` repeatAt: '.password' ``` |
    ### Options in ``` date ```
    | Option | Type | Value | Example |
    | ------ | ------ | ------ | ------ |
    | onlyDot | Boolean | The date goes only through a dot (11.11.1111) | ``` onlyDot: true ``` |
    | onlySlash | Boolean | The date goes only through a slash (11/11/1111) | ``` onlySlash: true ``` |
    | onlyHyphen | Boolean | The date goes only through a hyphen (11-11-1111) | ``` onlyHyphen: true ``` |
    >**If all of these properties are disabled (false),**
    >**then the default is either a slash, a dot, or a hyphen**
        
    ### Options in ``` tel ```
    | Option | Type | Value | Example |
    | ------ | ------ | ------ | ------ |
    | minLength | Number | Minimum number of characters per line (default 1) | ``` minLength: 6 ``` |
    | maxLength | Number | Maximum number of characters per line (infinity by default) | ``` maxLength: 6 ``` |
    ### Options in ``` firstName ``` and ``` lastName ```
    | Option | Type | Value | Example |
    | ------ | ------ | ------ | ------ |
    | onlyEn | Boolean | Only english language (english) | ``` onlyEn: true ``` |
    | onlyRus | Boolean | Only russian language (русский) | ``` onlyRus: true ``` |
    | bigFirstSymbol | Boolean | Line starts with a capital letter | ``` bigFirstSymbol: true ``` |
    >**If all these properties are disabled (false),**
    >**then the default is any value in the line**
    
    | Option | Type | Value | Example |
    | ------ | ------ | ------ | ------ |
    | minLength | Number | Minimum number of characters per line (default 1) | ``` minLength: 6 ``` |
    | maxLength | Number | Maximum number of characters per line (infinity by default) | ``` maxLength: 6 ``` |

## Examples of work
- ### Simplest form validation
    #### HTML Code
    ```html
        <!-- HTML code -->
        <form action="/" method="POST">
            <input type="text" placeholder="Email" class="email" name="email">
            <input type="password" placeholder="Password" class="password" name="password">
            <input type="text" placeholder="Date" class="date" name="date">
            <input type="submit" value="Submit">
        </form>
            
        <!-- Include the library file -->
        <script src="./js/Check.js"></script>
        <!-- Our file -->
        <script src="./js/script.js"></script>
    ```
            
    #### CSS Code
    ```css
        input {
            outline: none;
        }
            
        .check-valid {
            background-color: rgba(0, 255, 0, 0.3);
        }
            
        .check-invalid {
            background-color: rgba(255, 0, 0, 0.3);
        }
    ```
        
    #### JavaScript Code
    ```javascript
        // Writing options for your form
        const options = {
            mail: {
                selectorEl: '.email',
                required: true
            },
            password: {
                selectorEl: '.password',
                required: true,
                minLength: 6
            },
            date: {
                selectorEl: '.date',
                required: true
            }
        }
    
        new Check().start(options);
    ```
- ### Email and password verification
    #### HTML Code
    ```html
        <!-- HTML code -->
        <form action="/" method="POST">
            <input type="password" placeholder="Password" class="password" name="password">
            <span class="password__valid-el"></span>
            <input type="password" placeholder="Repeat password" class="repeat-password">
            <span class="repeat-password__valid-el"></span>
            <input type="text" placeholder="Email" class="email" name="email">
            <span class="email__valid-el"></span>
            <input type="submit" value="Submit">
        </form>
            
        <!-- Include the library file -->
        <script src="./js/Check.js"></script>
        <!-- Our file -->
        <script src="./js/script.js"></script>
    ```
    #### JavaScript Code
    ```javascript
        // Writing options for your form
        const options = {
            password: {
                selectorEl: '.password',
                required: true,
                minLength: 6,
                maxLength: 12,
                onlyEn: true,
                validationElement: {
                    have: true,
                    selectorEl: '.password__valid-el',
                    textWhenValid: 'Ok',
                    textWhenInvalid: 'Bad'
                }
            },
            mail: {
                selectorEl: '.email',
                required: true,
                validationElement: {
                    have: true,
                    selectorEl: '.email__valid-el',
                    textWhenValid: 'Ok',
                    textWhenInvalid: 'Bad'
                }
            },
            repeatPassword: {
                required: true,
                repeatAt: '.password',
                selectorEl: '.repeat-password',
                validationElement: {
                    have: true,
                    selectorEl: '.repeat-password__valid-el',
                    textWhenValid: 'Ok',
                    textWhenInvalid: 'Bad'
                }
            }
        }
    
        new Check().start(options);
    ```