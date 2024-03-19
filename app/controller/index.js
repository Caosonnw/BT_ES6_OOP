import Person from "../models/Person.js";
import Student from "../models/Student.js";
import Employee from "../models/Employee.js";
import Customer from "../models/Customer.js";
import ListPerson from "../models/ListPerson.js";

// Chỉnh selected
document.querySelector(".info_student").style.display = "none";
document.querySelector(".info_employee").style.display = "none";
document.querySelector(".info_customer").style.display = "none";
document.getElementById("Person").addEventListener("change", function () {
  var userType = this.value;

  if (userType === "student") {
    document.querySelector(".info_student").style.display = "block";
    document.querySelector(".info_employee").style.display = "none";
    document.querySelector(".info_customer").style.display = "none";
  } else if (userType === "employee") {
    document.querySelector(".info_student").style.display = "none";
    document.querySelector(".info_employee").style.display = "block";
    document.querySelector(".info_customer").style.display = "none";
  } else if (userType === "customer") {
    document.querySelector(".info_student").style.display = "none";
    document.querySelector(".info_employee").style.display = "none";
    document.querySelector(".info_customer").style.display = "block";
  } else {
    document.querySelector(".info_student").style.display = "none";
    document.querySelector(".info_employee").style.display = "none";
    document.querySelector(".info_customer").style.display = "none";
  }
});

//------------------------------------------------------//
let listPerson = new ListPerson();
// console.log(list_person)

const addPerson = () => {
  const arrField = document.querySelectorAll(
    ".modal-body input, .modal-body select, .modal-body textarea"
  );
  const personSelect = document.getElementById("Person");
  let person;
  switch (personSelect.value) {
    case 'student':
      person = new Student(
        document.getElementById('MaID').value,
        document.getElementById('Name').value,
        document.getElementById('Email').value,
        document.getElementById('Location').value,
        document.getElementById('DiemToan').value,
        document.getElementById('DiemLy').value,
        document.getElementById('DiemHoa').value
      );
      break;
    case 'employee':
      person = new Employee(
        document.getElementById('MaID').value,
        document.getElementById('Name').value,
        document.getElementById('Email').value,
        document.getElementById('Location').value,
        document.getElementById('SoNgayLamViec').value,
        document.getElementById('LuongMotNgay').value
      );
      break;
    case 'customer':
      person = new Customer(
        document.getElementById('MaID').value,
        document.getElementById('Name').value,
        document.getElementById('Email').value,
        document.getElementById('Location').value,
        document.getElementById('TenCongTy').value,
        document.getElementById('TriGiaHoaDon').value,
        document.getElementById('DanhGia').value
      );
      break;
    default:
      console.error("Đối tượng không hợp lệ");
      return null;
  }
  arrField.forEach((field) => {
    // destructuring
    let { id, value } = field;
    person[id] = value;
    // console.log(id)
    // console.log(value)
  });
  let isValid = true;
  isValid &= checkEmptyValue(person.MaID, "tbMaID") && checkNumber(person.MaID, "tbMaID");
  isValid &= checkEmptyValue(person.Name, "tbName");
  isValid &=
    checkEmptyValue(person.Email, "tbEmail") &&
    checkEmailValue(person.Email, "tbEmail");
  isValid &= checkEmptyValue(person.Location, "tbLocation");
  isValid &= checkEmptyValueSelect(personSelect, "tbPerson");
  if (personSelect.value === "student") {
    isValid &=
      checkEmptyValue(person.DiemToan, "tbDiemToan") &&
      checkNumber(person.DiemToan, "tbDiemToan") &&
      checkScore(person.DiemToan, "tbDiemToan");
    isValid &=
      checkEmptyValue(person.DiemLy, "tbDiemLy") &&
      checkNumber(person.DiemLy, "tbDiemLy") &&
      checkScore(person.DiemLy, "tbDiemLy");
    isValid &=
      checkEmptyValue(person.DiemHoa, "tbDiemHoa") &&
      checkNumber(person.DiemHoa, "tbDiemHoa") &&
      checkScore(person.DiemHoa, "tbDiemHoa");
  } else if (personSelect.value === "employee") {
    isValid &=
      checkEmptyValue(person.SoNgayLamViec, "tbSoNgayLamViec") &&
      checkNumber(person.SoNgayLamViec, "tbSoNgayLamViec");
    isValid &=
      checkEmptyValue(person.LuongMotNgay, "tbLuongMotNgay") &&
      checkNumber(person.LuongMotNgay, "tbLuongMotNgay") &&
      checkLuong(person.LuongMotNgay, "tbLuongMotNgay");
  } else if (personSelect.value === "customer") {
    isValid &= checkEmptyValue(person.TenCongTy, "tbTenCongTy");
    isValid &=
      checkEmptyValue(person.TriGiaHoaDon, "tbTriGiaHoaDon") &&
      checkNumber(person.TriGiaHoaDon, "tbTriGiaHoaDon");
  }

  if (isValid) {
    return person;
  }
};
document.getElementById("btn_Add").onclick = function () {
  const personToAdd = addPerson();
  if (personToAdd) {
    listPerson.addPerson(personToAdd);
    renderToDisplay();
    // Reset form
    resetForm();
    // Tắt modal
    $("#exampleModal").modal("hide");
    saveDataLocal("ListPerson", listPerson.list_person);
  }
};

