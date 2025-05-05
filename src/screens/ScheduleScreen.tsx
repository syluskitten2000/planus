import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Schedule'>;

type LocationDetail = {
  name: string;
  address: string;
  openTime: string;
  priceRange: string;
};

type Location = {
  cafe: LocationDetail[];
  restaurant: LocationDetail[];
  entertainment: LocationDetail[];
  shopping: LocationDetail[];
};

type Locations = {
  [key: string]: Location;
};

type ScheduleItem = {
  id: string;
  time: string;
  activity: string;
  location: LocationDetail;
  moodType: string;
  area: string;
  budget: string;
  timeSlot: string;
  type: string;
};

const locations: Locations = {
  'hoan-kiem': {
    cafe: [
      {
        name: 'Cộng Cà Phê - Phố Đinh Liệt',
        address: '54 Đinh Liệt, Hàng Bạc, Hoàn Kiếm',
        openTime: '07:00 - 23:00',
        priceRange: '45.000đ - 85.000đ'
      },
      {
        name: 'Loading T - Cafe & Tea',
        address: '8 Chân Cầm, Hàng Trống, Hoàn Kiếm',
        openTime: '08:00 - 22:30',
        priceRange: '40.000đ - 75.000đ'
      },
      {
        name: 'The Note Coffee',
        address: '64 Lương Văn Can, Hàng Gai, Hoàn Kiếm',
        openTime: '07:00 - 23:00',
        priceRange: '35.000đ - 95.000đ'
      },
      {
        name: 'Tranquil Books & Coffee',
        address: '5 Nguyễn Quang Bích, Hoàn Kiếm',
        openTime: '08:00 - 22:00',
        priceRange: '40.000đ - 90.000đ'
      },
      {
        name: 'Cafe Phố Cổ',
        address: '11 Hàng Gai, Hoàn Kiếm',
        openTime: '07:00 - 23:00',
        priceRange: '35.000đ - 80.000đ'
      }
    ],
    restaurant: [
      {
        name: 'Chả Cá Thăng Long',
        address: '19-21-31 Đường Thành, Hoàn Kiếm',
        openTime: '10:00 - 21:00',
        priceRange: '200.000đ - 400.000đ'
      },
      {
        name: 'Bún Chả Hương Liên',
        address: '24 Lê Văn Hưu, Hoàn Kiếm',
        openTime: '08:00 - 21:00',
        priceRange: '50.000đ - 100.000đ'
      },
      {
        name: 'Phở Gia Truyền Bát Đàn',
        address: '49 Bát Đàn, Hoàn Kiếm',
        openTime: '06:00 - 10:00, 17:30 - 21:00',
        priceRange: '40.000đ - 70.000đ'
      },
      {
        name: 'Bánh Cuốn Bà Hoành',
        address: '66 Tô Hiến Thành, Hoàn Kiếm',
        openTime: '06:30 - 21:00',
        priceRange: '30.000đ - 60.000đ'
      },
      {
        name: 'Bún Đậu Mắm Tôm Đào Duy Từ',
        address: '51 Đào Duy Từ, Hoàn Kiếm',
        openTime: '10:00 - 21:00',
        priceRange: '70.000đ - 150.000đ'
      }
    ],
    entertainment: [
      {
        name: 'Phố đi bộ Hồ Hoàn Kiếm',
        address: 'Quanh Hồ Hoàn Kiếm',
        openTime: 'T6-CN: 19:00 - 24:00',
        priceRange: 'Miễn phí'
      },
      {
        name: 'Nhà hát Lớn Hà Nội',
        address: '1 Tràng Tiền, Hoàn Kiếm',
        openTime: 'Theo lịch biểu diễn',
        priceRange: '200.000đ - 2.000.000đ'
      },
      {
        name: 'Phố đi bộ Hàng Ngang - Hàng Đào',
        address: 'Phố Hàng Ngang - Hàng Đào',
        openTime: 'T6-CN: 19:00 - 24:00',
        priceRange: 'Miễn phí'
      },
      {
        name: 'Đền Ngọc Sơn',
        address: 'Đền Ngọc Sơn, Hoàn Kiếm',
        openTime: '07:30 - 18:00',
        priceRange: '30.000đ'
      }
    ],
    shopping: [
      {
        name: 'Tạp hóa Hàng Gai',
        address: '54 Đinh Liệt, Hàng Bạc, Hoàn Kiếm',
        openTime: '07:00 - 23:00',
        priceRange: 'Miễn phí'
      },
      {
        name: 'Tạp hóa Hàng Trống',
        address: '8 Chân Cầm, Hàng Trống, Hoàn Kiếm',
        openTime: '08:00 - 23:00',
        priceRange: 'Miễn phí'
      },
      {
        name: 'Tạp hóa Hàng Gai',
        address: '64 Lương Văn Can, Hàng Gai, Hoàn Kiếm',
        openTime: '07:00 - 23:00',
        priceRange: 'Miễn phí'
      },
      {
        name: 'Tạp hóa Hàng Bích',
        address: '5 Nguyễn Quang Bích, Hoàn Kiếm',
        openTime: '08:00 - 23:00',
        priceRange: 'Miễn phí'
      },
      {
        name: 'Tạp hóa Phố Cổ',
        address: '11 Hàng Gai, Hoàn Kiếm',
        openTime: '07:00 - 23:00',
        priceRange: 'Miễn phí'
      }
    ]
  },
  'tay-ho': {
    cafe: [
      {
        name: 'The Hanoi Social Club',
        address: '6 Ngõ 19 Đặng Dung, Quảng An, Tây Hồ',
        openTime: '08:00 - 23:00',
        priceRange: '60.000đ - 200.000đ'
      },
      {
        name: 'Maison de Blanc',
        address: '37 Quảng Bá, Tây Hồ',
        openTime: '07:00 - 22:30',
        priceRange: '55.000đ - 150.000đ'
      },
      {
        name: 'Summit Lounge',
        address: '1 Đường Thanh Niên, Tây Hồ',
        openTime: '08:00 - 24:00',
        priceRange: '80.000đ - 250.000đ'
      }
    ],
    restaurant: [
      {
        name: 'Quán Ăn Ngon - Tây Hồ',
        address: '168 Đường Thụy Khuê, Tây Hồ',
        openTime: '07:00 - 22:00',
        priceRange: '100.000đ - 300.000đ'
      },
      {
        name: 'Home Vietnamese Restaurant',
        address: '34 Châu Long, Tây Hồ',
        openTime: '10:00 - 22:00',
        priceRange: '150.000đ - 400.000đ'
      },
      {
        name: 'Nhà hàng Hải Sản Hồ Tây',
        address: '519 Lạc Long Quân, Tây Hồ',
        openTime: '10:00 - 22:30',
        priceRange: '200.000đ - 800.000đ'
      }
    ],
    entertainment: [
      {
        name: 'Công viên nước Hồ Tây',
        address: '614 Lạc Long Quân, Tây Hồ',
        openTime: '08:30 - 18:00',
        priceRange: '180.000đ - 220.000đ'
      },
      {
        name: 'Phố đi bộ Trịnh Công Sơn',
        address: 'Phố Trịnh Công Sơn, Tây Hồ',
        openTime: 'T6-CN: 19:00 - 24:00',
        priceRange: 'Miễn phí'
      },
      {
        name: 'Bến du thuyền Hồ Tây',
        address: '614 Lạc Long Quân, Tây Hồ',
        openTime: '08:00 - 18:00',
        priceRange: '100.000đ - 500.000đ'
      }
    ],
    shopping: [
      {
        name: 'Tạp hóa Quảng An',
        address: '6 Ngõ 19 Đặng Dung, Quảng An, Tây Hồ',
        openTime: '08:00 - 23:00',
        priceRange: 'Miễn phí'
      },
      {
        name: 'Tạp hóa Tây Hồ',
        address: '37 Quảng Bá, Tây Hồ',
        openTime: '07:00 - 22:30',
        priceRange: 'Miễn phí'
      },
      {
        name: 'Tạp hóa Thanh Niên',
        address: '1 Đường Thanh Niên, Tây Hồ',
        openTime: '08:00 - 24:00',
        priceRange: 'Miễn phí'
      }
    ]
  },
  'ba-dinh': {
    cafe: [
      {
        name: 'Highlands Coffee - Lăng Bác',
        address: '2 Hùng Vương, Ba Đình',
        openTime: '07:00 - 22:00',
        priceRange: '40.000đ - 85.000đ'
      },
      {
        name: 'Cafe Điện Biên',
        address: '13 Điện Biên Phủ, Ba Đình',
        openTime: '07:00 - 23:00',
        priceRange: '35.000đ - 75.000đ'
      },
      {
        name: 'Cafe Giảng - Quán Thánh',
        address: '106 Quán Thánh, Ba Đình',
        openTime: '07:00 - 22:30',
        priceRange: '30.000đ - 65.000đ'
      }
    ],
    restaurant: [
      {
        name: 'Quán Ăn Ngon - Phan Đình Phùng',
        address: '18 Phan Đình Phùng, Ba Đình',
        openTime: '08:00 - 22:00',
        priceRange: '100.000đ - 300.000đ'
      },
      {
        name: 'Nhà hàng Kichi Kichi',
        address: '14 Liễu Giai, Ba Đình',
        openTime: '10:00 - 22:00',
        priceRange: '150.000đ - 400.000đ'
      },
      {
        name: 'Nhà hàng Lã Vọng',
        address: '36 Quang Trung, Ba Đình',
        openTime: '10:00 - 22:00',
        priceRange: '200.000đ - 500.000đ'
      }
    ],
    entertainment: [
      {
        name: 'Lăng Chủ tịch Hồ Chí Minh',
        address: '2 Hùng Vương, Ba Đình',
        openTime: '07:30 - 10:30',
        priceRange: 'Miễn phí'
      },
      {
        name: 'Hoàng thành Thăng Long',
        address: '19C Hoàng Diệu, Ba Đình',
        openTime: '08:00 - 17:00',
        priceRange: '30.000đ'
      },
      {
        name: 'Văn Miếu - Quốc Tử Giám',
        address: '58 Quốc Tử Giám, Đống Đa',
        openTime: '07:30 - 18:00',
        priceRange: '30.000đ'
      }
    ],
    shopping: [
      {
        name: 'Tạp hóa Phan Đình Phùng',
        address: '18 Phan Đình Phùng, Ba Đình',
        openTime: '08:00 - 22:00',
        priceRange: 'Miễn phí'
      },
      {
        name: 'Tạp hóa Liễu Giai',
        address: '14 Liễu Giai, Ba Đình',
        openTime: '10:00 - 22:00',
        priceRange: 'Miễn phí'
      },
      {
        name: 'Tạp hóa Quang Trung',
        address: '36 Quang Trung, Ba Đình',
        openTime: '10:00 - 22:00',
        priceRange: 'Miễn phí'
      }
    ]
  },
  'cau-giay': {
    cafe: [
      {
        name: 'Starbucks - TTTM Indochina Plaza',
        address: '241 Xuân Thủy, Cầu Giấy',
        openTime: '07:00 - 22:00',
        priceRange: '50.000đ - 120.000đ'
      },
      {
        name: 'Highland Coffee - Big C Thăng Long',
        address: 'Big C Thăng Long, 222 Trần Duy Hưng',
        openTime: '08:00 - 22:00',
        priceRange: '40.000đ - 85.000đ'
      },
      {
        name: 'The Coffee House - Cầu Giấy',
        address: '138 Cầu Giấy',
        openTime: '07:00 - 22:30',
        priceRange: '35.000đ - 75.000đ'
      }
    ],
    restaurant: [
      {
        name: 'Gogi House - TTTM Discovery',
        address: 'TTTM Discovery, 302 Cầu Giấy',
        openTime: '10:00 - 22:00',
        priceRange: '150.000đ - 350.000đ'
      },
      {
        name: 'Sumo BBQ - Big C Thăng Long',
        address: 'Big C Thăng Long, 222 Trần Duy Hưng',
        openTime: '10:00 - 22:00',
        priceRange: '200.000đ - 400.000đ'
      },
      {
        name: 'Nhà hàng Hải Cảng',
        address: '144 Xuân Thủy, Cầu Giấy',
        openTime: '10:00 - 22:00',
        priceRange: '200.000đ - 500.000đ'
      }
    ],
    entertainment: [
      {
        name: 'TTTM Indochina Plaza',
        address: '241 Xuân Thủy, Cầu Giấy',
        openTime: '09:00 - 22:00',
        priceRange: 'Tùy hoạt động'
      },
      {
        name: 'Công viên Cầu Giấy',
        address: 'Đường Cầu Giấy',
        openTime: '05:00 - 22:00',
        priceRange: 'Miễn phí'
      },
      {
        name: 'Rạp chiếu phim CGV - Discovery',
        address: 'TTTM Discovery, 302 Cầu Giấy',
        openTime: '09:00 - 24:00',
        priceRange: '60.000đ - 150.000đ'
      }
    ],
    shopping: [
      {
        name: 'Tạp hóa Xuân Thủy',
        address: '138 Cầu Giấy',
        openTime: '07:00 - 22:30',
        priceRange: 'Miễn phí'
      },
      {
        name: 'Tạp hóa Discovery',
        address: 'TTTM Discovery, 302 Cầu Giấy',
        openTime: '09:00 - 24:00',
        priceRange: 'Miễn phí'
      }
    ]
  },
  'dong-da': {
    cafe: [
      {
        name: 'Cộng Cà Phê - Phố Xã Đàn',
        address: '252 Xã Đàn 2, Đống Đa',
        openTime: '07:00 - 23:00',
        priceRange: '40.000đ - 85.000đ'
      },
      {
        name: 'The Coffee House - Đại Cồ Việt',
        address: '144 Đại Cồ Việt, Đống Đa',
        openTime: '07:00 - 22:30',
        priceRange: '35.000đ - 75.000đ'
      },
      {
        name: 'Highlands Coffee - Royal City',
        address: 'TTTM Royal City, 72A Nguyễn Trãi',
        openTime: '08:00 - 22:00',
        priceRange: '40.000đ - 85.000đ'
      }
    ],
    restaurant: [
      {
        name: 'Lẩu Nấm Gia Khánh',
        address: '136 Triệu Việt Vương, Đống Đa',
        openTime: '10:00 - 22:00',
        priceRange: '150.000đ - 300.000đ'
      },
      {
        name: 'Quán Ăn Ngon - Phố Huế',
        address: '26 Phố Huế, Đống Đa',
        openTime: '07:00 - 22:00',
        priceRange: '100.000đ - 300.000đ'
      },
      {
        name: 'Bún Chả Hương Liên',
        address: '24 Lê Văn Hưu, Đống Đa',
        openTime: '08:00 - 21:00',
        priceRange: '50.000đ - 100.000đ'
      }
    ],
    entertainment: [
      {
        name: 'TTTM Royal City',
        address: '72A Nguyễn Trãi, Đống Đa',
        openTime: '09:30 - 22:00',
        priceRange: 'Tùy hoạt động'
      },
      {
        name: 'Công viên Thống Nhất',
        address: 'Đại Cồ Việt, Đống Đa',
        openTime: '05:00 - 22:00',
        priceRange: 'Miễn phí'
      },
      {
        name: 'Rạp chiếu phim CGV - Royal City',
        address: 'TTTM Royal City, 72A Nguyễn Trãi',
        openTime: '09:00 - 24:00',
        priceRange: '60.000đ - 150.000đ'
      }
    ],
    shopping: [
      {
        name: 'Tạp hóa Đại Cồ Việt',
        address: '144 Đại Cồ Việt, Đống Đa',
        openTime: '07:00 - 22:30',
        priceRange: 'Miễn phí'
      },
      {
        name: 'Tạp hóa Royal City',
        address: '72A Nguyễn Trãi, Đống Đa',
        openTime: '09:30 - 22:00',
        priceRange: 'Miễn phí'
      }
    ]
  },
  'hai-ba-trung': {
    cafe: [
      {
        name: 'Highlands Coffee - Times City',
        address: 'TTTM Times City, 458 Minh Khai',
        openTime: '08:00 - 22:00',
        priceRange: '40.000đ - 85.000đ'
      },
      {
        name: 'The Coffee House - Bạch Mai',
        address: '168 Bạch Mai',
        openTime: '07:00 - 22:30',
        priceRange: '35.000đ - 75.000đ'
      },
      {
        name: 'Urban Station - Hai Bà Trưng',
        address: '23 Hai Bà Trưng',
        openTime: '07:00 - 23:00',
        priceRange: '45.000đ - 95.000đ'
      }
    ],
    restaurant: [
      {
        name: 'Buffet Sen Hồng - Times City',
        address: 'TTTM Times City, 458 Minh Khai',
        openTime: '10:00 - 22:00',
        priceRange: '300.000đ - 500.000đ'
      },
      {
        name: 'Quán Ăn Ngon - Trần Hưng Đạo',
        address: '25 Trần Hưng Đạo',
        openTime: '07:00 - 22:00',
        priceRange: '100.000đ - 300.000đ'
      },
      {
        name: 'Lẩu Wang - Times City',
        address: 'TTTM Times City, 458 Minh Khai',
        openTime: '10:00 - 22:00',
        priceRange: '200.000đ - 400.000đ'
      }
    ],
    entertainment: [
      {
        name: 'TTTM Vincom Times City',
        address: '458 Minh Khai',
        openTime: '09:30 - 22:00',
        priceRange: 'Tùy hoạt động'
      },
      {
        name: 'Công viên Tuổi Trẻ',
        address: '58 Đại Cồ Việt',
        openTime: '05:00 - 22:00',
        priceRange: 'Miễn phí'
      },
      {
        name: 'Rạp chiếu phim CGV - Times City',
        address: 'TTTM Times City, 458 Minh Khai',
        openTime: '09:00 - 24:00',
        priceRange: '60.000đ - 150.000đ'
      }
    ],
    shopping: [
      {
        name: 'Tạp hóa Minh Khai',
        address: '458 Minh Khai',
        openTime: '09:30 - 22:00',
        priceRange: 'Miễn phí'
      },
      {
        name: 'Tạp hóa Times City',
        address: 'TTTM Times City',
        openTime: '09:00 - 24:00',
        priceRange: 'Miễn phí'
      }
    ]
  },
  'nam-tu-liem': {
    cafe: [
      {
        name: 'Highlands Coffee - The Garden',
        address: 'TTTM The Garden, Mễ Trì',
        openTime: '08:00 - 22:00',
        priceRange: '40.000đ - 85.000đ'
      },
      {
        name: 'Starbucks - Aeon Mall',
        address: 'Aeon Mall Hà Đông',
        openTime: '09:00 - 22:00',
        priceRange: '50.000đ - 120.000đ'
      },
      {
        name: 'The Coffee House - Mỹ Đình',
        address: '24 Đường Đỗ Đức Dục',
        openTime: '07:00 - 22:30',
        priceRange: '35.000đ - 75.000đ'
      }
    ],
    restaurant: [
      {
        name: 'Gogi House - Aeon Mall',
        address: 'Aeon Mall Hà Đông',
        openTime: '10:00 - 22:00',
        priceRange: '150.000đ - 350.000đ'
      },
      {
        name: 'Sumo BBQ - The Garden',
        address: 'TTTM The Garden, Mễ Trì',
        openTime: '10:00 - 22:00',
        priceRange: '200.000đ - 400.000đ'
      },
      {
        name: 'Buffet Sen - Keangnam',
        address: 'Tòa nhà Keangnam, Phạm Hùng',
        openTime: '11:00 - 22:00',
        priceRange: '300.000đ - 500.000đ'
      }
    ],
    entertainment: [
      {
        name: 'TTTM Aeon Mall',
        address: 'Dương Nội, Hà Đông',
        openTime: '09:00 - 22:00',
        priceRange: 'Tùy hoạt động'
      },
      {
        name: 'Sân vận động Mỹ Đình',
        address: 'Đường Lê Đức Thọ',
        openTime: 'Theo sự kiện',
        priceRange: 'Theo sự kiện'
      },
      {
        name: 'The Garden Shopping Center',
        address: 'Mễ Trì, Nam Từ Liêm',
        openTime: '09:00 - 22:00',
        priceRange: 'Tùy hoạt động'
      }
    ],
    shopping: [
      {
        name: 'Tạp hóa Aeon Mall',
        address: 'Dương Nội, Hà Đông',
        openTime: '09:00 - 22:00',
        priceRange: 'Miễn phí'
      },
      {
        name: 'Tạp hóa The Garden',
        address: 'Mễ Trì, Nam Từ Liêm',
        openTime: '09:00 - 22:00',
        priceRange: 'Miễn phí'
      }
    ]
  },
  'bac-tu-liem': {
    cafe: [
      {
        name: 'Highland Coffee - Cầu Diễn',
        address: '196 Cầu Diễn',
        openTime: '07:00 - 22:00',
        priceRange: '40.000đ - 85.000đ'
      },
      {
        name: 'The Coffee House - Phạm Văn Đồng',
        address: '168 Phạm Văn Đồng',
        openTime: '07:00 - 22:30',
        priceRange: '35.000đ - 75.000đ'
      },
      {
        name: 'Urban Station - Cổ Nhuế',
        address: '298 Cổ Nhuế',
        openTime: '07:00 - 23:00',
        priceRange: '45.000đ - 95.000đ'
      }
    ],
    restaurant: [
      {
        name: 'Quán Ăn Ngon - Cầu Diễn',
        address: '235 Cầu Diễn',
        openTime: '07:00 - 22:00',
        priceRange: '100.000đ - 300.000đ'
      },
      {
        name: 'Lẩu Nấm Gia Khánh',
        address: '168 Phạm Văn Đồng',
        openTime: '10:00 - 22:00',
        priceRange: '150.000đ - 300.000đ'
      },
      {
        name: 'Nhà hàng Món Huế',
        address: '235 Cầu Diễn',
        openTime: '07:00 - 22:00',
        priceRange: '70.000đ - 200.000đ'
      }
    ],
    entertainment: [
      {
        name: 'Công viên Hòa Bình',
        address: 'Phường Xuân Phương',
        openTime: '05:00 - 22:00',
        priceRange: 'Miễn phí'
      },
      {
        name: 'Sân Golf Minh Trí',
        address: 'Đường K2, Cổ Nhuế',
        openTime: '06:00 - 22:00',
        priceRange: '500.000đ - 2.000.000đ'
      },
      {
        name: 'Khu vui chơi Thiên Đường Bảo Sơn',
        address: 'Km5+200 Đường Lê Trọng Tấn',
        openTime: '08:00 - 18:00',
        priceRange: '150.000đ - 200.000đ'
      }
    ],
    shopping: [
      {
        name: 'Tạp hóa Cầu Diễn',
        address: '235 Cầu Diễn',
        openTime: '07:00 - 22:00',
        priceRange: 'Miễn phí'
      },
      {
        name: 'Tạp hóa Phạm Văn Đồng',
        address: '168 Phạm Văn Đồng',
        openTime: '07:00 - 22:30',
        priceRange: 'Miễn phí'
      }
    ]
  },
  'long-bien': {
    cafe: [
      {
        name: 'Highland Coffee - Savico Long Biên',
        address: 'TTTM Savico Megamall',
        openTime: '08:00 - 22:00',
        priceRange: '40.000đ - 85.000đ'
      },
      {
        name: 'The Coffee House - Nguyễn Văn Cừ',
        address: '168 Nguyễn Văn Cừ',
        openTime: '07:00 - 22:30',
        priceRange: '35.000đ - 75.000đ'
      },
      {
        name: 'Urban Station - Long Biên',
        address: '25 Ngô Gia Tự',
        openTime: '07:00 - 23:00',
        priceRange: '45.000đ - 95.000đ'
      }
    ],
    restaurant: [
      {
        name: 'Quán Ăn Ngon - Long Biên',
        address: '23 Ngô Gia Tự',
        openTime: '07:00 - 22:00',
        priceRange: '100.000đ - 300.000đ'
      },
      {
        name: 'Lẩu Wang - Savico',
        address: 'TTTM Savico Megamall',
        openTime: '10:00 - 22:00',
        priceRange: '200.000đ - 400.000đ'
      },
      {
        name: 'Nhà hàng Món Huế',
        address: '235 Nguyễn Văn Cừ',
        openTime: '07:00 - 22:00',
        priceRange: '70.000đ - 200.000đ'
      }
    ],
    entertainment: [
      {
        name: 'TTTM Savico Megamall',
        address: '7-9 Nguyễn Văn Linh',
        openTime: '09:00 - 22:00',
        priceRange: 'Tùy hoạt động'
      },
      {
        name: 'Công viên Nhật Tân',
        address: 'Phường Nhật Tân',
        openTime: '05:00 - 22:00',
        priceRange: 'Miễn phí'
      },
      {
        name: 'Cầu Long Biên',
        address: 'Phố Trần Nhật Duật',
        openTime: '24/24',
        priceRange: 'Miễn phí'
      }
    ],
    shopping: [
      {
        name: 'Tạp hóa Savico Megamall',
        address: '7-9 Nguyễn Văn Linh',
        openTime: '09:00 - 22:00',
        priceRange: 'Miễn phí'
      },
      {
        name: 'Tạp hóa Nguyễn Văn Cừ',
        address: '168 Nguyễn Văn Cừ',
        openTime: '07:00 - 22:30',
        priceRange: 'Miễn phí'
      }
    ]
  },
  'thanh-xuan': {
    cafe: [
      {
        name: 'Highland Coffee - Royal City',
        address: 'TTTM Royal City',
        openTime: '08:00 - 22:00',
        priceRange: '40.000đ - 85.000đ'
      },
      {
        name: 'The Coffee House - Nguyễn Trãi',
        address: '168 Nguyễn Trãi',
        openTime: '07:00 - 22:30',
        priceRange: '35.000đ - 75.000đ'
      },
      {
        name: 'Urban Station - Thanh Xuân',
        address: '25 Nguyễn Trãi',
        openTime: '07:00 - 23:00',
        priceRange: '45.000đ - 95.000đ'
      }
    ],
    restaurant: [
      {
        name: 'Quán Ăn Ngon - Thanh Xuân',
        address: '23 Nguyễn Trãi',
        openTime: '07:00 - 22:00',
        priceRange: '100.000đ - 300.000đ'
      },
      {
        name: 'Lẩu Wang - Royal City',
        address: 'TTTM Royal City',
        openTime: '10:00 - 22:00',
        priceRange: '200.000đ - 400.000đ'
      },
      {
        name: 'Nhà hàng Món Huế',
        address: '235 Nguyễn Trãi',
        openTime: '07:00 - 22:00',
        priceRange: '70.000đ - 200.000đ'
      }
    ],
    entertainment: [
      {
        name: 'TTTM Royal City',
        address: '72A Nguyễn Trãi',
        openTime: '09:30 - 22:00',
        priceRange: 'Tùy hoạt động'
      },
      {
        name: 'Công viên Thanh Xuân',
        address: 'Phường Thanh Xuân Bắc',
        openTime: '05:00 - 22:00',
        priceRange: 'Miễn phí'
      },
      {
        name: 'Rạp chiếu phim CGV - Royal City',
        address: 'TTTM Royal City',
        openTime: '09:00 - 24:00',
        priceRange: '60.000đ - 150.000đ'
      }
    ],
    shopping: [
      {
        name: 'Tạp hóa Royal City',
        address: 'TTTM Royal City',
        openTime: '09:00 - 24:00',
        priceRange: 'Miễn phí'
      },
      {
        name: 'Tạp hóa Nguyễn Trãi',
        address: '168 Nguyễn Trãi',
        openTime: '07:00 - 22:30',
        priceRange: 'Miễn phí'
      }
    ]
  }
};

