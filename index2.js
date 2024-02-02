var jpdbBaseURL="http://api.login2explore.com:5577";
var jpdbIRL= '/api/irl';
var jpdbIML= '/api/iml';
var stdDBName= "SCHOOL-DB";
var stdRelationName= "STUDENT-TABLE";
var connToken= '90931760|-31949307834075579|90962958';


function saveRecNo2LS(jsonObj){
    var lvData= JSON.parse(jsonObj.data);
    localStorage.setItem('recno',lvData.rec_no);
}

function getRollNoAsJsonObj(){
    var stdRollno= $('stdRollno').val();
    var jsonStr={
        id: stdRollno
    };
    return JSON.stringify(jsonStr);
}

function getStd(){
    var stdRollNoJsonObj= getstdRollNoAsJsonObj();
    var getRequest= createGET_BY_KEYRequest(connToken, stdDBName, stdRelationName, stdRollNoJsonObj);
    jQuery.ajaxSetup({async: false});
    var resJsonObj= executeCommandAtGivenBaseUrl(updateRequest, jpbdBaseURL, jpdbIRL);
    jQuery.ajaxSetup({async: true});
    if(resJsonObj===400){
        $('stdSave').prop('disabled',false);
        $('stdUpdate').prop('disabled',false);
        $('stdName').focus();
        
    }else if(resJsonObj===200){
        $('stdRollno').prop('disabled',true);
        $('stdReset').prop('disabled',false);
        $('stdName').focus();
    }
}
function fillData(jsonObj){
    saveRecNo2LS(jsonObj);
    var record=JSON.parse(jsonObj.data).record;
    $("#stdName").val("");
    $("#stdClass").val("");
    $("stdDob").val("");
    $("#stdAdd").val("");
    $("stdEn").val("");
    
}

function saveUpdate(){
    $('#stdUpdate').prop('disabled',true);
    jsonUp= validateData();
    var updateRequest= createUPDATERecordRequest(connToken, jsonUp, stdDBName, stdRelationName, localStorage.getItem('recno'));
    jQuery.ajaxSetup({async: false});
    var resJsonObj= executeCommandAtGivenBaseUrl(updateRequest, jpbdBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    console.log(resJsonObj);
    resetForm();
    $('#stdRollno').focus();
}

function saveStudent() {
    var jsonStr = validateData();
    if (jsonStr === "") {
    return;
    }
    
    var putReqStr =  createPUTRequest("90931760|-31949307834075579|90962958",
    jsonStr, "SCHOOL-DB", "STUDENT-TABLE");
    alert(putReqStr);
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommand(putReqStr, "http://api.login2explore.com:5577", "/api/iml");
    alert(JSON.stringify(resultObj));
    jQuery.ajaxSetup({async: true});
    resetForm();
    }
    
    
    function resetForm() {
        $("#stdRollno").val("")
        $("#stdName").val("");
        $("#stdClass").val("");
        $("stdDob").val("");
        $("#stdAdd").val("");
        $("stdEn").val("");
        $("#stdRollno").prop('disabled',false);
        $("#stdSave").prop('disabled',true);
        $("#stdUpdate").prop('disabled',true);
        $("#stdReset").prop('disabled',true);
        $("#stdRollno").focus();
    }
    
function validateData(){
    var stdRollar = $("#stdRollno").val();
    if (stdRollVar === "") {
        alert("Student Roll number Required Value");
        $("#stdRollno").focus();
        return "";
    }
    var stdNameVar = $("#stdName").val();
    if (stdNameVar === "") {
    alert("Student Name is Required Value");
    $("#stdName").focus();
    return "";
    }
    var stdClassVar = $("#stdClass").val();
    if (stdClassVar === "") {
    alert("Class is Required Value");
    $("#stdClass").focus();
    return "";
    }
    var stdDobVar = $("#stdDob").val();
    if (stdDobVar === "") {
    alert("Birth-Date is Required Value");
    $("#stdDob").focus();
    return "";
    }
    var stdAddVar = $("#stdAdd").val();
    if (stdAddVar === "") {
    alert("Address is Required Value");
    $("#stdAdd").focus();
    return "";
    }
    var stdEnVar = $("#stdEn").val();
    if (stdEnVar === "") {
    alert("Enrollment Date is Required Value");
    $("#stdEn").focus();
    return "";
    }
}


function saveStudent(){
  $('#stdForm').on('submit', function(event) {
    event.preventDefault();
    var formData = new FormData(this);
    $.ajax({
      type: 'POST',
      url: 'SCHOOL-DB.php',
      data: formData,
      processData: false,
      contentType: false,
      success: function(response) {
        console.log('Form data saved to database:', response);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log('Error saving form data to database:', textStatus, errorThrown);
      }
    });
  });
};