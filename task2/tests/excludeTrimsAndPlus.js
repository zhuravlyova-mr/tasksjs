describe("ExcludeTrimsAndPlus", function() {

  it("Leaves an empty line as is", function() {
    assert.equal(excludeTrimsAndPlus(""), "");
  });

  it("Excludes from such a string: '    +   234sdf  '", function() {
    assert.equal(excludeTrimsAndPlus('    +   234sdf  '), '   234sdf');
  });

  it("Excludes from such a string: '    +234 '", function() {
    assert.equal(excludeTrimsAndPlus('    +234 '), '234');
  });

  it("Excludes liding spaces from string: '   4534'", function() {
    assert.equal(excludeTrimsAndPlus('   4534'), '4534');
  });

  it("Excludes the plus string: '+234'", function() {
    assert.equal(excludeTrimsAndPlus('+234'), '234');
  });

  it("Leaves the string with '-' as is", function() {
    assert.equal(excludeTrimsAndPlus('-234'), '-234');
  });

  it("Excludes all symbols from such a string: '   +     '", function() {
    assert.equal(excludeTrimsAndPlus('   +     '), '');
  });


});