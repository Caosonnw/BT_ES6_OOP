import Person from "../models/Person.js";
import Student from "../models/Student.js";
import Employee from "../models/Employee.js";
import Customer from "../models/Customer.js";
import ListPerson from "../models/ListPerson.js";

// Chỉnh selected
document.querySelector('.info_student').style.display = 'none';
document.querySelector('.info_employee').style.display = 'none';
document.querySelector('.info_customer').style.display = 'none';
document.getElementById('Person').addEventListener('change', function() {
  var userType = this.value;

  if (userType === 'student') {
    document.querySelector('.info_student').style.display = 'block';
    document.querySelector('.info_employee').style.display = 'none';
    document.querySelector('.info_customer').style.display = 'none';
  } else if(userType === 'employee'){
    document.querySelector('.info_student').style.display = 'none';
    document.querySelector('.info_employee').style.display = 'block';
    document.querySelector('.info_customer').style.display = 'none';
  } else if(userType === 'customer'){
    document.querySelector('.info_student').style.display = 'none';
    document.querySelector('.info_employee').style.display = 'none';
    document.querySelector('.info_customer').style.display = 'block';
  } else{
    document.querySelector('.info_student').style.display = 'none';
    document.querySelector('.info_employee').style.display = 'none';
    document.querySelector('.info_customer').style.display = 'none';
  }
});




//------------------------------------------------------//
const listPerson = new ListPerson();
// Thêm một person vào danh sách
const addPerson = () => {
  const arrField = document.querySelectorAll(".modal-body input, .modal-body select, .modal-body textarea");
  const personSelect = document.getElementById('Person');
  // console.log(arrField);

  let person;
  switch (personSelect.value) {
    case 'student':
      person = new Student();
      break;
    case 'employee':
      person = new Employee();
      break;
    case 'customer':
      person = new Customer();
      break;
    default:
      console.error("Invalid person type selected");
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
  isValid &= checkEmptyValue(person.MaID,"tbMaID");
  isValid &= checkEmptyValue(person.Name,"tbName");
  isValid &= checkEmptyValue(person.Email,"tbEmail") && checkEmailValue(person.Email,"tbEmail");
  isValid &= checkEmptyValue(person.Location,"tbLocation");
  isValid &= checkEmptyValueSelect(personSelect, "tbPerson");
  if (personSelect.value === 'student') {
    isValid &= checkEmptyValue(person.DiemToan, "tbDiemToan") && checkNumber(person.DiemToan, "tbDiemToan") && checkScore(person.DiemToan, "tbDiemToan");
    isValid &= checkEmptyValue(person.DiemLy, "tbDiemLy") && checkNumber(person.DiemLy, "tbDiemLy") && checkScore(person.DiemLy, "tbDiemLy");
    isValid &= checkEmptyValue(person.DiemHoa, "tbDiemHoa") && checkNumber(person.DiemHoa, "tbDiemHoa") && checkScore(person.DiemHoa, "tbDiemHoa");
  } else if (personSelect.value === 'employee') {
    isValid &= checkEmptyValue(person.SoNgayLamViec, "tbSoNgayLamViec") && checkNumber(person.SoNgayLamViec, "tbSoNgayLamViec");
    isValid &= checkEmptyValue(person.LuongMotNgay, "tbLuongMotNgay") && checkNumber(person.LuongMotNgay, "tbLuongMotNgay") && checkLuong(person.LuongMotNgay, "tbLuongMotNgay");
  } else if (personSelect.value === 'customer') {
    isValid &= checkEmptyValue(person.TenCongTy, "tbTenCongTy");
    isValid &= checkEmptyValue(person.TriGiaHoaDon, "tbTriGiaHoaDon") && checkNumber(person.TriGiaHoaDon, "tbTriGiaHoaDon");
  }

  if(isValid){
    return person;
  }
}
document.getElementById('btn_Add').onclick = function() {
  const personToAdd = addPerson();
  if(personToAdd) {
    listPerson.addPerson(personToAdd);
    saveLocalStorage("listPerson", listPerson.getPersons());
    renderToDisplay(listPerson.getPersons());
    // Tắt modal
    $("#exampleModal").modal("hide")
  };
  // console.log(listPerson);
}


// Render ra giao diện
const renderToDisplay = (persons) => {
  const tbodyInfo = document.getElementById('tbodyInfo');

  tbodyInfo.innerHTML = '';

  persons.forEach((person) => {
    const { MaID, Name, Location, Email } = person;
    const userInfo = getUserInfoSelect(person);

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${MaID}</td>
      <td>${Name}</td>
      <td>${Location}</td>
      <td>${Email}</td>
      <td>${userInfo}</td>
      <td>${getPrivateInformation(person)}</td>
      <td>
        <button class="btn btn-warning"><i class="fa-solid fa-pen"></i></button>
        <button class="btn btn-danger"><i class="fa-solid fa-trash"></i></button>
      </td>
    `;

    tbodyInfo.appendChild(row);
  });
};
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
      return `Điểm Toán: ${person.DiemToan}<br>Điểm Lý: ${person.DiemLy}<br>Điểm Hóa: ${person.DiemHoa}<br>Điểm Trung Bình: ${person.tinhDiemTrungBinh(person.DiemToan, person.DiemLy, person.DiemHoa)}`;
    case 'employee':
      return `Số Ngày Làm Việc: ${person.SoNgayLamViec}<br>Lương Một Ngày: ${person.LuongMotNgay} VNĐ<br>Tổng Lương: ${person.tinhLuong()} VNĐ`;
    case 'customer':
      return `Tên Công Ty: ${person.TenCongTy}<br>Trị Giá Hóa Đơn: ${person.TriGiaHoaDon}<br>Đánh Giá: ${person.DanhGia}`;
    default:
      return 'Đối tượng không hợp lệ';
  }
};

// Lưu vào localStorage
function saveLocalStorage(key, value) {
  var stringJSON = JSON.stringify(value);
  localStorage.setItem(key, stringJSON);
}
// Lấy dữ liệu từ localStorage và render giao diện
function getLocalStorageAndRender(key) {
  let dataLocal = localStorage.getItem(key);
  if (dataLocal) {
    let newData = JSON.parse(dataLocal);
    renderToDisplay(newData);
  }
}
getLocalStorageAndRender("listPerson");