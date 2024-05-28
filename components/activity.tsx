import { ActivityType } from "@/types/result";
import { Card, CardBody, CardHeader, Divider, Spacer } from "@nextui-org/react";

export const ActivityCard: React.FunctionComponent<{
  activity: ActivityType;
}> = ({ activity }) => {
  return (
    <Card className="w-[500px]" shadow="sm">
      <CardHeader className="dark:text-purple-300 bg-purple-100 dark:bg-default">
        {activity.title}
      </CardHeader>
      <Divider />
      <CardBody>
        <h2 className="font-bold dark:text-purple-300">기존 활동</h2>
        <p>{activity.existing}</p>
        <Spacer y={2} />
        <h2 className="font-bold dark:text-purple-300">후속 활동</h2>
        <p>{activity.followup}</p>
        <Spacer y={2} />
        <h2 className="font-bold dark:text-purple-300">관련 교과목</h2>
        <p>{activity.subjects}</p>
      </CardBody>
    </Card>
  );
};
