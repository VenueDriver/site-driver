const validateValueString = (obj)=> obj._value.length > 0;
const validateValueNumber = (obj)=> typeof obj._value === "number";
const validateName        = (obj)=> obj._name.length > 0;
const validateDate        = (obj)=> new Date(obj._value) != "Invalid Date";
const validateChild       = (obj)=> obj._child.length > 0;
const validateDataType    = (obj,type)=> obj._value.dataType === type;

const validateComponent = {

  Artist  : (obj,err)=> {
    if(!validateDataType(obj,"artist")){
      err.push(((obj._name.length > 0) ? obj._name : "Unnamed artist field")+ " is required.");
    }
  },
  Venue   : (obj,err)=> {
    if(!validateDataType(obj,"venue")){
      err.push(((obj._name.length > 0) ? obj._name : "Unnamed venue field")+ " is required.");
    }
  },
  Event   : (obj,err)=> {
    if(!validateDataType(obj,"event")){
      err.push(((obj._name.length > 0) ? obj._name : "Unnamed event field")+ " is required.");
    }
  },
  Color   : (obj,err)=> {
    if(!validateValueString(obj)){
      err.push(((obj._name.length > 0) ? obj._name : "Unnamed color field")+ " is required.");
    }
  },
  Date    : (obj,err)=> {
    if(!validateDate(obj)){
      err.push(((obj._name.length > 0) ? obj._name : "Unnamed date field")+ " is required.");
    }
  },
  File    : (obj,err)=> {
    if(!validateValueString(obj)){
      err.push(((obj._name.length > 0) ? obj._name : "Unnamed file field")+ " is required.");
    }
  },
  Group   : (obj,err)=> {
    if(!validateChild(obj)){
      err.push(((obj._name.length > 0) ? obj._name : "Unnamed group field")+ " is required.");
    }
  },
  Image   : (obj,err)=> {
    if(!validateValueString(obj)){
      err.push(((obj._name.length > 0) ? obj._name : "Unnamed image field")+ " is required.");
    }
  },
  List    : (obj,err)=> {
    if(!validateChild(obj)){
      err.push(((obj._name.length > 0) ? obj._name : "Unnamed list field")+ " is required.");
    }
  },
  Number  : (obj,err)=> {
    if(!validateValueNumber(obj)){
      err.push(((obj._name.length > 0) ? obj._name : "Unnamed number field")+ " is required.");
    }
  },
  Text    : (obj,err)=> {
    if(!validateValueString(obj)){
      err.push(((obj._name.length > 0) ? obj._name : "Unnamed text field")+ " is required.");
    }
  }

}

module.exports = validateComponent;
