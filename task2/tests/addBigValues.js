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


describe("addBigValues", function() {

  it("Add empty values", function() {
     assert.equal(addBigValues("", ""), "0");
  });

  it("Add undefined values", function() {
    let str;
    let anotherStr;
    assert.equal(addBigValues(str, anotherStr), 'NaN');
  });

  it("Not value and value", function() {
    assert.equal(addBigValues('34efr','    +234 '), 'NaN');
  });

  it("Value and not value", function() {
    assert.equal(addBigValues('   4534','e45'), 'NaN');
  });

  it("Very long values '1111111111111111111111111111111111111111111111', '2222222222222222222222222222222222222222222224'", function() {
    assert.equal(addBigValues('1111111111111111111111111111111111111111111111',
                              '2222222222222222222222222222222222222222222224'),
                              '3333333333333333333333333333333333333333333335');
  });

  it("Other vallues: '22222222222', '3333333333333333333333333333333333333333333333'", function() {
    assert.equal(addBigValues('22222222222', '3333333333333333333333333333333333333333333333'), 
                                             '3333333333333333333333333333333333355555555555');
  });  


});