function deleteCookie() {
    var d = new Date();
    document.cookie = "v0=1;expires=" + d.toGMTString() + ";" + ";";
}

function Lower(str) {
    if (str != null)
        return trim(str).toLowerCase();
}

function Upper(str) {
    if (str != null)
        return trim(str).toUpperCase();
}

// Removes leading whitespaces
function LTrim(value) {
    var re = /\s*((\S+\s*)*)/;
    if (value != null)
        return value.replace(re, "$1");
}

// Removes ending whitespaces
function RTrim(value) {
    var re = /((\s*\S+)*)\s*/;
    if (value != null)
        return value.replace(re, "$1");
}

// Removes leading and ending whitespaces
function trim(value) {
    //if(value != null)	
    return LTrim(RTrim(value));
}


// Retrive length of object
function getLength(value) {
    return trim(value).length;
}

function TxtFocusIn(field, cssName) {
    field.className = cssName;
    field.select();
}

function TxtBlur(field, cssBlur, cssFull) {
    if (getLength(getValue(field)) <= 0)
        field.className = cssBlur;
    else
        field.className = cssFull;
}

function changeClass(modeVar, field) {
    if (modeVar == "working") {
        field.className = modeVar;
        field.select();
    }
    else {
        field.className = "full";
    }
}


function NumericOnly() {
    var key = window.event.keyCode;
    if (key < 48 || key > 57)
        window.event.returnValue = false;
}

function NumericOnlyWithComma() {
    var key = window.event.keyCode;
    if ((key < 48 || key > 57)) {
        if (key != 44)
            window.event.returnValue = false;
    }
}
function NumericOnlyWithDotNew() {
    var key = window.event.keyCode;
    if ((key < 48 || key > 57)) {
        if (key != 46)
            window.event.returnValue = false;
    }
}

function NumericOnlyWithDot(txt, e) {
    var count = 0;
    var key;  //= window.event.keyCode;
    // For Internet Explorer 
    if (window.event) {
        key = e.keyCode;
    }
    // For Netscape/Firefox/Opera 
    else if (e.which) {
        key = e.which;
    }

    count = txt.value.toString().split('.').length - 1;

    if (count <= 0) {
        if (key < 48 || key > 57)
            if (key != 46)
                window.event.returnValue = false;
    }
    else
        if (key < 48 || key > 57)
            window.event.returnValue = false;
}


function RequiredDropDown(ddl, msg) {
    if (ddl.val() == "0" || ddl.val() == null) {
        alert(msg);
        ddl.focus();
        return false;
    }
    else
        return true;
}

function RemoveAllDropDownItems(ddl) {
    ddl.empty();
}
function ResetDropDown(ddl) {
    if (ddl != null)
        ddl.get(0).selectedIndex = 0;
    // ddl.selectedIndex = 0;
}



function GetDropDownText(ddl) {
    if (ddl != null)
        return ddl.text();
}

function GetDropDownValue(ddl) {
    if (ddl != null)
        return ddl.val();
}

function GetDropDownIndex(ddl) {
    if (ddl != null)
        return ddl.selectedIndex;
}

function SetDropDownText(ddl, text) {
    if (ddl != null)
        return ddl.text = text;
}

function SetDropDownValue(ddl, val) {
    if (ddl != null)
        return ddl.val(val);
}

function SetDropDownValue1(ddl, val, text) {
//    if (ddl != null) {
//        //   return ddl.val(val);
//        //$(ddl).find("option").length

//        var optionExists = (ddl.find("option[value=" + val + "]").length > 0);
//        if (!optionExists) {
//            ddl.append($("<option></option>").val(val).html(text));
//        }

//        ddl.val(val);
    //    }
    if (ddl != null)
        return ddl.val(val);
}
function SetDropDownIndex(ddl, index) {
    if (ddl != null)
        return ddl.get(0).selectedIndex = index;
    // return ddl.selectedIndex = index;
}

