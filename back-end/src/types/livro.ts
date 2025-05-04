export type Livro = {
  id?: string;
  author: {
    id: string;
    name: string;
  }[];
  authorId: string;
  name: string;
  description: string;
};
