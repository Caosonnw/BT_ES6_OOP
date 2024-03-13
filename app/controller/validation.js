function checkEmptyValue(value, idSpan) {
  var eleSpan = document.getElementById(idSpan);
  if(value == "") {
    eleSpan.style.display = "block";
    eleSpan.innerHTML = "Vui lòng không bỏ trống trường này";
    return false;
  } else {
    eleSpan.style.display = "none";
    eleSpan.innerHTML = "";
    return true;
  }
};

function checkEmptyValueSelect(selectElement, idSpan) {
  var eleSpan = document.getElementById(idSpan);
  if(selectElement.value === "" || selectElement.value === "Vui lòng chọn") {
    eleSpan.style.display = "block";
    eleSpan.innerHTML = "Vui lòng chọn";
    return false;
  } else {
    eleSpan.style.display = "none";
    eleSpan.innerHTML = "";
    return true;
  }
};

function checkEmailValue(value, idSpan) {
  var eleSpan = document.getElementById(idSpan);
  const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  var isValid = regexEmail.test(value);
  if (isValid) {
    eleSpan.style.display = "none";
    document.getElementById(idSpan).innerHTML = "";
    return true;
  } else {
    eleSpan.style.display = "block";
    document.getElementById(idSpan).innerHTML = "Email không đúng định dạng";
    return false;
  } 
}

function checkNumber(value, idSpan) {
  var eleSpan = document.getElementById(idSpan);
  const numberRegex = /^[0-9]+$/;
  var isValid = numberRegex.test(value);
  if (isValid) {
    eleSpan.style.display = "none";
    eleSpan.innerHTML = "";
    return true;
  } else {
    eleSpan.style.display = "block";
    eleSpan.innerHTML = "Vui lòng nhập đúng là dạng số";
    return false;
  }
}

function checkScore(value, idSpan) {
  var eleSpan = document.getElementById(idSpan);
  if(value > 10) {
    eleSpan.style.display = "block";
    eleSpan.innerHTML = "Vui lòng nhập điểm <= 10";
    return false;
  } else {
    eleSpan.style.display = "none";
    eleSpan.innerHTML = "";
    return true;
  }
};

function checkLuong(value, idSpan) {
  var eleSpan = document.getElementById(idSpan);
  if (value < 1000000 || value > 20000000 ) {
    eleSpan.style.display = "block";
    eleSpan.innerHTML = "Lương cơ bản 1,000,000 - 20,000,000";
    return false;
  } else {
    eleSpan.style.display = "none";
    eleSpan.innerHTML = "";
    return true;
  }
}