function ValidateField(field, field1, msg, isValue) {
    if (field.val() == isValue) { //field.val() == '' ||
        if (trim(field1.val()) != "") {
            alert(msg);
            field1.focus();
            return false;
        }
        else return true;
    }
    else
        return true;
}
function RequiredFieldOld(field, msg) {
    if (trim(field.value) == '') {
        alert(msg);
        field.focus();
        return false;
    }
    else
        return true;
}
function RequiredField(field, msg) {
    //    if (trim(field.value) == '') {
    //        alert(msg);
    //        field.focus();
    //        return false;
    //    }
    //    else
    //        return true;


    if (field.val() == '') {
        alert(msg);
        field.focus();
        return false;
    }
    else
        return true;
}


function RequiredField1(field, msg, isValue) {
    //    if (Lower(trim(field.value)) == '' || Lower(trim(field.value)) == Lower(isValue)) {
    //        alert(msg);
    //        field.focus();
    //        return false;
    //    }
    //    else
    //        return true;


    if (field.val() == '') {
        alert(msg);
        field.focus();
        return false;
    }
    else if (field.val() == isValue) {
        alert(msg);
        field.focus();
        return false;
    }
    else
        return true;
}

function RequiredField2(field, field1, msg, isValue) {
    //    if (Lower(trim(field.value)) == '' || Lower(trim(field.value)) == Lower(isValue)) {
    //        alert(msg);
    //        field.focus();
    //        return false;
    //    }
    //    else
    //        return true;


    if (field.val() == '') {
        alert(msg);
        field1.focus();
        return false;
    }
    else if (field.val() == isValue) {
        alert(msg);
        field1.focus();
        return false;
    }
    else if (trim(field1.val()) == "") {
        alert('Please select value from the list');
        field1.focus();
        return false;
    }
    else
        return true;
}

function FindDropDown(control) {
    //  return document.getElementById(control);
    return $("#" + control + " option:selected");
}
function FindControl(control) {
    //  return document.getElementById(control);
    return $("#" + control);
}
function DisableField(field) {
    if (field != null)
        field.disabled = true;
}

function EnableField(field) {
    if (field != null)
        field.disabled = false;
}
function EnabledChkBox(control)
{ control.disabled = false; }

function DisabledChkBox(control)
{ control.disabled = true; }


function getValue(field) {
    if (field != null)
        return trim(field.value);
}

function GetValue(field) {
    if (field != null)
        return trim(field.val());
}

function GetInnerHTML(field, val) {
    if (field != null)
        return trim(field.innerHTML);
}

function GetInnerText(field) {
    if (field != null)
        return trim(field.innerText);
}

function IsBlank(field) {
    var val = GetValue(field);
    if (trim(val) == "")
        return true;
    else
        return false;
}
function SetValue(field, val) {
    if (field != null)
    //return field.value = val;
        return field.val(val);
}

function setValue(field, val) {
    if (field != null)
        return field.value = val;
    //return field.val(val);
}
function SetInnerHTML(field, val) {
    if (field != null)
        return field.innerHTML = val;
}

function SetInnerText(field, val) {
    if (field != null)
        return field.innerText = val;
}

function HideDiv(ctrl) {
    ctrl.hide();
}
function ShowDiv(ctrl) {
    ctrl.show();
}

function ShowMessageBox(msg) {
    alert(msg);
}


function SetCssClass(ctrl, className) {
    //ctrl.className = className;
    ctrl.addClass(className);
}


/// It is used to UnCheck  all items in CheckBoxList
function CheckUncheckALLchkBoxList(chkList, chkState) {
    var chkStatus = chkList;
    var opt = chkStatus.getElementsByTagName('input');
    for (var i = 0; i < opt.length; i++) {
        var el = opt[i];
        if (el.type == "checkbox") {
            el.checked = chkState;
        }
    }
}

function IsCheckBoxSelected(chk) {
    if (chk.checked) return true;
    else return false;
}

function IsCheckBoxSelected1(chk) {
    // if (chk.checked) return true;
    if (chk.is(':checked')) return true;
    else return false;
}

function DeselectChkBox(chk) {
    chk.attr('checked', false);
}
function SelectChkBox(chk) {
    chk.prop('checked', true);
}

