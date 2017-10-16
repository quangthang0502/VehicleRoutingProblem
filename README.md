# VehicleRoutingProblem
Bài tập toán rời rạc

Chú thích :
 - Tạo ngẫu nhiên số địa điểm thành phố mà xe cần tới, mỗi thành phố có một tọa độ được tạo ngẫu nhiên.
 - Số lượng hàng cần chuyển đến được tạo ngẫu nhiên từ 1-50 đơn vị
 - Sau khi nhập sức chứa của mỗi xe và số lượng thành phố thì hệ thống sẽ tạo ngẫu nhiên các thành phố
 - Các thành phố được hiện thị bằng hình tròn màu đỏ còn kho hàng sẽ là hình tròn màu đen
 
Thuật toán :
    - Thuật toán sẽ được chạy 100 lượt để so sánh và lấy kết quả có tổng quãng đường nhỏ nhất
    - Ở mỗi lượt
        * Các xe sẽ được khởi tạo và di chuyển đến một thành phố ngẫu nhiên.
        * Từ thành phố đầu tiên đến khi số hàng chạm đến sức chứa của xe thì xe sẽ tìm thành phố gần với nó nhất để di chuyển đến
        * Khi số hàng gần vượt quá sức chứa của xe,xe sẽ quay trở lại kho hàng và từ kho hàng sẽ tạo ra một xe khác và tiếp tục cho đến khi tất cả các thành phố được đi qua.
 