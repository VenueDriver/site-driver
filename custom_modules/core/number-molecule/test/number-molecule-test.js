const expect = require('chai').expect;
const NumberMolecule = require('../index');


describe('Number Molecule', function(){
  let testMolecule;
  before(function(){
    testMolecule = new NumberMolecule({_type : 'string' , _value : 1234});
  });


  it('Must have a number value.',(done)=>{
    expect(testMolecule).to.have.a.property("_value");
    expect(testMolecule._value).to.be.a("number");
    done();
  });

  it('Must be of type \'number\'.',(done)=>{
    expect(testMolecule._type).to.be.equal("number");
    done();
  });


});
