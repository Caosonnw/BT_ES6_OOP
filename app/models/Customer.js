import Person from "./Person.js";

export default class Customer extends Person {
  TenCongTy = '';
  TriGiaHoaDon = '';
  DanhGia = '';

  constructor(maID, name, email, location, ten_cong_ty, tri_gia_hoa_don, danh_gia) {
    super(maID, name, email, location);
    this.TenCongTy = ten_cong_ty;
    this.TriGiaHoaDon = tri_gia_hoa_don;
    this.DanhGia = danh_gia;
  }
}