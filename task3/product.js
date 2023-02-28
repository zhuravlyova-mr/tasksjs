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

function filterProducts(filterStr) {
    
    let requests = filterStr.split('&');
    let arr = [[4]], i = 0;
    for (let elem of requests) {
        arr[i++] = elem.split(/-/g);
    }
    return products.filter(item => item.isIncludes(arr) );
}

let products = [new Product('table', 300, 20, 'Wooden table'),
      new Product('chair', 200, 30, 'Wooden chair'),
      new Product('armchair', 400, 15, 'Armchair'),
      new Product('lamp', 100, 50, 'Simple lamp'),
      new Product('Floor lamp', 150, 15, 'Floor lamp'),
      new Product('Sofafd', 2, 10, 'Corner sofabc'),
      new Product('Table-desk', 250, 25, 'Table can be used as desk'),
      new Product('Rocking chair', 350, 25, 'Comfortable rocking chair')];
      
//let result = filterProducts("name-ends-air&name-contains-chair&price->=200&quantity->=15&description-contains-Air", products);
//let result = filterProducts("name-ends-air&price->200&quantity-<=20", products);
//let result = filterProducts('Nothing-contains-tab&some spam without- something- useful', products);
let result = filterProducts('name-contains-fd&price-=2&quantity->5&description-ends-abc', products);
for (let elem of result) {
  console.log(elem);
}