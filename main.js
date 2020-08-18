const characterAmountRange = document.getElementById('characterAmountRange')
const characterAmountNumber = document.getElementById('characterAmountNumber')
const form = document.getElementById('passwordGeneratorForm')
const uppercaseElement = document.getElementById('uppercase')
const lowercaseElement = document.getElementById('lowercase')
const numbersElement = document.getElementById('numbers')
const specialsElement = document.getElementById('specials')
const passwordDisplay = document.getElementById('result')
const clipBoardCopy = document.getElementById('copy')

//Tabice stworzone z charCode do poszczególnych opcji. 
const uppercaseArrayCodes = arrayCharCodeFunction(65, 89);
const lowercaseArrayCodes = arrayCharCodeFunction(97, 122);
const numberArrayCodes = arrayCharCodeFunction(48, 57);
const specialsArrayCodes = [...arrayCharCodeFunction(33),...arrayCharCodeFunction(35,38),...arrayCharCodeFunction(40,42)];

let password;

// Synchronizowany suwak zależny od wielkości liczby znaków.
characterAmountNumber.addEventListener('input', syncCharacterAmount)
characterAmountRange.addEventListener('input', syncCharacterAmount)

//Zatwierdzanie kliku -> przycisk już nie odświeża strony.
form.addEventListener('submit', e => {
    e.preventDefault()
    const characterAmount = characterAmountNumber.value
    const uppercase = uppercaseElement.checked
    const lowercase = lowercaseElement.checked
    const numbers = numbersElement.checked
    const specials = specialsElement.checked
    const password = generatePassword(characterAmount, lowercase, uppercase, numbers, specials)
    passwordDisplay.innerText = password
});

//Przycisk odpowiedzialny za kopiowanie treści hasła do schowka. 
clipBoardCopy.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = passwordDisplay.innerHTML;

    if (!password) {
        return;
    }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Password copied to clipboard!');
});

//Funkcja, która generuje hasło. 
function generatePassword(characterAmount, lowercase, uppercase, numbers, specials) {
    let charCodes = [];
    
    if (lowercase) charCodes = charCodes.concat(lowercaseArrayCodes)
    if (uppercase) charCodes = charCodes.concat(uppercaseArrayCodes)
    if (numbers) charCodes = charCodes.concat(numberArrayCodes)
    if (specials) charCodes = charCodes.concat(specialsArrayCodes)

    
    const passwordCharacters = [];
    for (let i = 0; i < characterAmount; i++) {
        const characterCode = charCodes[Math.floor(Math.random()* charCodes.length)]
        passwordCharacters.push(String.fromCharCode(characterCode))
    }
    return passwordCharacters.join('')
}
//Funckja, która generuje tablice, przyjmujące wartości dla odpowiednich klawiszy na podstawie ASCII 
function arrayCharCodeFunction(a, b) {
    const array = [];
    for (let i = a; i <= b; i++) {
        array.push(i)
    }
    return array;
    
}
//Funckja syncrhonizująca suwak
function syncCharacterAmount(e) {
    const value = e.target.value;
    characterAmountNumber.value = value
    characterAmountRange.value = value
}