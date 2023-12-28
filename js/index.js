var token = "90931918|-31949299918111197|90960780";
var dbName = "Student";
var realtionName = "student-rel";
var baseURL = "http://api.login2explore.com:5577";
var iml = "/api/iml";
var irl = "/api/irl";

$("#rollNo").focus();

function validateData() {
  var rollNo = $("#rollNo").val();
  if (rollNo === "") {
    alert("Roll Number ID Required Value");
    $("#rollNo").focus();
    return "";
  }

  var name = $("#name").val();
  if (name === "") {
    alert("Student Full Name is Required Value");
    $("#name").focus();
    return "";
  }

  var grade = $("#grade").val();
  if (grade === "") {
    alert("Class is Required Value");
    $("#grade").focus();
    return "";
  }

  var dob = $("#dob").val();
  if (dob === "") {
    alert("Date Of Birth is Required Value");
    $("#dob").focus();
    return "";
  }

  var address = $("#address").val();
  if (address === "") {
    alert("Address is Required Value");
    $("#address").focus();
    return "";
  }

  var enrollmentDate = $("#enrollmentDate").val();
  if (enrollmentDate === "") {
    alert("Enrollment-Date is Required Value");
    $("#enrollmentDate").focus();
    return "";
  }

  var jsonStrObj = {
    rollNo,
    Name: name,
    Class: grade,
    DOB: dob,
    Address: address,
    Enrollment_Date: enrollmentDate,
  };

  return JSON.stringify(jsonStrObj);
}

function resetForm() {
  $("#rollNo").val("");
  $("#name").val("");
  $("#grade").val("");
  $("#dob").val("");
  $("#address").val("");
  $("#enrollmentDate").val("");
  $("#rollNo").prop("disabled", false);
  $("#save").prop("disabled", true);
  $("#change").prop("disabled", true);
  $("#reset").prop("disabled", true);
  $("#rollNo").focus();
}

function saveData() {
  var jsonStr = validateData();
  if (jsonStr === "") {
    return;
  }

  var putReqStr = createPUTRequest(token, jsonStr, dbName, realtionName);

  jQuery.ajaxSetup({ async: false });
  var resultObj = executeCommandAtGivenBaseUrl(putReqStr, baseURL, iml);
  jQuery.ajaxSetup({ async: true });

  alert(JSON.stringify(resultObj));

  resetForm();
}

function changeData() {
  $("#change").prop("disabled", true);
  var jsonStr = validateData();
  var recNo = localStorage.getItem("rec_no");
  var updateReq = createUPDATERecordRequest(
    token,
    jsonStr,
    dbName,
    realtionName,
    recNo
  );
  jQuery.ajaxSetup({ async: false });
  var resJsonObj = executeCommandAtGivenBaseUrl(updateReq, baseURL, iml);
  jQuery.ajaxSetup({ async: true });
  alert(JSON.stringify(resJsonObj));
  resetForm();
  $("#rollNo").focus();
}

function getrollNoAsJsonObj() {
  var rollNo = $("#rollNo").val();
  var jsonStr = {
    rollNo,
  };

  return JSON.stringify(jsonStr);
}

function saveRecNo(jsonObj) {
  var data = JSON.parse(jsonObj.data);
  localStorage.setItem("rec_no", data.rec_no);
}

function fillData(jsonObj) {
  saveRecNo(jsonObj);
  var record = JSON.parse(jsonObj.data).record;

  $("#name").val(record.Name);
  $("#grade").val(record.Class);
  $("#dob").val(record.DOB);
  $("#address").val(record.Address);
  $("#enrollmentDate").val(record.Enrollment_Date);
}

function getEmp() {
  // console.log("working");
  const idVal = $("#rollNo").val();
  // console.log(idVal);
  var rollNoJsonObj = getrollNoAsJsonObj();
  console.log(rollNoJsonObj);
  var getRequest = createGET_BY_KEYRequest(
    token,
    dbName,
    realtionName,
    rollNoJsonObj
  );
  jQuery.ajaxSetup({ async: false });
  var resJsonObj = executeCommandAtGivenBaseUrl(getRequest, baseURL, irl);
  jQuery.ajaxSetup({ async: true });
  if (resJsonObj.status === 400) {
    $("#save").prop("disabled", false);
    $("#reset").prop("disabled", false);
    $("#name").focus();
  } else if (resJsonObj.status === 200) {
    $("#rollNo").prop("disabled", true);
    fillData(resJsonObj);
    $("#change").prop("disabled", false);
    $("#reset").prop("disabled", false);
    $("#name").focus();
  }
}
