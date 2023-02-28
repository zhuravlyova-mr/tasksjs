    //1 - Преобразует строку str к виду "Как в предложениях"
    //Если строка пустая, возвращает ее
    function toLowerExceptFirst(str) {
        return (str == '') ? '' : (str == undefined) ? 
            undefined : str[0].toUpperCase() + 
            str.slice(1).toLowerCase();
    }
    
    //2 - Расставляет пробелы в строке в соответствии с правилами
    //Не допускаются подряд идущие знаки препинания
    //Тире и скобки не обрабатываются
    function rightWhites(str) {
        
        if (str == '' || str == undefined) {
            return str;
        }

        let marks = punctuationMarks(str);
        if (marks == null) {
            return str;
        }
        
        str = str.replace(/ +/g, ' ').trim();  //str = str.split(/\s+/).join(' ');
        let phrases = str.split(/[\.\,\:\;\!\?\"\'\`]/);
        
        phrases = phrases.filter(token =>  token != '');
        
        return toOriginal(phrases, marks);
    }
    
    //3 - Возвращает количество слов в строке
    //слова могут быть разделены указанными в регулярном выражении символами
    function wordsInString(str) {
        if (str == '' || str == undefined) {
            return str;
        }
        let words = str.split(/[\s+\.\,\:\;\!\?\-\<\>\_\$\@\#\&\%\^\*\[\]\(\)\{\}\\\/\~\|\d]/);
        words = words.filter(token =>  token != '');
        return words.length;
    }
    
    //4 - Подсчитывает уникальные слова, возвращает Map
    //Одинаковые слова с буквами в разных регистрах считаются одинаковыми
    function uniqueWords(str) {
        if (str == undefined) {
            return undefined;
        }

        let words = str.toLowerCase().split(/[\s+\.\,\:\;\!\?\-\<\>\_\$\@\#\&\%\^\*\[\]\(\)\{\}\\\/\~\|\d]/);
        words = words.filter(token =>  token != '');

        return words.reduce((map, word) => {
                map[word] ? ++map[word] : map[word] = 1;
                return map; 
               },
        {});   
    }

    function punctuationMarks(str) {
        return str.match(/[\,\:\;\!\?]|([\.][\.][\.])|[\.]/g);
    }

    function toOriginal(phrases, marks) {
        let result = '', i = 0;
        
        for (; i < phrases.length - 1; ++i) {
            result += phrases[i].trim() + marks[i] + ' ';          
        }
        result += phrases[i].trim() + (marks[i] ? marks[i] : '');

        return result;
    }

export { toLowerExceptFirst, rightWhites, punctuationMarks, toOriginal, wordsInString, uniqueWords};