/// It is used to check that any item in CheckBoxList has been selected or not
//function IsCheckBoxListSelected(chkList) {
//    var chkStatus = chkList;
//    var opt = chkStatus.getElementsByTagName('input');
//    var sel = false;

//    for (i = 0; i < opt.length; i++) {
//        var el = opt[i];
//        if (el.type == "checkbox" && el.checked) {
//            sel = true; //alert(el.value);
//            break;
//        }
//    }

//    if (sel) return true;
//    else return false;
//}



function IsCheckBoxListSelected(chkList, checklistName) {
    var flag = 0;
    var chkStatus = chkList;
    var opt = chkStatus.getElementsByTagName('input');
    for (var i = 0; i < opt.length; i++) {
        var el = opt[i];
        if (el.type == "checkbox") {
            if (el.checked) {
                flag = 1;
            }
        }
    }
    if (flag == 1) return true;
    else {
        alert('Please select ' + checklistName + ' first');
        return false;
    }
}




/// It is used to check that any item in RadioButtonList has been selected or not
function IsRadioButtonItemSelected(rblList) {
    var opt = rblList.getElementsByTagName('input');
    var sel = false;
    for (var i = 0; i < opt.length; i++) {
        var el = opt[i];
        if (el.type == "radio" && el.checked) {
            sel = true; //alert(el.value);
            break;
        }
    }
    if (sel) return true;
    else return false;
}

function GetRadioButtonListText(rblList) {
    if (rblList != null) {
        var items = rblList.getElementsByTagName('INPUT');
        for (var i = 0; i < items.length; i++) {
            if (items[i].checked) {
                return items[i].selectedItem;
            }
        }
    }
}

function GetRblValue(rblList) {
    var items = rblList.getElementsByTagName('INPUT');

    for (var i = 0; i < items.length; i++) {
        if (items[i].checked) {
            return items[i].value;
        }
    }
}

function GetRadioButtonListValue(rblList) {
    if (rblList != null)
        return rblList.val();
}

function SetRblValue(rblList, val, text) {
    if (rblList != null) {
        //$('input[name="' + rblList + '"][value="' + val + '"]').attr('checked', 'checked');
        //var radio = $("[id*=" + rblList + "] label:contains('" + text + "')").closest("td").find("input");
        var radio = $("#" + rblList + " label:contains('" + text + "')").closest("td").find("input");
        radio.attr("checked", "checked");
        return false;

    }
}


function DisableALLRadioButtonListItem(rblList) {
    var items = rblList.getElementsByTagName('INPUT');
    for (var i = 0; i < items.length; i++) {
        items[i].disabled = true;
    }
}


function RequiredDate1(date, msg, blankMsg) {
    if (trim(date.val()) == '') {
        alert(blankMsg);
        date.focus();
    }
    else {
        if (ValidateDate(date, msg))
            return true;
        else {
            date.focus();
            return false;
        }
    }
}
function RequiredDate2(date, msg, blankMsg) {
    if (date.val() == '01/01/1900') {
        alert('Please enter valid date');
        date.focus();
        return false;
    }
    else if (!RequiredDate(date, msg, blankMsg)) {
        date.focus();
        return false;
    }

    else
        return true;
}
function ValidateDate(date, msg) {
    if (!isDate(date, msg)) {
        date.focus();
        return false;
    }
    else
        return true;
}


function NumericOnlyWithDot(txt) {
    var count;
    var key = window.event.keyCode;
    count = txt.value.toString().split('.').length - 1;

    if (count <= 0) {
        if (key < 48 || key > 57)
            if (key != 46)
                window.event.returnValue = false;
    }
    else
        if (key < 48 || key > 57)
            window.event.returnValue = false;
}

function ClearField(field) {
    field.val("");
}

function ResetField(field, val) {
    field.val(val);
}

function DisableControl(ControlName) {
    ControlName.attr("disabled", "disabled");

}

function EnableControl(ControlName) {
    ControlName.removeAttr("disabled");

}



