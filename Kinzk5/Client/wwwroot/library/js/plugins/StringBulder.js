
function StringBuilder(value) {
    this.strings = new Array("");
    this.append(value);
}

// Appends the given value to the end of this instance.
StringBuilder.prototype.append = function(value) {
    if (value) {
        this.strings.push(value);
    }
}

// Clears the string buffer
StringBuilder.prototype.clear = function() {
    this.strings.length = 1;
}

// Converts this instance to a String.
StringBuilder.prototype.toString = function() {
    return this.strings.join("");
}




function MaximizedPOPUP(url) {
    var wihe = 'width=' + screen.availWidth + ',height=' + screen.availHeight;
    window.open(url, "_blank", "screenX=1,screenY=1,left=0,top=0," + wihe + "toolbar=no,menubar=no,top=0,location=no,resizable=yes,status=no,scrollbars=2");
}