const asyncLoop = (condition,work,end)=>{
  if ( condition() ){ end() }else{ work(()=>asyncLoop(condition,work,end),end)}
}

module.exports = asyncLoop;
