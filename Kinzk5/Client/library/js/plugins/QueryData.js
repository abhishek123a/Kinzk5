
function QueryData(queryString, preserveDuplicates){

  // if a query string wasn't specified, use the query string from the URL
  if (queryString == undefined){
    queryString = location.search ? location.search : '';
  }

  // remove the leading question mark from the query string if it is present
  if (queryString.charAt(0) == '?') queryString = queryString.substring(1);

  // check whether the query string is empty
  if (queryString.length > 0){

    // replace plus signs in the query string with spaces
    queryString = queryString.replace(/\+/g, ' ');

    // split the query string around ampersands and semicolons
    var queryComponents = queryString.split(/[&;]/g);

    // loop over the query string components
    for (var index = 0; index < queryComponents.length; index ++){

      // extract this component's key-value pair
      var keyValuePair = queryComponents[index].split('=');
      var key          = decodeURIComponent(keyValuePair[0]);
      var value        = keyValuePair.length > 1
                       ? decodeURIComponent(keyValuePair[1])
                       : '';

      // check whether duplicates should be preserved
      if (preserveDuplicates){

        // create the value array if necessary and store the value
        if (!(key in this)) this[key] = [];
        this[key].push(value);

      }else{

        // store the value
        this[key] = value;

      }

    }

  }

}
