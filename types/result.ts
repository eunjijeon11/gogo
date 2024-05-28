export type ResultType = {
  major: {
    majorName: string;
    description: string;
  };
  careers: string[];
  subjects: string[];
  activities: ActivityType[];
  books: BookType[];
};

export type ActivityType = {
  title: string;
  existing: string;
  followup: string;
  subjects: string;
};

export type BookType = {
  url: string;
  imgUrl: string;
};