const renderToDisplay = (arrPerson = listPerson.list_person) => {
  const tbodyInfo = document.getElementById('tbodyInfo');
  tbodyInfo.innerHTML = '';
  arrPerson.forEach((person) => {
    let newPerson = new ListPerson();
    newPerson = {...newPerson, ...person}
    const { MaID, Name, Location, Email } = newPerson;
    const userInfo = getUserInfoSelect(newPerson);
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${MaID}</td>
      <td>${Name}</td>
      <td>${Location}</td>
      <td>${Email}</td>
      <td>${userInfo}</td>
      <td>${getPrivateInformation(person)}</td>
      <td>
        <button onclick="getInfoPerson('${MaID}')" class="btn btn-warning"><i class="fa-solid fa-pen"></i></button>
        <button onclick="deletePerson('${MaID}')" data-id="${MaID}" class="btn btn-danger"><i class="fa-solid fa-trash"></i></button>
      </td>
    `;

    tbodyInfo.appendChild(row);
  });
}

const getUserInfoSelect = (person) => {
  const selectedType = person.Person;

  switch (selectedType) {
    case 'student':
      return `Student`;
    case 'employee':
      return `Employee`;
    case 'customer':
      return `Customer`;
    default:
      return 'Đối tượng không hợp lệ';
  }
};
const getPrivateInformation = (person) => {
  const selectedType = person.Person;

  switch (selectedType) {
    case 'student':
      return `Điểm Toán: ${person.DiemToan}<br>Điểm Lý: ${person.DiemLy}<br>Điểm Hóa: ${person.DiemHoa}<br>Điểm Trung Bình: ${person.DiemTrungBinh}`;
    case 'employee':
      return `Số Ngày Làm Việc: ${person.SoNgayLamViec}<br>Lương Một Ngày: ${person.LuongMotNgay} VNĐ<br>Tổng Lương: ${person.Luong} VNĐ`;
    case 'customer':
      return `Tên Công Ty: ${person.TenCongTy}<br>Trị Giá Hóa Đơn: ${person.TriGiaHoaDon}<br>Đánh Giá: ${person.DanhGia}`;
    default:
      return 'Đối tượng không hợp lệ';
  }
};

// Lưu vào localStorage
function saveDataLocal(key, value) {
  let stringJSON = JSON.stringify(value);
  localStorage.setItem(key, stringJSON);
}
// Lấy dữ liệu từ localStorage và render giao diện
function getLocalStorageAndRender(key) {
  let stringData = localStorage.getItem(key);
  if (stringData) {
    listPerson.list_person = JSON.parse(stringData);
    renderToDisplay();
  }
}
getLocalStorageAndRender("ListPerson");

// Delete
function deletePerson(maID) {
  let index = listPerson.list_person.findIndex((person, index) => {
    return person.MaID == maID;
  });
  if (index != -1) {
    listPerson.deletePerson(index);
    saveDataLocal("ListPerson", listPerson.list_person);
    renderToDisplay();
  }
}
const getInfoPerson = (MaID, personData) => {
  let person = listPerson.list_person.find((item, index) => {
    return item.MaID == MaID;
  });
  if (person) {
    const arrField = document.querySelectorAll(
      ".modal-body input, .modal-body select, .modal-body textarea"
    );
    arrField.forEach((field) => {
      let { id } = field;
      field.value = person[id];
    });
  }
  $("#exampleModal").modal("show");
  const selectedType = personData ? personData.Person : person.Person;

  document.getElementById("Person").value = selectedType;

  switch (selectedType) {
    case 'student':
      document.querySelector(".info_student").style.display = "block";
      document.querySelector(".info_employee").style.display = "none";
      document.querySelector(".info_customer").style.display = "none";
      break;
    case 'employee':
      document.querySelector(".info_student").style.display = "none";
      document.querySelector(".info_employee").style.display = "block";
      document.querySelector(".info_customer").style.display = "none";
      break;
    case 'customer':
      document.querySelector(".info_student").style.display = "none";
      document.querySelector(".info_employee").style.display = "none";
      document.querySelector(".info_customer").style.display = "block";
      break;
    default:
      document.querySelector(".info_student").style.display = "none";
      document.querySelector(".info_employee").style.display = "none";
      document.querySelector(".info_customer").style.display = "none";
  }

  document.getElementById("MaID").readOnly = true;
};

// Update
const updatePerson = () => {
  const arrField = document.querySelectorAll(
    ".modal-body input, .modal-body select, .modal-body textarea"
  );
  let updatedPerson  = new Person();
  arrField.forEach((item, index) => {
    let { id, value } = item;
    updatedPerson[id] = value;
  });
  let index = listPerson.list_person.findIndex((item, index) => {
    return item.MaID == updatedPerson.MaID;
  });
  if (index != -1) {
    listPerson.updatePerson(updatedPerson , index);
    saveDataLocal("ListPerson", listPerson.list_person);
    renderToDisplay();
    resetForm();
    $("#exampleModal").modal("hide");
    document.getElementById("MaID").readOnly = false;
  }
};
document.getElementById('btn_Update').onclick = updatePerson;
// Reset form
function resetForm() {
  const arrField = document.querySelectorAll(
    ".modal-body input, .modal-body select, .modal-body textarea"
  );
  arrField.forEach((field) => {
    if (field.tagName.toLowerCase() === "input") {
      field.value = "";
    } else if (field.tagName.toLowerCase() === "select") {
      field.selectedIndex = 0;
    } else if (field.tagName.toLowerCase() === "textarea") {
      field.value = "";
    }
  });
  document.querySelector(".info_student").style.display = "none";
  document.querySelector(".info_employee").style.display = "none";
  document.querySelector(".info_customer").style.display = "none";
}

window.onload = () => {
  window.deletePerson = (maID) => {
    deletePerson(maID);
  };
  window.getInfoPerson = (maID) => {
    getInfoPerson(maID);
  };
  window.searchPerson = (event) => {
    searchPerson(event);
  }
};

function searchPerson(event) {
  let valueUser = event.target.value;
  let keyword = valueUser.trim().toLowerCase();
  let newKeyWord = removeVietnameseTones(keyword);
  let arrListPersonFilter = [];
  for (var i = 0; i < listPerson.list_person.length; i++) {
    let person = listPerson.list_person[i];
    let newPerson = new Person();
    Object.assign(newPerson, person);
    let newPersonName = removeVietnameseTones(newPerson.Name.trim().toLowerCase());
    if(newPersonName.includes(newKeyWord)) {
      arrListPersonFilter.push(newPerson);
    }
  }
  renderToDisplay(arrListPersonFilter);
}

function renderSelectedPerson() {
  const selectElement = document.getElementById('sl_Person');
  
  const selectedValue = selectElement.value;
  
  let filteredPersons = [];
  if (selectedValue === 'Student') {
      filteredPersons = listPerson.list_person.filter(person => person.Person === 'student');
  } else if (selectedValue === 'Employee') {
      filteredPersons = listPerson.list_person.filter(person => person.Person === 'employee');
  } else if (selectedValue === 'Customer') {
      filteredPersons = listPerson.list_person.filter(person => person.Person === 'customer');
  } else {
      filteredPersons = listPerson.list_person;
  }
  renderToDisplay(filteredPersons);
}

document.getElementById('sl_Person').addEventListener('change', renderSelectedPerson);

renderSelectedPerson();
