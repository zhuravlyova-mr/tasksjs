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

describe("Right Whites", function() {

  it("Leaves an empty line as is", function() {
     assert.equal(rightWhites(""), "");
  });

  it("Returns 'undefined' when the string is undefined", function() {
    let str;
    assert.equal(rightWhites(str), undefined);
  });

  it("Transforms string '  First   , second  : third;next ...and     other'", function() {
    assert.equal(rightWhites('  First   , second  : third;next ...and     other .  '), 'First, second: third; next... and other.');
  });

  it("Transforms string 'In these    algorithms   , a range can be    specified as either an   ... and pointer-to-member callables are supported  .'", function() {
    assert.equal(rightWhites('In these    algorithms   , a range can be    specified as either an   ... and pointer-to-member callables are supported  .'),
     'In these algorithms, a range can be specified as either an... and pointer-to-member callables are supported.');
  });

  it("Transforms string 'Вот   пример строки,в которой   используются знаки препинания.После знаков должны стоять пробелы , а перед знаками их быть не должно .    Если есть лишние подряд идущие пробелы, они должны быть устранены.", function() {
    assert.equal(rightWhites('Вот   пример строки,в которой   используются знаки препинания.После знаков должны стоять пробелы , а перед знаками их быть не должно .    Если есть лишние подряд идущие пробелы, они должны быть устранены.'),
     'Вот пример строки, в которой используются знаки препинания. После знаков должны стоять пробелы, а перед знаками их быть не должно. Если есть лишние подряд идущие пробелы, они должны быть устранены.');
  });
});
