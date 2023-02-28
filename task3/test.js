class Product {

  constructor(name, price, quantity, description) {
      this._name = name;
      this._price = price;
      this._quantity = quantity;
      this._description = description;
  }
  
  get name() {
      return this._name;
  }
  
  set name(name) {
      if (name.length < 1) {
        console.log("Имя слишком короткое.");
        return;
      }
      this._name = name;
  }

  get price() {
      return this._price;
    }
  
  set price(price) {
      if (price <= 0) {
        console.log("Цена должна быть положительным числом.");
        return;
      }
      this._price = price;
  }

  get quantity() {
      return this._quantity;
  }
  
  set quantity(quantity) {
      if (quantity < 0) {
        console.log("Количество не может быть отрицательным");
        return;
      }
      this._quantity = quantity;
  }

  get description() {
      return this._description;
  }
  
  set description(description) {
      this._description = description;
  }

  #hasNameOrDescription(elem) {
     
      let wordInLower = elem[2].toLowerCase();
      switch (elem[1]) {
          case 'contains' : return this[elem[0]].toLowerCase().includes(wordInLower) ? true : false;
          case 'starts' :   return this[elem[0]].toLowerCase().startsWith(wordInLower) ? true : false;
          case 'ends'   :   return this[elem[0]].toLowerCase().endsWith(wordInLower) ? true : false;   
          default : return false;
      }    
  }

  #hasPriceOrQuantity(elem) {
      
      let expr = [];
      expr[0] = elem[1].match(/\d+/);          //digits
      expr[1] = elem[1].match(/[^\d][^\d]?/);  //non-digits: <, >= etc.
      switch (expr[1].toString()) {
          case '=' : return this[elem[0]] == +expr[0] ? true : false;
          case '<' : return this[elem[0]] <  +expr[0] ? true : false;
          case '>' : return this[elem[0]] >  +expr[0] ? true : false;
          case '<=': return this[elem[0]] <= +expr[0] ? true : false;
          case '>=': return this[elem[0]] >= +expr[0] ? true : false;
          default : return false;
      }
  }

  isIncludes(conditions) {
      let isRemains = true;
     
      if (conditions.length == 0) {
          return isRemains;
      }

      for (let elem of conditions) {

          switch (elem.length) {
              case 3: 
                  isRemains = isRemains && 
                      (typeof this[elem[0]] != 'undefined') && 
                       this.#hasNameOrDescription(elem);        
                  break;
              case 2: 
                  isRemains = isRemains && 
                      (typeof this[elem[0]] != 'undefined') && 
                       this.#hasPriceOrQuantity(elem);
                  break;
              default: isRemains = false;                                    
          }
      }
      return isRemains;
  }
}

