# PlanUs - Ứng dụng lên kế hoạch hẹn hò

PlanUs là ứng dụng mobile giúp các cặp đôi dễ dàng lên kế hoạch cho buổi hẹn hò của mình. Với giao diện thân thiện và các gợi ý thông minh, PlanUs sẽ giúp bạn có những trải nghiệm hẹn hò tuyệt vời.

## Tính năng

- Gợi ý kế hoạch hẹn hò dựa trên tâm trạng
- Tùy chỉnh theo khu vực, ngân sách và thời gian
- Lưu trữ và xem lại lịch sử các kế hoạch

## Cài đặt

1. Cài đặt các công cụ cần thiết:
   - Node.js (phiên bản 14 trở lên)
   - npm hoặc yarn
   - Expo Go trên điện thoại di động

2. Clone repository và cài đặt dependencies:
   ```bash
   git clone <repository-url>
   cd PlanUs
   npm install
   ```

3. Chạy ứng dụng:
   ```bash
   npm start
   ```

4. Quét mã QR bằng ứng dụng Expo Go trên điện thoại để chạy ứng dụng

## Công nghệ sử dụng

- React Native
- Expo
- React Navigation
- React Native Paper
- AsyncStorage

## Phát triển

Dự án sử dụng TypeScript để đảm bảo type safety. Để phát triển:

1. Chạy ứng dụng ở chế độ development:
   ```bash
   npm start
   ```

2. Để build cho Android:
   ```bash
   npm run android
   ```

3. Để build cho iOS:
   ```bash
   npm run ios
   ```

## Cấu trúc thư mục

```
src/
  ├── screens/          # Các màn hình chính
  ├── components/       # Components có thể tái sử dụng
  ├── navigation/       # Cấu hình navigation
  └── utils/           # Các utility functions
```