function GetSynchronousResponse(url, postData) {

    var xmlhttp = null;
    if (window.XMLHttpRequest)
        xmlhttp = new XMLHttpRequest();
    else if (window.ActiveXObject) {
        if (new ActiveXObject("Microsoft.XMLHTTP"))
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        else
            xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    }
    url = url + "?rnd=" + Math.random(); // to be ensure non-cached version
    xmlhttp.open("POST", url, false);

    //xmlhttp.onreadystatechange  =   function()
    //{
    //    getProgressStatusID();
    //  if(xmlhttp.readyState   ==   READYSTATE_UNINITIALIZED)    
    //    ImgStatus.innerHTML =     "";
    //  if(xmlhttp.readyState   ==   READYSTATE_LOADING)    
    //    ImgStatus.innerHTML  =     "<iframe frameborder='0' src='about:blank' class='iframe'></iframe><div class='progressDivCenter'><img src='" + imageDir + imgSrc +"' <br/>Loading</div>";
    //  if(xmlhttp.readyState   ==   READYSTATE_LOADED)        
    //    ImgStatus.innerHTML  =     "";
    //  if(xmlhttp.readyState   ==   READYSTATE_INTERACTIVE)    
    //    ImgStatus.innerHTML  =     "<iframe frameborder='0' src='about:blank' class='iframe'></iframe><div class='progressDivCenter'><img src='" + imageDir + imgSrc +"' <br/>Downloading</div>";
    //  if(xmlhttp.readyState   ==   READYSTATE_COMPLETE)                      
    //    ImgStatus.innerHTML  =     "";
    //} 
    xmlhttp.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    xmlhttp.send(postData);
    var responseText = xmlhttp.responseText;
    return responseText;

}
function Evaluate(val) {
    var RefNo = eval('(' + val + ')');
    return RefNo.d;
}


function GetSynchronousResponse1(url, postData) {

    var xmlhttp = null;
    if (window.XMLHttpRequest)
        xmlhttp = new XMLHttpRequest();
    else if (window.ActiveXObject) {
        if (new ActiveXObject("Microsoft.XMLHTTP"))
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        else
            xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    }
    url = url + "?rnd=" + Math.random(); // to be ensure non-cached version
    xmlhttp.open("POST", url, false);
    xmlhttp.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    xmlhttp.send(postData);
    var responseText = xmlhttp.responseText;
    return eval('(' + responseText + ')').d;

}

function GetSynchronousResponse2(url, postData) {

    var xmlhttp = null;
    if (window.XMLHttpRequest)
        xmlhttp = new XMLHttpRequest();
    else if (window.ActiveXObject) {
        if (new ActiveXObject("Microsoft.XMLHTTP"))
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        else
            xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    }
    url = url + "?rnd=" + Math.random(); // to be ensure non-cached version
    xmlhttp.open("POST", url, false);
    xmlhttp.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    xmlhttp.send(JSON.stringify(postData));
    var responseText = xmlhttp.responseText;
    return eval('(' + responseText + ')').d;

}
/*****************************************************************************************************/
//    End  ----->             Synchronous XMLHttpResquest Object
/******************************************************************************************************/


