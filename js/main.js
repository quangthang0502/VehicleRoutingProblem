$(document).ready(function () {

    // ====================================================
    //     Các hàm cơ bản
    // ====================================================
    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext("2d");

    var height = canvas.height;
    var width = canvas.width;

    function printCircle(x, y, color) {
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
    }

    function printLine(Form, To, color) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.lineCap = 'square';
        ctx.moveTo(Form.x + 250, Form.y + 250);
        ctx.lineTo(To.x + 250, To.y + 250);
        ctx.strokeStyle = color;
        ctx.stroke();
    }

    function khoangCach(A, B) {
        var ketQua = Math.sqrt((A.x - B.x) * (A.x - B.x) + (A.y - B.y) * (A.y - B.y));
        return ketQua;
    }

    class ThanhPho {
        constructor(maTP, x, y, hangCanCungCap) {
            this.maTP = maTP;
            this.x = x;
            this.y = y;
            this.hangCanCungCap = hangCanCungCap;
            this.xf = 250 + x;
            this.yf = 250 + y;
            ctx.beginPath();
            ctx.arc(this.xf, this.yf, 5, 0, 2 * Math.PI);
            ctx.fillStyle = 'red';
            ctx.fill();
            this.daQua = false;
        }

        xeQua() {
            this.daQua = true;
            return true;
        }
    }

    class KhoHang {
        constructor() {
            this.x = 0;
            this.y = 0;
            this.xf = 250;
            this.yf = 250;
            ctx.beginPath();
            ctx.arc(this.xf, this.yf, 5, 0, 2 * Math.PI);
            ctx.fillStyle = 'black';
            ctx.fill();
        }
    }

    class xeChoHang {
        constructor(sucChua, khoHang) {
            this.sucChua = sucChua;
            this.soHangCho = 0;
            this.tongQuangDuong = 0;
            this.veKho = false;
            this.diQua = [];
            this.diQua.push(khoHang);
            this.color = 'rgb(' + (Math.floor(Math.random() * 256)) + ','
                + (Math.floor(Math.random() * 150)) + ',' + (Math.floor(Math.random() * 150)) + ')';
        }

        checkHang(thanhPho) {
            var diemHienTai = this.diQua.length - 1;
            var test = this.soHangCho + thanhPho.hangCanCungCap;
            if (this.sucChua > test) {
                this.diQua.push(thanhPho);
                this.soHangCho = this.soHangCho + thanhPho.hangCanCungCap;
                this.tongQuangDuong = this.tongQuangDuong + khoangCach(this.diQua[diemHienTai], thanhPho);
                return true;
            }
            else {
                this.veKho = true;
                this.tongQuangDuong = this.tongQuangDuong + khoangCach(this.diQua[diemHienTai], this.diQua[0]);
                this.diQua.push(this.diQua[0]);
                return false;
            }
        }

        noiDiem () {
            for(x = 0;x < this.diQua.length - 1;x++) {
                printLine(this.diQua[x],this.diQua[x+1],this.color);
            }
        }

        diemGanNhat(danhSachThanhPho) {
            var diemHienTai = this.diQua.length - 1;
            var ganNhat = 0;
            var doDai = 100000;
            var soSanh;
            for (i = 0; i < danhSachThanhPho.length; i++) {
                soSanh = khoangCach(this.diQua[diemHienTai], danhSachThanhPho[i]);
                if (soSanh < doDai) {
                    ganNhat = i;
                    doDai = soSanh;
                }
            }
            return ganNhat;
        }
        xeVeKho (){
            var diemHienTai = this.diQua.length - 1;
            this.veKho = true;
            printLine(this.diQua[diemHienTai], this.diQua[0], this.color);
            this.tongQuangDuong = this.tongQuangDuong + khoangCach(this.diQua[diemHienTai], this.diQua[0]);
            this.diQua.push(this.diQua[0]);
        }
    }

    // ===============================================
    //     Tạo kho và các thành phố
    // ===============================================
    var sucChua;
    var khoHang;
    var cacThanhPho = [];
    var diaDiem;
    $('#button').click(function () {
        sucChua = $('#sucChua').val();
        diaDiem = $('#diaDiem').val();
        ctx.clearRect(0, 0, 500, 500);
        khoHang = new KhoHang();
        for (i = 0; i < diaDiem; i++) {
            x = Math.floor(Math.random() * (250 + 250) - 250);
            y = Math.floor(Math.random() * (250 + 250) - 250);
            hangCungCap = Math.floor(Math.random() * (50 - 1) + 1);
            cacThanhPho[i] = new ThanhPho(i + 1, x, y, hangCungCap);
        }
        var table = $('#thanhPho');
        var text = '';
        for (i = 0; i < cacThanhPho.length; i++) {
            text = "<tr>"
                + "<td>" + cacThanhPho[i].maTP + "</td>"
                + "<td>" + cacThanhPho[i].x + "</td>"
                + "<td>" + cacThanhPho[i].y + "</td>"
                + "<td>" + cacThanhPho[i].hangCanCungCap + "</td>"
                + "</tr>";
            table.append(text);
        }
    });

    // =========================================================
    //     Thuật toán
    // =========================================================


    var danhSachXe = [];
    var toiUu = [];
    var thanhPho;

    var ketqua = $('#ketqua');

    function tinhTong(thanhPhan) {
        var tong = 0;
        for(tt = 0;tt < thanhPhan.length; tt ++) {
            tong = tong + thanhPhan[i].tongQuangDuong;
        }
        return tong;
    }

    $('#toiUu').click(function () {
        for(thu = 0;thu < 100;thu++) {
            thanhPho = cacThanhPho.slice();
            while(true) {
                var taoXe = new xeChoHang(sucChua, khoHang);
                var x = Math.floor(Math.random() * thanhPho.length);
                taoXe.checkHang(thanhPho[x]);
                thanhPho.splice(x,1);
                var a;
                var y = true;
                if(thanhPho.length == 0) {
                    taoXe.xeVeKho();
                    danhSachXe.push(taoXe);
                    break;
                }
                while(y != false) {
                    a = taoXe.diemGanNhat(thanhPho);
                    if (thanhPho.length == 0) {
                        taoXe.xeVeKho();
                        break;
                    }
                    y = taoXe.checkHang(thanhPho[a]);
                    if(y == true) {
                        thanhPho.splice(a,1);
                    }
                }
                danhSachXe.push(taoXe);
                if(thanhPho.length == 0) {
                    break;
                }
            }
            if (thu != 0) {
                if(tinhTong(toiUu) > tinhTong(danhSachXe)) {
                    toiUu = [];
                    toiUu = danhSachXe.slice();
                }
            } else {
                toiUu = danhSachXe.slice();
                console.log(toiUu);
            }
            $('#cacBuoc').append("<p>Lan "+ (thu + 1) +" : " +tinhTong(danhSachXe)+"</p>");
            danhSachXe = [];
        }

        ketqua.append("<h1>Tổng quãng đường : </h1>" + tinhTong(toiUu));
        for(i = 0;i < toiUu.length;i++) {
            var text = "<h3>Xe : "+ i +"</h3>";
            ketqua.append(text);
            var diQuaThanhPho = toiUu[i].diQua;
            var texthead = "<ul class='thang'>";
            for(j=1;j < diQuaThanhPho.length-1;j++){
                texthead = texthead + "<li>"+diQuaThanhPho[j].maTP+"</li>";
            }
            texthead = texthead + "</ul>";
            ketqua.append(texthead);
            ketqua.append("<p>Tổng quãng đường : </p>" + toiUu[i].tongQuangDuong);
            toiUu[i].noiDiem();
        }

    });
});