describe("filterProducts", function() {
  let products = [new Product('table', 300, 20, 'Wooden table'),
      new Product('chair', 200, 30, 'Wooden chair'),
      new Product('armchair', 400, 15, 'Armchair'),
      new Product('lamp', 100, 50, 'Simple lamp'),
      new Product('Floor lamp', 150, 15, 'Floor lamp'),
      new Product('Sofa', 500, 10, 'Corner sofa'),
      new Product('Table-desk', 250, 25, 'Table can be used as desk'),
      new Product('Rocking chair', 350, 25, 'Comfortable rocking chair')];
  
  it("Filter contains no conditions", function() {
        let result = []; 
        let str = "";
        let myResult = filterProducts(str, products);
        assert.equal(result.length, myResult.length);
        assert.equal(JSON.stringify(result),  JSON.stringify(myResult) );  
  });
  
  it("Filter contains spam", function() {
    let result = []; 
    let str = "Nothing-contains-tab&some-<=56&spam without- something- useful";
    let myResult = filterProducts(str, products);
    assert.equal(result.length, myResult.length);
    assert.equal(JSON.stringify(result),  JSON.stringify(myResult) );  
  }); 
  
  it("Starts with word in name", function() {
    let result = [{_name: 'table', _price: 300, _quantity: 20, _description: 'Wooden table'},
                  {_name: 'Table-desk',_price: 250, _quantity: 25, _description: 'Table can be used as desk'}]; 
    let str = "name-starts-tab";
    let myResult = filterProducts(str, products);
    assert.equal(result.length, myResult.length);
    assert.equal(JSON.stringify(result),  JSON.stringify(myResult) );  
  });

  it("Ends with word in name", function() {
    let result = [{_name: 'chair', _price: 200, _quantity: 30, _description: 'Wooden chair'},
                  {_name: 'armchair',_price: 400, _quantity: 15, _description: 'Armchair'},
                  {_name: 'Rocking chair', _price: 350, _quantity: 25, _description: 'Comfortable rocking chair'}]; 
    let str = "name-ends-air";
    let myResult = filterProducts(str, products);
    assert.equal(result.length, myResult.length);
    assert.equal(JSON.stringify(result),  JSON.stringify(myResult) );  
  });

  it("Contains word in name", function() {
    let result = [{_name: 'chair', _price: 200, _quantity: 30, _description: 'Wooden chair'},
                  {_name: 'armchair',_price: 400, _quantity: 15, _description: 'Armchair'},
                  {_name: 'Rocking chair', _price: 350, _quantity: 25, _description: 'Comfortable rocking chair'}]; 
    let str = "name-ends-air";
    let myResult = filterProducts(str, products);
    assert.equal(result.length, myResult.length);
    assert.equal(JSON.stringify(result),  JSON.stringify(myResult) );  
  });

  it("Starts with word in description", function() {
    let result = [{_name: 'table',_price: 300, _quantity: 20, _description: 'Wooden table'},
                  {_name: 'chair', _price: 200, _quantity: 30, _description: 'Wooden chair'}]; 
    let str = "description-starts-Wooden";
    let myResult = filterProducts(str, products);
    assert.equal(result.length, myResult.length);
    assert.equal(JSON.stringify(result),  JSON.stringify(myResult) );  
  });

  it("Ends with word in description", function() {
    let result = [{_name: 'table',_price: 300, _quantity: 20, _description: 'Wooden table'}]; 
    let str = "description-ends-table";
    let myResult = filterProducts(str, products);
    assert.equal(result.length, myResult.length);
    assert.equal(JSON.stringify(result),  JSON.stringify(myResult) );  
  });

  it("Contains the word in description", function() {
    let result = [{_name: 'table',_price: 300, _quantity: 20, _description: 'Wooden table'},
                  {_name: 'Table-desk', _price: 250, _quantity: 25, _description: 'Table can be used as desk'},
                  {_name: 'Rocking chair', _price: 350, _quantity: 25, _description: 'Comfortable rocking chair'}]; 
    let str = "description-contains-ab";
    let myResult = filterProducts(str, products);
    assert.equal(result.length, myResult.length);
    assert.equal(JSON.stringify(result),  JSON.stringify(myResult) );  
  });

  it("Price >= 200", function() {
    let result = [{_name: 'table', _price: 300, _quantity: 20, _description: 'Wooden table'},
                  {_name: 'chair', _price: 200, _quantity: 30, _description: 'Wooden chair'},
                  {_name: 'armchair',_price: 400, _quantity: 15, _description: 'Armchair'},
                  {_name: 'Sofa',_price: 500, _quantity: 10, _description: 'Corner sofa'},
                  {_name: 'Table-desk', _price: 250, _quantity: 25, _description: 'Table can be used as desk'},
                  {_name: 'Rocking chair', _price: 350, _quantity: 25, _description: 'Comfortable rocking chair'}]; 
    let str = "price->=200";
    let myResult = filterProducts(str, products);
    assert.equal(result.length, myResult.length);
    assert.equal(JSON.stringify(result),  JSON.stringify(myResult) );  
  });

  it("Price == 200", function() {
    let result = [{_name: 'chair', _price: 200, _quantity: 30, _description: 'Wooden chair'}]; 
    let str = "price-=200";
    let myResult = filterProducts(str, products);
    assert.equal(result.length, myResult.length);
    assert.equal(JSON.stringify(result),  JSON.stringify(myResult) );  
  });

  it("Quantity < 25", function() {
    let result = [{_name: 'table', _price: 300, _quantity: 20, _description: 'Wooden table'},
                  {_name: 'armchair',_price: 400, _quantity: 15, _description: 'Armchair'},
                  {_name: 'Floor lamp', _price: 150, _quantity: 15, _description: 'Floor lamp'},
                  {_name: 'Sofa',_price: 500, _quantity: 10, _description: 'Corner sofa'}]; 
    let str = "quantity-<25";
    let myResult = filterProducts(str, products);
    assert.equal(result.length, myResult.length);
    assert.equal(JSON.stringify(result),  JSON.stringify(myResult) );  
  });

  it(" Complicated string: 'name-contains-chair&price->=300&quantity-<=25&description-contains-chair'", function() {
    let result = [{_name: 'armchair',_price: 400, _quantity: 15, _description: 'Armchair'},
                  {_name: 'Rocking chair', _price: 350, _quantity: 25, _description: 'Comfortable rocking chair'}]; 
    let str = "name-contains-chair&price->=300&quantity-<=25&description-contains-chair";
    let myResult = filterProducts(str, products);
    assert.equal(result.length, myResult.length);
    assert.equal(JSON.stringify(result),  JSON.stringify(myResult) );  
  });

});
