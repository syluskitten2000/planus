export interface Location {
  id: string;
  name: string;
  address: string;
  area: string;
  type: string;
  priceRange: string;
  openTime: string;
  closeTime: string;
  rating: number;
  reviews: number;
  images: string[];
  description: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export interface Area {
  id: string;
  name: string;
  locations: Location[];
} 