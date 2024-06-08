import { ResultType } from "@/types/result";
import { DreamType } from "@/types/nodream";
import { atom } from "recoil";

export const resultState = atom<ResultType[]>({
  key: "resultState", // unique ID (with respect to other atoms/selectors)
  default: [
    {
      major: {
        majorName: "정보가 없습니다.",
        description: "",
      },
      careers: [],
      subjects: [],
      activities: [
        {
          title: "정보가 없습니다.",
          existing: "",
          followup: "",
          subjects: "",
        },
      ],
      books: [
        {
          url: "",
          imgUrl: "",
        },
      ],
    },
  ], // default value (aka initial value)
});

export const dreamselector = atom<DreamType[]>({
  key: "dreamselector",
  default: [
    {
      Careers: {
        Careername: "",
        description: "",
      },
      subjects: [],
      skills: [],
    }
  ],
});