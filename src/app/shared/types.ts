export type Post = {
  _id: string;
  publisherId: string;
  textContent?: string;
  mediaContent?: string;
  date: string;
  categories?: string[];
};

export type User = {
  image: string;
  pseudo: string;
  firstname: string;
  lastname: string;
  email: string;
  birthdate: Date;
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
