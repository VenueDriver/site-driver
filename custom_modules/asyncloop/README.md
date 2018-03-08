```javascript
const asyncloop = require('asyncloop');
const database = require('database');
const userList = [User1,User2,User3];

let i = 0;

// IF CONDITION == true LOOP ENDS
const condition = () =>{ return i >= userList.length};
const work = (next,end) => {
  let user = userList[i];
  database.saveUser(user).then(()=>{
    i++;
    next();
  });
}
const end = ()=> "All users saved.";

asyncloop(condition,work,end)


```
