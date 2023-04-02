// eslint-disable-next-line import/no-extraneous-dependencies
// import '@testing-library/jest-dom/extend-expect';

declare module '*.png';
declare module '*.svg';

type EstateType = {
  id: string;
  currency?: string;
  category?: string;
  department?: string;
  description?: string;
  estate_name: string;
  floors?: string;
  operation_type: 'rent' | 'sale';
  price?: string;
  tag?: string;
  total_area?: string;
  total_built_area?: string;
  youtube_video?: string;
  address?: string;
  currency?: string;
  department?: string;
  estate_images?: Array<string>;
  profile_image?: string;
  bedrooms?: string;
  toilets?: string;
  garages?: string;
};
type TagsType = { name: string };
type CurrencyType = { name: string };
type CategoryType = { name: string };

type SelectorsType = {
  estates: Array<ProductType>;
  tags: Array<TagsType>;
  currencies: Array<CurrencyType>;
  categories: Array<CategoryType>;
};
