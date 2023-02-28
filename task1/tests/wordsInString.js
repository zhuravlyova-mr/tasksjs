describe("Words In String Account", function() {

  it("0 in an empty string", function() {
     assert.equal(wordsInString(""), 0);
  });

  it("0 in the string of non-text symbols", function() {
     assert.equal(wordsInString("         @  764 3^&"), 0);
  });


  it("Returns 'undefined' when the string is undefined", function() {
    let str;
    assert.equal(wordsInString(str), undefined);
  });

  it("6 in string '  First   , second  : third;next ...and     other'", function() {
    assert.equal(wordsInString('  First   , second  : third;next ...and     other .  '), 6);
  });

  it("16 in string 'In these & *  * algorithms   , a range can be    specified as either an   ... and pointertomember callables are supported  .'", function() {
    assert.equal(wordsInString('In these & *  * algorithms   , a range can be    specified as either an   ... and pointertomember callables are supported  .'), 16);
  });

  it("30 in string 'Вот   пример строки,в которой   используются знаки препинания.После знаков должны стоять пробелы , а перед знаками их быть не должно .    Если есть лишние подряд идущие пробелы, они должны быть устранены.", function() {
    assert.equal(wordsInString('Вот   пример строки,в которой   используются знаки препинания.После знаков должны стоять пробелы , а перед знаками их быть не должно .    Если есть лишние подряд идущие пробелы, они должны быть устранены.'), 30);
  });
});
