import Person from "./Person.js";

export default class Student extends Person {
  DiemToan = '';
  DiemLy = '';
  DiemHoa = '';

  constructor(maID, name, email, location, diemToan, diemLy, diemHoa) {
    super(maID, name, email, location);
    this.DiemToan = diemToan;
    this.DiemLy = diemLy;
    this.DiemHoa = diemHoa;
  }
  tinhDiemTrungBinh = function(diemToan, diemLy, diemHoa) {
    var diemTB = ((parseFloat(diemToan) + parseFloat(diemLy) + parseFloat(diemHoa)) / 3).toFixed(2);
    return diemTB;
  }
}