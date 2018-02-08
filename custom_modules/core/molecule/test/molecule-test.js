const expect = require('chai').expect;
const Molecule = require('../index');

describe('Attributes', function(){
  let testMolecule;
  before(function(){
    testMolecule = new Molecule({_type : 'other type'});
  });

  it('Must have a text id.',(done)=>{
    expect(testMolecule).to.have.a.property("_id");
    expect(testMolecule._id).to.be.a("string");
    done();
  });
  it('Must have a text name.',(done)=>{
    expect(testMolecule).to.have.a.property("_name");
    expect(testMolecule._name).to.be.a("string");
    done();
  });
  it('Must be of type \'molecule\'.',(done)=>{
    expect(testMolecule).to.have.a.property("_type");
    expect(testMolecule._type).to.be.a("string");
    expect(testMolecule._type).to.be.equal("molecule");
    done();
  });
  it('Must have a value.',(done)=>{
    expect(testMolecule).to.have.a.property("_value");
    done();
  });


});
