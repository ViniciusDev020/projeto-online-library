export type Book = {
  id?: string;
  name: string;
  description: string;
  author: {
    name: string;
  };
  authorId: string;
};

export type BookCreate = {
  id?: string;
  name: string;
  description: string;
  authorId: string;
};

export type BookUpdate = {
  id?: string;
  name?: string;
  description?: string;
};
