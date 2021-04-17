// user
export type User = {
  pk: number;
  username: string;
  email: string;
  name: string;
  picture: string;
  intro: string;
  is_superuser: boolean;
};

export type Plat = {
  name: string;
  slug: string;
};

export type SearchList = {
  mercari: [Search];
  rakuma: [Search];
  yahoo: [Search];
};

export type Search = {
  image: string;
  price: string;
  name: string;
  sold: boolean;
  href: string;
};

export type Wanted = {
  slug: string;
  want_name: string;
  want_intro: string;
  want_price: number;
  plat: [Plat];
  user: User; // User type
  posted: string;
  is_gotten: boolean;
  picture: string;
};

export interface headData {
  title?: string;
  ogtypeWebsite?: string;
  ogimage?: string;
  ogtitle?: string;
  ogdescription?: string;
  seodescription?: string;
}
