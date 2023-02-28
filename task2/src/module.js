function addBigValues(firstString, secondString)  {
    
    firstString = isValue(firstString);
    secondString = isValue(secondString);
    
    return (firstString == undefined || secondString == undefined) ?
        NaN.toString() : (BigInt(firstString) + BigInt(secondString)).toString();
}

function subtractBigValues(firstString, secondString)  {
    
    firstString = isValue(firstString);
    secondString = isValue(secondString);
    
    return (firstString == undefined || secondString == undefined) ?
        NaN.toString() : (BigInt(firstString) - BigInt(secondString)).toString();
}

function multiplyBigValues(firstString, secondString)  {
    
    firstString = isValue(firstString);
    secondString = isValue(secondString);
    
    return (firstString == undefined || secondString == undefined) ?
        NaN.toString() : (BigInt(firstString) * BigInt(secondString)).toString();
}

function divideBigValues(firstString, secondString)  {
    
    firstString = isValue(firstString);
    secondString = isValue(secondString);
    
    return (firstString == undefined || secondString == undefined) ?
        NaN.toString() : ( (firstString == '' || firstString == '0') &&
                           (secondString == ''|| secondString == '0') ) ? 
                           NaN.toString() : (secondString == '0' || secondString == '') ? 
                           Infinity : (BigInt(firstString) / BigInt(secondString)).toString();
}

//Проверяет, является ли строка валидным числом.
//Возвращает: пустую строку, если цифр нет,
//undefined, если строка undefined или не целое число 
function isValue(str) {

    if (str == undefined) {
        return str;
    }

    str = excludeTrimsAndPlus(str);
    if (str == '') {
        return str;
    }

    let matched = str.match(/^-?[1-9]\d*$|^0$/);   //-0 считается невалидным      
    return (matched == null) ? undefined : matched.join();
}

//Удаляет лидирующие и хвостовые пробелы,
//а также знак + в 0 позиции
function excludeTrimsAndPlus(str) {
    str = str?.trim();
    
    if (str?.[0] == '+') {
        str = str.slice(1); 
    }

    return str;
}

export { addBigValues, subtractBigValues, multiplyBigValues, divideBigValues, isValue, excludeTrimsAndPlus };