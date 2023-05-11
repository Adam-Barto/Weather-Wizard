export function getData(endpoint, callback) {
  const request = new XMLHttpRequest();
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      callback(request.response);
    }
  };
  request.open("GET", endpoint);
  request.send();
}

export function sendForm(form, action, endpoint, callback) {
  const formData = new FormData(form);
  const dataJSON = JSON.stringify(Object.fromEntries(formData));

  const request = new XMLHttpRequest();
  request.onreadystatechange = () => { //Wait before doing the thing
    if (request.readyState === 4) {
      callback(request.response, form);
    }
  };
  request.open(action, endpoint); //Method of contact.
  request.setRequestHeader("Content-Type", "application/json");
  request.send(dataJSON); //Sends the string to the Database? No into the Python!
  //console.log(dataJSON); //{"person_id":"2","content":"cringe"}
  //request.send('{"person_id":"1","content":"Wormy my beloved."}'); //It is a string!
}