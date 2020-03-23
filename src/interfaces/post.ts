export interface Post {
  id: string;
  title: string;
  body: string;
  distance?: number;
  latitude?: number;
  longitude?: number;
  user?: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
  type: {
    id: string;
    name: string;
  };
  image?: string;
  comment: [];
  comments: [] | number;
  created_at: number;
}