/***************************************        E-MAIL  VALIDATION   STARTING   ******************************************/
//* Check whether a given string is empty or not.
function IsEmpty(strTxtBoxValue) {
    if ((strTxtBoxValue == null) || (strTxtBoxValue.length == 0)) {
        return true;
    }
}
function IsEmailValid(objField, strFieldName) {
    // To find out the Value of the control
    var strFieldValue = GetValue(objField);
    if (IsEmpty(strFieldValue)) {
        return true;
    }
    else {
        var at = "@";
        var dot = ".";
        var lat = strFieldValue.indexOf(at);
        var lstr = strFieldValue.length;
        var ldot = strFieldValue.indexOf(dot);

        if (strFieldValue.indexOf(at) == -1) {
            alert("Email should be in abc@xyz.com format");
            objField.focus();
            return false;
        }
        if (strFieldValue.indexOf(at) == -1 || strFieldValue.indexOf(at) == 0 || strFieldValue.indexOf(at) == lstr) {
            alert("Email should be in abc@xyz.com format");
            objField.focus();
            return false;
        }
        if (strFieldValue.indexOf(dot) == lstr || strFieldValue.indexOf(dot) == -1 || strFieldValue.indexOf(dot) == 0) {
            alert("Email should be in abc@xyz.com format");
            objField.focus();
            return false;
        }
        if ((ldot + 1) == lstr) {

            alert("Email should be in abc@xyz.com format");
            objField.focus();
            return false;
        }
        if (strFieldValue.indexOf(at, (lat + 1)) != -1) {
            alert("Email should be in abc@xyz.com format");
            objField.focus();
            return false;
        }
        if (strFieldValue.substring(lat - 1, lat) == dot || strFieldValue.substring(lat + 1, lat + 2) == dot) {
            alert("Email should be in abc@xyz.com format");
            objField.focus();
            return false;
        }

        if (strFieldValue.indexOf(dot, (lat + 2)) == -1) {
            alert("Email should be in abc@xyz.com format");
            objField.focus();
            return false;
        }

        if (lstr == strFieldValue.indexOf(dot) + 2 || lstr == strFieldValue.indexOf(dot) + 5) {
            alert("Email should be in abc@xyz.com format");
            objField.focus();
            return false;

        }
        if (strFieldValue.indexOf(" ") != -1) {
            alert("Email should be in abc@xyz.com format");
            objField.focus();
            return false;
        }
        return true;
    }
}
/***************************************        E-MAIL  VALIDATION      END ******************************************/
function CheckBoxValue1(chk) {
    if (chk == null) return "0";
    else if (chk.is(':checked'))
        return "1";
    return "0";
}

function CheckBoxValue(chk) {
    if (chk != null)
        return chk.innerHTML;
    else
        return "";
}
function SetLableValue(controlID) {
    controlID.text('');
}


function GvMouseOver() {
    this.ClassName = "GvMouseOver";
    //this.originalstyle = this.style.backgroundColor; this.style.backgroundColor = '#fffacd'
}

function GetFloat(val) {
    var res = parseFloat(val);
    if (isNaN(res)) return 0;
    else return res;
}

function SetFocus(ctrl) {
    ctrl.focus();
}

function OnPopulating(sender, eventArgs) {
    sender._element.className = "textSearching";
}
function OnPopulated(sender, eventArgs) {
    sender._element.className = "textboxNormalFocusIn";
}


function RequiredPanNo(ctrl) {
    var regpan = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;

    if (regpan.test(GetValue(ctrl)) == false) {
        alert("Permanent Account Number is not yet valid.");
        ctrl.focus();
        return false;
    }
    else {
        //alert("You have entered a valid Permanent Account Number !");        
        return true;
    }
}

function ValidatePanNo(ctrl) {
    if (ctrl.val() != '') {
        var regpan = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;

        if (regpan.test(GetValue(ctrl)) == false) {
            alert("Permanent Account Number is not yet valid.");
            ctrl.focus();
            return false;
        }
        else {
            //alert("You have entered a valid Permanent Account Number !");        
            return true;
        }
    }
    else return true;
}


function GetCurrentDateDmy() {

    var currDt = GetSynchronousResponse('../../Service/data.asmx/GetSystemDate', null);
    currDt = Evaluate(currDt);
    return currDt;
}

//function GetCurrentSessionYr() {

//    var sessYr = GetSynchronousResponse('../../Services/MarvelService.asmx/GetCurrentSessionYr', null);
//    sessYr = Evaluate(sessYr);
//    return sessYr;
//}

function GetNextSessionYr() {

    var sessYr = GetSynchronousResponse('../../Services/MarvelService.asmx/GetNextSessionYr', null);
    sessYr = Evaluate(sessYr);
    return sessYr;
}

function ShowDialog(Header, Page, Hight, width) {
    tb_show(Header, "" + Page + "&TB_iframe=true&height=" + Hight + "&width=" + width + "");
    return false;
}