const generateSchedule = (
  selectedDistrict: string,
  moodType: string,
  budget: string,
  timeSlot: string
): ScheduleItem[] => {
  const districtLocations = locations[selectedDistrict as keyof typeof locations];
  if (!districtLocations) {
    console.warn(`No locations found for district: ${selectedDistrict}`);
    return [];
  }

  const schedule: ScheduleItem[] = [];
  
  // Helper function to filter locations by budget
  const filterByBudget = (location: LocationDetail): boolean => {
    const priceStr = location.priceRange;
    if (priceStr === 'Miễn phí' || priceStr === 'Tùy hoạt động' || priceStr === 'Theo sự kiện') return true;
    
    const prices = priceStr.match(/\d+\.?\d*/g);
    if (!prices) return true;
    
    const avgPrice = prices.reduce((a, b) => Number(b.replace('.', '')) + a, 0) / prices.length;
    
    switch (budget) {
      case 'low': return avgPrice <= 100000;
      case 'medium': return avgPrice > 100000 && avgPrice <= 300000;
      case 'high': return avgPrice > 300000;
      default: return true;
    }
  };

  // Filter locations based on mood type
  const filterByMood = (location: LocationDetail, type: string): boolean => {
    switch (moodType) {
      case 'romantic':
        // Romantic places prefer cafes and restaurants with higher price ranges
        return type === 'cafe' || type === 'restaurant';
      case 'adventure':
        // Adventure mood prefers entertainment and outdoor activities
        return type === 'entertainment';
      case 'relaxing':
        // Relaxing mood prefers cafes and shopping
        return type === 'cafe' || type === 'shopping';
      case 'cultural':
        // Cultural mood prefers entertainment venues and traditional restaurants
        return type === 'entertainment' || type === 'restaurant';
      default:
        return true;
    }
  };

  // Generate schedule based on time slot
  switch (timeSlot) {
    case 'morning':
      if (districtLocations.cafe.length > 0) {
        const filteredCafes = districtLocations.cafe.filter(cafe => 
          filterByBudget(cafe) && filterByMood(cafe, 'cafe')
        );
        if (filteredCafes.length > 0) {
          schedule.push({
            id: '1',
            time: '8:00 AM',
            activity: 'Morning Coffee',
            location: filteredCafes[Math.floor(Math.random() * filteredCafes.length)],
            moodType,
            area: selectedDistrict,
            budget,
            timeSlot,
            type: 'cafe'
          });
        }
      }
      if (districtLocations.entertainment.length > 0) {
        const filteredEntertainment = districtLocations.entertainment.filter(ent => 
          filterByBudget(ent) && filterByMood(ent, 'entertainment')
        );
        if (filteredEntertainment.length > 0) {
          schedule.push({
            id: '2',
            time: '10:00 AM',
            activity: 'Morning Activity',
            location: filteredEntertainment[Math.floor(Math.random() * filteredEntertainment.length)],
            moodType,
            area: selectedDistrict,
            budget,
            timeSlot,
            type: 'entertainment'
          });
        }
      }
      break;

    case 'afternoon':
      if (districtLocations.restaurant.length > 0) {
        const filteredRestaurants = districtLocations.restaurant.filter(rest => 
          filterByBudget(rest) && filterByMood(rest, 'restaurant')
        );
        if (filteredRestaurants.length > 0) {
          schedule.push({
            id: '3',
            time: '12:00 PM',
            activity: 'Lunch',
            location: filteredRestaurants[Math.floor(Math.random() * filteredRestaurants.length)],
            moodType,
            area: selectedDistrict,
            budget,
            timeSlot,
            type: 'restaurant'
          });
        }
      }
      if (districtLocations.entertainment.length > 0) {
        const filteredEntertainment = districtLocations.entertainment.filter(ent => 
          filterByBudget(ent) && filterByMood(ent, 'entertainment')
        );
        if (filteredEntertainment.length > 0) {
          schedule.push({
            id: '4',
            time: '2:00 PM',
            activity: 'Afternoon Activity',
            location: filteredEntertainment[Math.floor(Math.random() * filteredEntertainment.length)],
            moodType,
            area: selectedDistrict,
            budget,
            timeSlot,
            type: 'entertainment'
          });
        }
      }
      break;

    case 'evening':
      if (districtLocations.entertainment.length > 0) {
        const filteredEntertainment = districtLocations.entertainment.filter(ent => 
          filterByBudget(ent) && filterByMood(ent, 'entertainment')
        );
        if (filteredEntertainment.length > 0) {
          schedule.push({
            id: '5',
            time: '5:00 PM',
            activity: 'Evening Activity',
            location: filteredEntertainment[Math.floor(Math.random() * filteredEntertainment.length)],
            moodType,
            area: selectedDistrict,
            budget,
            timeSlot,
            type: 'entertainment'
          });
        }
      }
      if (districtLocations.restaurant.length > 0) {
        const filteredRestaurants = districtLocations.restaurant.filter(rest => 
          filterByBudget(rest) && filterByMood(rest, 'restaurant')
        );
        if (filteredRestaurants.length > 0) {
          schedule.push({
            id: '6',
            time: '7:00 PM',
            activity: 'Dinner',
            location: filteredRestaurants[Math.floor(Math.random() * filteredRestaurants.length)],
            moodType,
            area: selectedDistrict,
            budget,
            timeSlot,
            type: 'restaurant'
          });
        }
      }
      break;

    default:
      // Full day schedule
      if (districtLocations.cafe.length > 0) {
        const filteredCafes = districtLocations.cafe.filter(cafe => 
          filterByBudget(cafe) && filterByMood(cafe, 'cafe')
        );
        if (filteredCafes.length > 0) {
          schedule.push({
            id: '7',
            time: '9:00 AM',
            activity: 'Morning Coffee',
            location: filteredCafes[Math.floor(Math.random() * filteredCafes.length)],
            moodType,
            area: selectedDistrict,
            budget,
            timeSlot,
            type: 'cafe'
          });
        }
      }
      if (districtLocations.restaurant.length > 0) {
        const filteredRestaurants = districtLocations.restaurant.filter(rest => 
          filterByBudget(rest) && filterByMood(rest, 'restaurant')
        );
        if (filteredRestaurants.length > 0) {
          schedule.push({
            id: '8',
            time: '12:00 PM',
            activity: 'Lunch',
            location: filteredRestaurants[Math.floor(Math.random() * filteredRestaurants.length)],
            moodType,
            area: selectedDistrict,
            budget,
            timeSlot,
            type: 'restaurant'
          });
        }
      }
      if (districtLocations.entertainment.length > 0) {
        const filteredEntertainment = districtLocations.entertainment.filter(ent => 
          filterByBudget(ent) && filterByMood(ent, 'entertainment')
        );
        if (filteredEntertainment.length > 0) {
          schedule.push({
            id: '9',
            time: '2:00 PM',
            activity: 'Afternoon Activity',
            location: filteredEntertainment[Math.floor(Math.random() * filteredEntertainment.length)],
            moodType,
            area: selectedDistrict,
            budget,
            timeSlot,
            type: 'entertainment'
          });
        }
      }
      if (districtLocations.shopping.length > 0) {
        const filteredShopping = districtLocations.shopping.filter(shop => 
          filterByBudget(shop) && filterByMood(shop, 'shopping')
        );
        if (filteredShopping.length > 0) {
          schedule.push({
            id: '10',
            time: '4:00 PM',
            activity: 'Shopping',
            location: filteredShopping[Math.floor(Math.random() * filteredShopping.length)],
            moodType,
            area: selectedDistrict,
            budget,
            timeSlot,
            type: 'shopping'
          });
        }
      }
      if (districtLocations.restaurant.length > 0) {
        const filteredRestaurants = districtLocations.restaurant.filter(rest => 
          filterByBudget(rest) && filterByMood(rest, 'restaurant')
        );
        if (filteredRestaurants.length > 0) {
          schedule.push({
            id: '11',
            time: '7:00 PM',
            activity: 'Dinner',
            location: filteredRestaurants[Math.floor(Math.random() * filteredRestaurants.length)],
            moodType,
            area: selectedDistrict,
            budget,
            timeSlot,
            type: 'restaurant'
          });
        }
      }
  }

  return schedule;
};

