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
  comment: [];
  comments: any;
  created_at: number;
}
