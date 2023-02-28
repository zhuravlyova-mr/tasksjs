function excludeTrimsAndPlus(str) {

    str = str?.trim();
    
    if (str?.[0] == '+') {
        str = str.slice(1); 
    }
 
    return str;
}

function isValue(str) {

    if (str == undefined) {
        return str;
    }

    str = excludeTrimsAndPlus(str);
    if (str == '') {
        return str;
    }

    let matched = str.match(/^-?[1-9]\d*$|^0$/);
    return (matched == null) ? undefined : matched.join();
}


describe("divideBigValues", function() {

  it("Divide empty values - NaN", function() {
     assert.equal(divideBigValues("", ""), "NaN");
  });

  it("Divide undefined values", function() {
    let str;
    let anotherStr;
    assert.equal(divideBigValues(str, anotherStr), 'NaN');
  });

  it("Not value and value", function() {
    assert.equal(divideBigValues('34efr','    +234 '), 'NaN');
  });

  it("Value and not value", function() {
    assert.equal(divideBigValues('   4534','e45'), 'NaN');
  });

  it("Very long values '2222222222222222222222222222222222222222222224', '1111111111111111111111111111111111111111111111'", function() {
    assert.equal(divideBigValues('2222222222222222222222222222222222222222222224',
                                   '1111111111111111111111111111111111111111111111'),
                                   '2');
  });

  it("Divide by zero is an Infinity", function() {
    assert.equal(divideBigValues('   4534','0'), 'Infinity');
  });


});