/// Start of compare two dates function
function GetDateObject(dateString, dateSeperator) {
    //This function return a date object after accepting
    //a date string ans dateseparator as arguments
    var curValue = dateString;
    var sepChar = dateSeperator;
    var curPos = 0;
    var cDate, cMonth, cYear;

    //extract day portion
    curPos = dateString.indexOf(sepChar);
    cDate = dateString.substring(0, curPos);

    //extract month portion
    var endPos = dateString.indexOf(sepChar, curPos + 1);
    cMonth = dateString.substring(curPos + 1, endPos);

    //extract year portion
    curPos = endPos;
    endPos = curPos + 5;
    cYear = curValue.substring(curPos + 1, endPos);

    //Create Date Object
    // dtObject = new Date(cYear, cMonth, cDate);
    var dtObject = Date.parseLocale(dateString, "dd/MM/yyyy");
    return dtObject;
}

function CompareTwoDates(dt1, dt2, msg) {

    var startDate = GetDateObject(dt1, "/");
    var endDate = GetDateObject(dt2, "/");

    if (startDate > endDate) {
        alert(msg);
        return false;
    }
    if (startDate <= endDate)
        return true;
}

/// End of compare two dates function



function ApplyCss(field, cssName) {
    if (field != null)
        field.css(cssName);
    //       field.className = cssName;

}


function IsGridItemChecked(datalist) {
    var Flag = false;
    datalist.find('input:checkbox').each(function () {
        if (this.checked == true) {
            Flag = true;
        }


    });

    return Flag;

}

function GetMonthIndexNumber(mmm) {
    mmm = Lower(mmm);
    if (mmm == 'apr')
        return 2;
    else if (mmm == 'may')
        return 3;
    else if (mmm == 'jun')
        return 4;
    else if (mmm == 'jul')
        return 5;
    else if (mmm == 'aug')
        return 6;
    else if (mmm == 'sep')
        return 7;
    else if (mmm == 'oct')
        return 8;
    else if (mmm == 'nov')
        return 9;
    else if (mmm == 'dec')
        return 10;
    else if (mmm == 'jan')
        return 11;
    else if (mmm == 'feb')
        return 12;
    else if (mmm == 'mar')
        return 13;

}
function GetPLMonth(mmm) {
    mmm = Lower(mmm);
    if (mmm == 'apr')
        return 1;
    else if (mmm == 'may')
        return 2;
    else if (mmm == 'jun')
        return 3;
    else if (mmm == 'jul')
        return 4;
    else if (mmm == 'aug')
        return 5;
    else if (mmm == 'sep')
        return 6;
    else if (mmm == 'oct')
        return 7;
    else if (mmm == 'nov')
        return 8;
    else if (mmm == 'dec')
        return 9;
    else if (mmm == 'jan')
        return 10;
    else if (mmm == 'feb')
        return 11;
    else if (mmm == 'mar')
        return 12;
}


function MaximizedPOPUP(url) {

    var wihe = 'width=' + screen.availWidth + ',height=' + screen.availHeight;
    window.open(url, "_blank", "screenX=1,screenY=1,left=0,top=0," + wihe + "toolbar=no,menubar=no,top=0,location=no,resizable=yes,status=no,scrollbars=2,dependent=yes");

    return false;
}


function IsResultOk(result, msg) {
    if (result) {
        return true;
    }
    else {
        alert(msg);
        return false;
    }
}

function IsResultOk1(result, ctrl, msg) {
    if (result) {
        return true;
    }
    else {
        alert(msg);
        ctrl.focus();
        return false;
    }
}

function fnOpenModal(url, height, width, btnName) {
    var bod = FindControl("parent");
    bod.className = "modalBackground";

    var r = window.showModalDialog(url, window, "status:no;resizable:yes;edge:raised;unadorned:yes;dialogWidth:" + width + ";dialogHeight:" + height + ";center:yes");
    if (r != null && r == true) {
        bod.className = "body";
        btnName = FindControl(btnName);
        btnName = btnName.name;
        window.__doPostBack(btnName, '');
        return false;
    }
    else {
        bod.className = "body";
        return false;
    }
}
function closeDialog(v) {
    //   var arg = dialogArguments;
    //  arg.document.body.className="body";
    //  setValue(FindControl("hst_Sibling"))="1";
    if (v == 0) {
        window.returnValue = true;
        //self.close();
    }
    else {
        window.returnValue = false;
        // self.close();
    }

    window.close();
}


