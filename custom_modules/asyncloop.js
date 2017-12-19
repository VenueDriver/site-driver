const asyncLoop = (condition,work,end)=>{
  let ended = false;
  if ( condition() && !ended ){ ended = true ; end() }else { work(()=>asyncLoop(condition,work,end),end)}
}

module.exports = asyncLoop;
