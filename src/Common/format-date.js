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

export { formatDate, isEmpty }