const ScheduleScreen: React.FC<Props> = ({ route, navigation }) => {
  const { moodType, area, budget, timeSlot } = route.params;
  const [schedule] = useState<ScheduleItem[]>([
    { 
      id: '1',
      time: '09:00', 
      activity: 'Ăn sáng', 
      location: 'Cafe ABC',
      moodType,
      area,
      budget,
      timeSlot,
      type: 'cafe'
    },
    { 
      id: '2',
      time: '14:00', 
      activity: 'Xem phim', 
      location: 'CGV Vincom',
      moodType,
      area,
      budget,
      timeSlot,
      type: 'entertainment'
    },
    { 
      id: '3',
      time: '19:00', 
      activity: 'Ăn tối', 
      location: 'Nhà hàng XYZ',
      moodType,
      area,
      budget,
      timeSlot,
      type: 'restaurant'
    },
  ]);

  const handleConfirm = () => {
    navigation.navigate('Confirmation', { schedule });
  };

  if (!area) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Vui lòng chọn khu vực</Text>
        <Button
          mode="contained"
          onPress={() => navigation.goBack()}
          style={[styles.button, styles.errorButton]}
        >
          Quay lại
        </Button>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Kế hoạch của bạn</Text>
      <Text style={styles.subtitle}>Mood: {moodType}</Text>
      <Text style={styles.subtitle}>Khu vực: {area}</Text>
      <Text style={styles.subtitle}>Ngân sách: {budget}</Text>
      <Text style={styles.subtitle}>Thời gian: {timeSlot}</Text>

      {schedule.map((item, index) => (
        <View key={index} style={styles.scheduleItem}>
          <Text style={styles.time}>{item.time}</Text>
          <Text style={styles.activity}>{item.activity}</Text>
          <Text style={styles.location}>{item.location.name}</Text>
        </View>
      ))}

      <Button
        mode="contained"
        onPress={handleConfirm}
        style={styles.button}
      >
        Xác nhận
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 5,
    color: '#666666',
  },
  scheduleItem: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
  },
  time: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF9999',
  },
  activity: {
    fontSize: 16,
    marginTop: 5,
  },
  location: {
    fontSize: 14,
    color: '#666666',
    marginTop: 5,
  },
  button: {
    marginTop: 20,
    marginBottom: 40,
    borderRadius: 25,
    backgroundColor: '#FF9999',
  },
  errorButton: {
    backgroundColor: '#FF69B4',
    alignSelf: 'center',
    width: 120,
    marginTop: 20,
    borderRadius: 24,
  },
});

export default ScheduleScreen; 