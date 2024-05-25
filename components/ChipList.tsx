import { Chip } from "@nextui-org/react";

export const ChipList: React.FunctionComponent<{
  title: string;
  list: string[];
}> = ({ title, list }) => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-xl font-bold">{title}</h1>
      <div className="flex flex-wrap gap-2">
        {list.map((value) => (
          <Chip
            key="value"
            classNames={{
              base: "bg-purple-100 dark:bg-default",
              content: "text-purple-500 dark:text-purple-300",
            }}
          >
            {value}
          </Chip>
        ))}
      </div>
    </div>
  );
};
