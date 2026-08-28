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
trên `master`, workflow dùng SSH key để đưa nội dung trong `dist/` lên cPanel.

Tạo GitHub Environment tên `production` và thêm các Secrets:

- `CPANEL_HOST`
- `CPANEL_PORT`
- `CPANEL_USER`
- `CPANEL_PATH`
- `CPANEL_KNOWN_HOSTS`
- `CPANEL_SSH_PRIVATE_KEY`

`CPANEL_PATH` phải là đường dẫn tuyệt đối tới thư mục website, ví dụ
`/home/username/public_html`. Workflow không tự xóa file ngoài gói build trên hosting.
