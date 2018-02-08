const expect = require('chai').expect;
const Storage = require('../index');

describe('Storage', function(){

  it('Must be a Class.',(done)=>{
    expect(function() { return new Storage({})}).to.not.throw(/Storage is not a constructor/);
    done();
  });

  describe('Methods', function(){

    const instance = new Storage({});

    it('Provide at least all three basic methods.',(done)=>{
      expect(instance.get).to.be.a("function");
      expect(instance.post).to.be.a("function");
      expect(instance.remove).to.be.a("function");
      done();
    });

    describe('Basic methods should return a promise.',()=>{
      it("Get should resolve",function(){
        return instance.get().then(function(response){
          expect(response).to.not.be.an("undefined");
        });
      });
      it("Post should resolve",function(){
        return instance.post().then(function(response){
          expect(response).to.not.be.an("undefined");
        });
      });
      it("Remove should resolve",function(){
        return instance.remove().then(function(response){
          expect(response).to.not.be.an("undefined");
        });
      });
    });

  });

});
