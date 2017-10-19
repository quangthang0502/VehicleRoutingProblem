$(document).ready(function () {
    $("#fileRead").change(function () {
       var reader = new FileReader();
       reader.onload = function () {
           var data = this.result;
           var items = data.split("\n");
           var lanThu = $("#lanThu").val();
           run(items,lanThu);
       };
       reader.readAsText(this.files[0]);
    });
});

function run(items,lanThu) {

    // ====================================================
    //     Các hàm cơ bản
    // ====================================================
    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext("2d");

    var height = canvas.height;
    var width = canvas.width;

    function printCircle(x, y, color) {
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
    }

    function printLine(Form, To, color) {
        ctx.beginPath();
        ctx.lineWidth = 5;
        ctx.lineCap = 'square';
        ctx.moveTo(Form.x*10, Form.y*10);
        ctx.lineTo(To.x*10, To.y*10);
        ctx.strokeStyle = color;
        ctx.stroke();
    }

    function khoangCach(A, B) {
        var ketQua = Math.sqrt((A.x - B.x) * (A.x - B.x) + (A.y - B.y) * (A.y - B.y));
        return ketQua;
    }

    function tinhTong(thanhPhan) {
        var tong = 0;
        for(tt = 0;tt < thanhPhan.length; tt ++) {
            tong = tong + thanhPhan[tt].tongQuangDuong;
        }
        return tong;
    }

    class ThanhPho {
        constructor(maTP, x, y, hangCanCungCap) {
            this.maTP = maTP;
            this.x = x;
            this.y = y;
            this.hangCanCungCap = parseInt(hangCanCungCap);
            this.xf = parseInt(x)*10;
            this.yf = parseInt(y)*10;
            ctx.beginPath();
            ctx.arc(this.xf, this.yf, 10, 0, 2 * Math.PI);
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
        constructor(x,y) {
            this.x = x;
            this.y = y;
            this.xf = parseInt(x)*10;
            this.yf = parseInt(y)*10;
            this.cungCap = 0;
            ctx.beginPath();
            ctx.arc(this.xf, this.yf, 20, 0, 2 * Math.PI);
            ctx.fillStyle = 'black';
            ctx.fill();
        }
    }

    class xeChoHang {
        constructor(sucChua, khoHang) {
            this.sucChua = parseInt(sucChua);
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
            var test = this.soHangCho + parseInt(thanhPho.hangCanCungCap);
            if (this.sucChua > test) {
                this.diQua.push(thanhPho);
                this.soHangCho = this.soHangCho + parseInt(thanhPho.hangCanCungCap);
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

    sucChua = items[0];
    console.log(sucChua);
    diaDiem = items[1];
    ctx.clearRect(0, 0, 1000, 1000);
    var m = 0;
    var n = 0;
    var content = items[2].split(' ');
    khoHang = new KhoHang(content[2],content[3]);
    for(i = 3;i < items.length; i++){
        if(i < (parseInt(diaDiem)+2)){
            var content = items[i].split(' ');
            cacThanhPho[m] = new ThanhPho(content[1], content[2], content[3], 0);
            m++;
        } else if (i === (parseInt(diaDiem)+2)) {

        } else {
            var content = items[i].split(' ');
            cacThanhPho[n].hangCanCungCap = content[1];
            n++;
        }
    }
    console.log(cacThanhPho);
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

    // =========================================================
    //     Thuật toán
    // =========================================================


    var danhSachXe = [];
    var toiUu = [];
    var thanhPho;
    var ketqua = $('#ketqua');

    for(thu = 0;thu < lanThu;thu++) {
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
        if (thu !== 0) {
            if(tinhTong(toiUu) > tinhTong(danhSachXe)) {
                toiUu = [];
                toiUu = danhSachXe.slice();
            }
        } else {
            toiUu = danhSachXe.slice();
        }
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

}