const expect = require('chai').expect;
const TextMolecule = require('../index');

describe('Text Molecule', function(){
  let testMolecule;
  before(function(){
    testMolecule = new TextMolecule({});
  });


  it('Must have a text value.',(done)=>{
    expect(testMolecule).to.have.a.property("_value");
    expect(testMolecule._value).to.be.a("string");
    done();
  });


});
