import { toLowerExceptFirst, rightWhites, punctuationMarks, toOriginal,  wordsInString, uniqueWords } from './src/module.js';

let str =  "this is Not ALONGstrIng";
alert( toLowerExceptFirst(str) ); 

let otherStr = "   Варкалось  .Хливкие     шорьки   !\
Пырялись :по наве ,      И хрюкотали   ;   зелюки  ,    Как  мюмзики в мове  ...Как то так .";
alert( rightWhites(otherStr) );

alert( wordsInString(str) );

let mapOfWords = uniqueWords("Шалтай-Болтай Сидел на стене. Шалтай-Болтай Свалился во сне.\
Вся королевская конница, Вся королевская рать не может Шалтая, не может Болтая,\
Шалтая-Болтая, Болтая-Шалтая, Шалтая-Болтая собрать!");
for (let key in mapOfWords) {
    alert(`${key}: ${mapOfWords[key]}`);
}
