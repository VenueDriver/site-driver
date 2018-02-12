const expect = require('chai').expect;
const TextMolecule = require('../index');


describe('Text Molecule', function(){
  let testMolecule;
  before(function(){
    testMolecule = new TextMolecule({_type : 'number' , _value : '1234'});
  });


  it('Must have a text value.',(done)=>{
    expect(testMolecule).to.have.a.property("_value");
    expect(testMolecule._value).to.be.a("string");
    done();
  });

  it('Must be of type \'text\'.',(done)=>{
    expect(testMolecule._type).to.be.equal("text");
    done();
  });


});
