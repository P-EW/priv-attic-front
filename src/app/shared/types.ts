export type Post = {
  _id: string;
  publisherId: string;
  textContent?: string;
  mediaContent?: string;
  date: string;
  categories?: string[];
};

export type User = {
  id: string;
  image: string;
  pseudo: string;
  firstname: string;
  lastname: string;
  email: string;
  birthDate: number;
  phone: string;
  isPrivate: boolean;
  motto?: Motto[];
  password?: string;
};

export type Motto = {
  title: string;
  content?: string;
};

export type Comment = {
  _id: string;
  postId: string;
  authorId: string;
  content: string;
  date: string;
};

export type Like = {
  _id: string;
  authorId: string;
  postId: string;
}

export type Token = {
  access_token: string;
  expiry: string;
  id: string;
}
