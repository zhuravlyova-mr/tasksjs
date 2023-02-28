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


describe("subtractBigValues", function() {

  it("Subtract empty values", function() {
     assert.equal(subtractBigValues("", ""), "0");
  });

  it("Subtract undefined values", function() {
    let str;
    let anotherStr;
    assert.equal(subtractBigValues(str, anotherStr), 'NaN');
  });

  it("Not value and value", function() {
    assert.equal(subtractBigValues('34efr','    +234 '), 'NaN');
  });

  it("Value and not value", function() {
    assert.equal(subtractBigValues('   4534','e45'), 'NaN');
  });

  it("Subtract very long values '2222222222222222222222222222222222222222222224', '1111111111111111111111111111111111111111111111'", function() {
    assert.equal(subtractBigValues('2222222222222222222222222222222222222222222224',
                                   '1111111111111111111111111111111111111111111111'),
                                   '1111111111111111111111111111111111111111111113');
  });

});