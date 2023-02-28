function excludeTrimsAndPlus(str) {

    str = str?.trim();
    
    if (str?.[0] == '+') {
        str = str.slice(1); 
    }
 
    return str;
}

describe("IsValue", function() {

  it("Leaves an empty line as is", function() {
     assert.equal(isValue(""), "");
  });

  it("Returns 'undefined' when the string is undefined", function() {
    let str;
    assert.equal(isValue(str), undefined);
  });

  it("Valid string: '    +234 '", function() {
    assert.equal(isValue('    +234 '), '234');
  });

  it("Valid string: '   4534'", function() {
    assert.equal(isValue('   4534'), '4534');
  });

  it("Invalid string: '+234rt'", function() {
    assert.equal(isValue('+234rt'), undefined);
  });

  it("Valid string: '-234'", function() {
    assert.equal(isValue('-234'), '-234');
  });

  it("Empty string: '   +     '", function() {
    assert.equal(isValue('   +     '), '');
  });


});