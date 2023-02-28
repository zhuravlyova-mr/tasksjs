describe("To Lower Except First", function() {

  it("Leaves an empty line as is", function() {
     assert.equal(toLowerExceptFirst(""), "");
  });

  it("Returns 'undefined' when the string is undefined", function() {
    let str;
    assert.equal(toLowerExceptFirst(str), undefined);
  });

  it("Transforms string 'someStringFsdf'", function() {
    assert.equal(toLowerExceptFirst('someStringFsdf'), 'Somestringfsdf');
  });

  it("Transforms string 'QWERTYUIOP'", function() {
    assert.equal(toLowerExceptFirst('QWERTYUIOP'), 'Qwertyuiop');
  });

  it("Transforms string '@#$#$$$saa@@@QQQQ", function() {
    assert.equal(toLowerExceptFirst('@#$#$$$saa@@@QQQQ'), '@#$#$$$saa@@@qqqq');
  });

  it("Transforms string '     -234'", function() {
    assert.equal(toLowerExceptFirst('     -234'), '     -234');
  });

});