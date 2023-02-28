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


describe("multiplyBigValues", function() {

  it("Mutiply empty values", function() {
     assert.equal(multiplyBigValues("", ""), "0");
  });

  it("Multiply undefined values", function() {
    let str;
    let anotherStr;
    assert.equal(multiplyBigValues(str, anotherStr), 'NaN');
  });

  it("Not value and value", function() {
    assert.equal(multiplyBigValues('34efr','    +234 '), 'NaN');
  });

  it("Value and not value", function() {
    assert.equal(multiplyBigValues('   4534','e45'), 'NaN');
  });

  it("Multiply very long values '2222222222222222222222222222222222222222222224', '1111111111111111111111111111111111111111111111'", function() {
    assert.equal(multiplyBigValues('2222222222222222222222222222222222222222222224',
                                   '1111111111111111111111111111111111111111111111'),
                                   '2469135802469135802469135802469135802469135804197530864197530864197530864197530864197530864');
  });

});