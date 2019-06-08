function callAPI(method, body, url) {
  const requestOptions = {
    method: method,
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Token ${localStorage.getItem("token")}`
    }
  };
  if(body){
    Object.assign(requestOptions, {body: JSON.stringify(body)});
  }

  return fetch(url, requestOptions)
  .then(res => {
    if(!res.ok) throw new Error(res.status)
    else if(res.ok && method === 'DELETE') return res.status
    else return res.json();
  })
  .catch((error) => {
    console.log(error);
    return error.message;
  });;
}

function formatDate(date) {

  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var day = date.slice(8,10);
  var monthIndex = parseInt(date.slice(5,7));
  var year = date.slice(0,4);

  return monthNames[monthIndex] + ' ' + day + ', ' + year;
}

function isEmpty(obj) {
  for(var key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
  }
  return true;
}

export { formatDate, isEmpty, callAPI }
