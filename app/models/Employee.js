import Person from "./Person.js";

export default class Employee extends Person {
  SoNgayLamViec = '';
  LuongMotNgay = '';

  constructor(maID, name, email, location, so_ngay_lam_viec, luong_mot_ngay) {
    super(maID, name, email, location);
    this.Person = 'employee';
    this.SoNgayLamViec = so_ngay_lam_viec;
    this.LuongMotNgay = luong_mot_ngay;
    this.Luong = this.tinhLuong();
  }
  tinhLuong() {
    let luong = this.SoNgayLamViec * this.LuongMotNgay;
    return luong.toLocaleString({
      style: "currency",
      currency: "VND"
    });
  }
}