/// It is used to check that any item in CheckBoxList has been selected or not
function IschkBoxListSelected(chkList, stringcControlName) {

    var chkStatus = chkList;
    if (chkStatus == null) {
        alert('There is no ' + stringcControlName + ' to Select');
        return false;
    }
    var opt = chkStatus.getElementsByTagName('input');
    var sel = false;

    for (var i = 0; i < opt.length; i++) {
        var el = opt[i];
        if (el.type == "checkbox" && el.checked) {
            sel = true; //alert(el.value);
            break;
        }
    }

    if (sel) return true;
    else {
        alert('Please Select Any ' + stringcControlName + ' from ' + stringcControlName + ' CheckBox List');
        return false;
    }
}

function SetLableText(Control, txt) {
    if (Control != null)
        return Control.text(txt);
}


function WaterTextOut(ctrl, cssName, text) {
    if (ctrl.value == "") {
        ctrl.value = text;
        ctrl.className = cssName;
    }
}

function WaterTextIn(ctrl, cssName, text) {
    if (ctrl.value == text) {
        ctrl.value = "";
        ctrl.className = cssName;
    }
}

function enable_cb(ID, From, To) {
    var prefix = "ctl00_ContentPlaceHolder1_";
    From = FindControl(prefix + From);
    To = FindControl(prefix + To);
    if (ID.checked == true) {
        EnableControl(From);
        EnableControl(To);
    } else {

        DisableControl(From);
        DisableControl(To);
    }
}

function EnableDisableControl(ID, control) {
    var prefix = "ctl00_ContentPlaceHolder1_";
    control = FindControl(prefix + control);

    if (ID.checked == true) {
        EnableControl(control);
    } else {
        DisableControl(control);
    }
}

function GetCheckBoxListSelectedItems(cblCtrl) {
    var selectedItems = "";
    cblCtrl.each(function () {
        //        if (selectedItems == "") {
        //            selectedItems = "Selected Values:\r\n\r\n";
        //        }
        //selectedValues += $(this).val() + "\r\n";

        selectedItems += $(this).next().html() + ",";
    });
    if (selectedItems.length > 0)
        selectedItems = selectedItems.substring(0, selectedItems.length - 1);

    return selectedItems;
}

function GetCheckBoxListSelectedValues1(cblCtrl) {
    var selectedItems = "";
    cblCtrl.each(function () {
        var text = $(this).next().html().split('#');
        selectedItems += trim(text[0]) + ",";
    });
    if (selectedItems.length > 0)
        selectedItems = selectedItems.substring(0, selectedItems.length - 1);

    return selectedItems;

}

function ApplyDateFilter(ID, From, To) {
    From = FindControl(From);
    To = FindControl(To);
    if (ID.checked == true) {
        EnableControl(From);
        EnableControl(To);
    } else {

        DisableControl(From);
        DisableControl(To);
    }
}

function CheckBoxListSelectedText(chkList) {
    var chkStatus = chkList;
    var opt = chkStatus.getElementsByTagName('input');

    var text = "";
    for (var i = 0; i < opt.length; i++) {

        var el = opt[i];
        if (el.type == "checkbox" && el.checked) {
            var labelArray = chkStatus.getElementsByTagName('label');
            text += labelArray[i].innerHTML + ",";
        }
    }
    if (text.length > 0)
        return text.substring(0, text.length - 1);
}

function OnlyNumber(control) {
    var ctxt = ($("#" + control.id));
    ctxt.keydown(function (event) {
        // Allow: backspace, delete, tab, escape, and enter
        if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 ||
        // Allow: Ctrl+A
                    (event.keyCode == 65 && event.ctrlKey === true) ||
        // Allow: home, end, left, right
                    (event.keyCode >= 35 && event.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        } else {
            // Ensure that it is a number and stop the keypress
            if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
                event.preventDefault();
            }
        }
    });
}

