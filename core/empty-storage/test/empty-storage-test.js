const expect = require('chai').expect;

describe('JSON-P', function(){

  describe('Write file', function(){

    let jsonpData = [{ id : 1234 , artist : "test"}];

    before(function(done){
      jsonpData = JSONP.toJSONP(jsonpData,"jsonpTest","artist");
      JSONP.writeFile({ data : jsonpData , location : path.join(__dirname , '/_storage')} , ()=>{
        done();
      });
    });

    after(function(done){
      fs.unlink(path.join(__dirname , '/_storage/','test.json'), ()=> done());
    });

    it('JSON data must be wrapped inside a javascript function.',(done)=>{
      let isWrapped = /^retrieveJSONP\(/gi.test(jsonpData) && /\)$/gi.test(jsonpData);
      expect(isWrapped).to.be.equal(true);
      done();
    })

    it('Data can be parsed into JSON.',(done)=>{
      jsonpData = eval(jsonpData);
      expect(jsonpData).to.be.an('object');
      done();
    })

    it('Should keep a reference to itself.',(done)=>{
      expect(jsonpData).to.have.property('ref','jsonpTest');
      done();
    })

    it('Should keep a reference of which type of data is contained.',(done)=>{
      expect(jsonpData).to.have.property('dataType','artist');
      done();
    })

    it('Data must contain a list of objects.',(done)=>{
      expect(jsonpData).to.have.property('data');
      expect(jsonpData.data).to.be.an('array');
      done();
    })

    it('Should create a .json file.',(done)=>{
      fs.readdir(path.join(__dirname , '/_storage/' ), (err,files)=>{
        expect(files).to.include("test.json");
        done();
      })
    })

  })

});
