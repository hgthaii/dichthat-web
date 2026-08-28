# DichThat website

Landing page tĩnh chính thức của DichThat, được xây dựng bằng Astro và không cần backend hay Node.js trên hosting.

## Chạy local

```bash
npm install
npm run dev
```

## Kiểm tra bản build

```bash
npm run check
npm run build
npm run verify
```

Thư mục `dist/` có thể được đưa trực tiếp lên `public_html/` của cPanel.

Nút tải app luôn sử dụng endpoint GitHub Release ổn định tới `DichThat.dmg`, vì vậy website không cần deploy lại mỗi khi app có phiên bản mới.

## Triển khai tự động

Pull request vào `master` sẽ chạy kiểm tra và build. Khi push hoặc chạy thủ công
trên `master`, workflow đưa nội dung trong `dist/` lên cPanel bằng FTP.

Tạo GitHub Environment tên `production` và thêm các Secrets:

- `CPANEL_FTP_SERVER`
- `CPANEL_FTP_PORT`
- `CPANEL_FTP_USERNAME`
- `CPANEL_FTP_PASSWORD`
- `CPANEL_FTP_PATH`

`CPANEL_FTP_PATH` là đường dẫn nhìn thấy từ tài khoản FTP và phải kết thúc bằng
`/`, ví dụ `public_html/`. Nếu tài khoản FTP đã được giới hạn trực tiếp vào
`public_html`, sử dụng `/`.