function ValidateMobNumber(fld) {
    //    var fld = document.getElementById(txtMobId);

    if (fld.val() == "") {
        alert("You didn't enter a mobile number.");
        fld.value = "";
        fld.focus();
        return false;
    }
    else if (isNaN(fld.val())) {
        alert("The mobile number contains illegal characters.");
        fld.val("");
        fld.focus();
        return false;
    }
    else if (!(fld.val().length == 10)) {
        alert("The mobile number is the wrong length. \nPlease enter 10 digit mobile no.");
        //fld.value = "";
        fld.focus();
        return false;
    }
    return true;
}

function GetIntValue(field) {
    if (field != null)
        if (IsNumeric(field.val())) {
            if (parseInt(field.val(), 10)) return parseInt(field.val(), 10);
            else return 0;
        }
        else return 0;
    else return 0;
}


function GetFloatValue(field) {
    if (field != null)
        if (IsNumeric(field.val())) {
            if (parseFloat(field.val())) return parseFloat(field.val()).toFixed(2);
            else return 0.0;
        }
        else return 0.0;
    else return 0.0;
}

function GetFloatValue1(field) {
    if (field != null)
        if (IsNumeric(field.val())) {
            if (parseFloat(field.val())) return parseFloat(field.val()).toFixed(0);
            else return 0;
        }
        else return 0;
    else return 0;
}
function IsNumeric(input) {
    return (input - 0) == input && input.length > 0;
}
//  It Check or uncheck all checkbox insided DataGrid
function CheckAllDLItem(grid, checkAllBox, chkId) {
    //var grid=document.getElementById(dl);
    var ChkState = checkAllBox.checked;
    for (i = 0; i < 10000; i++) {
        if (grid.all[i] != null) {
            if (grid.all[i].type == 'checkbox' && grid.all[i].name.indexOf(chkId) != -1) {
                grid.all[i].checked = ChkState;
            }
        }
    }
}

function ConvertMMDDYY(input) {
    // var d = new Date(val);
    //return d.getDate(), '/', d.getMonth(), '/', d.getFullYear;


    var datePart = input.match(/\d+/g), year = datePart[0].substring(4), // get only two digits
        month = datePart[1], day = datePart[2];
    return datePart[1] + '/' + datePart[0] + '/' + datePart[2];

}



function IsValidMobileNo(field, msg) {
    if (field != null) {
        if (getLength(GetValue(field)) == 10)
            return true;
        else {
            alert(msg);
            field.focus();
            return false;
        }
    } else {
        alert(msg);
        field.focus();
        return false;
    }
}


function isblankTextBox(fld) {
    if (fld.val().length == 0)
        return 0;
    else
        return parseFloat(fld.val());
}

function DmyToMdy(input) {
    if (input.length > 0) {
        var data = input.split('/');
        var newDate = data[1] + "/" + data[0] + "/" + data[2];
        return newDate;
    }
    else return "01/01/1900";
}


function DmyToTS(input) {
    if (input.length > 0) {
        var data = input.split(':');
        var newDate = data[1] + ":" + data[0] ;
        return newDate;
    }
    else return "01/01/1900";
}

function MdyToDmy(input) {
    if (input.length > 0) {
        var data = input.split('/');
        var newDate = data[1] + "/" + data[0] + "/" + data[2];
        return newDate;
    }
    else return "01/01/1900";
}

function DateDiffDmy(date1, date2) {

    var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    var firstDate = new Date(DmyToMdy(date1));
    var secondDate = new Date(DmyToMdy(date2)); // DmyToMdy(date2);

    return (Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay))));
}
function GetIntValueLabel(field) {
//    var pp = fld.html();
//    if (fld.html() == '')
//        return 0;
//    else
//        return parseFloat(pp);

    if (field != null)
        if (IsNumeric(field.html())) {
            if (parseInt(field.html())) return parseInt(field.html());
            else return 0;
        }
        else return 0;
    else return 0;
}

function isNumber(evt, element) {

    var charCode = (evt.which) ? evt.which : event.keyCode

    if (
        (charCode != 45 || $(element).val().indexOf('-') != -1) &&      // “-” CHECK MINUS, AND ONLY ONE.
        //(charCode != 46 || $(element).val().indexOf('.') != -1) &&      // “.” CHECK DOT, AND ONLY ONE.
        (charCode < 48 || charCode > 57))
        return false;

    return true;
}

