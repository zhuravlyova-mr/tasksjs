describe("uniqueWords", function() {

  it("String contains no words", function() {
        let result = new Map(); 
        let str = "";
        let myResult = uniqueWords(str);
        assert.equal(result.length, myResult.length);
        assert.equal(JSON.stringify(result),  JSON.stringify(myResult) );  
  });
  
  it("String is undefined", function() {
    let str;
    assert.equal(uniqueWords(str), undefined);
  });

  it("String contains non-text symbols", function() {
    let result = new Map();
    let str = " %%% 4444 ### 7 6 4 457656 211212 ";
    let myResult = uniqueWords(str);
    assert.equal(result.length, myResult.length);
    assert.equal(JSON.stringify(result),  JSON.stringify(myResult) );  
  }); 
  
  it("8 unique words is string: Where is a is is big big cake?", function() {
    let result = {where: 1, is: 3, a: 1, big: 2, cake: 1};
    let str = "Where is a is is big big cake?";
    let myResult = uniqueWords(str);
    assert.equal(result.length, myResult.length);
    assert.equal(JSON.stringify(result),  JSON.stringify(myResult) );  
  });

});
