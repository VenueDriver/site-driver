module.exports = function(){

  this.startTime;
  this.endTime;
  this.result;

  this.start = ()=>{
    this.startTime = new Date();
  }

  this.stop = ()=>{
    this.endTime = new Date();
    return this.result = this.endTime.getTime() - this.startTime.getTime();
  }

  this.secs = ()=>{
    return this.result / 1000;
  }

  this.minutes = ()=>{
    return this.secs()/60;
  }

  this.hours = ()=>{
    return this.minutes()/60;
  }

}
