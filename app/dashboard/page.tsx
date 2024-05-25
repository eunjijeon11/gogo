import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Input,
  Spacer,
} from "@nextui-org/react";
import { BiSolidRightArrow, BiSolidLeftArrow } from "react-icons/bi";
import { IoMdMail } from "react-icons/io";
import { ChipList } from "../../components/ChipList";

const careerList = [
  "컴퓨터교사",
  "IT기업",
  "대학원",
  "백수",
  "하하하",
  "등등등",
];

const subjectList = [
  "정보",
  "인공지능 기초",
  "수학1",
  "수학2",
  "미적분",
  "확률과 통계",
];

export default function DashboardPage() {
  return (
    <div className="grid gap-2 grid-cols-3 grid-rows-3 w-full h-[calc(100vh-65px)] p-4">
      <div className="flex flex-row row-span-3 gap-4">
        <div className="flex flex-col gap-4">
          <Major index={0} />
          <ChipList title="이 학과와 관련된 진로" list={careerList} />
          <ChipList title="이 학과와 관련된 과목" list={subjectList} />
        </div>
        <Divider orientation="vertical" />
      </div>
      <div className="flex flex-col row-span-2 col-span-2 px-2 gap-2">
        <div className="flex flex-row items-center">
          <h1 className="text-xl font-bold">후속 활동 추천</h1>
          <div className="grow" />
          <ButtonGroup>
            <Button isIconOnly color="transparent">
              <BiSolidLeftArrow />
            </Button>
            <Button isIconOnly color="transparent">
              <BiSolidRightArrow />
            </Button>
          </ButtonGroup>
        </div>
        <div className="flex flex-grow flex-row gap-4">
          <Activity index={0} />
          <Activity index={1} />
        </div>
      </div>
      <div className="flex flex-col p-2 gap-2">
        <h1 className="text-xl font-bold">관련 도서 추천</h1>
        <div className="flex flex-grow flex-row gap-6">
          <Book />
          <Book />
          <Book />
        </div>
      </div>
      <div className="flex flex-col p-2 gap-2">
        <h1 className="text-xl font-bold">이 학과에 관심이 있나요?</h1>
        <div className="flex-grow flex flex-col justify-center items-center">
          <p>뉴스레터를 정기적으로 구독해보세요.</p>
          <Spacer y={2} />
          <Input
            type="email"
            placeholder="junior@example.com"
            className="max-w-[250px]"
            endContent={<IoMdMail className="text-2xl text-default-400" />}
          />
        </div>
      </div>
    </div>
  );
}

const Book = () => {
  return <div className="w-24 h-full bg-slate-300" />;
};

const Activity: React.FunctionComponent<{ index: number }> = ({ index }) => {
  return (
    <Card className="w-[500px]" shadow="sm">
      <CardHeader>1. 경사하강법을 조사하여 발표하기</CardHeader>
      <Divider />
      <CardBody>
        <h2 className="font-bold">기존 활동</h2>
        <p>
          인공지능을 머신러닝과 딥러닝으로 나누어 설명하고 회귀에 대해 설명함.
        </p>
        <Spacer y={2} />
        <h2 className="font-bold">후속 활동</h2>
        <p>
          경사하강법을 사용해 선형회귀를 하는 방법을 조사하여 발표합니다. 함수의
          미분과 연관지어 설명하면 좋아요.
        </p>
        <Spacer y={2} />
        <h2 className="font-bold">관련 교과목</h2>
        <p>수학1, 미적분</p>
      </CardBody>
    </Card>
  );
};

const Major: React.FunctionComponent<{ index: number }> = ({ index }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row items-center">
        <h1 className="text-xl font-bold">학과 추천</h1>
        <div className="grow" />
        <ButtonGroup>
          <Button isIconOnly color="transparent">
            <BiSolidLeftArrow />
          </Button>
          <Button isIconOnly color="transparent">
            <BiSolidRightArrow />
          </Button>
        </ButtonGroup>
      </div>
      <Card shadow="sm">
        <CardHeader className="text-purple-500 dark:text-purple-300 bg-purple-100 dark:bg-default">
          컴퓨터교육과
        </CardHeader>
        <Divider />
        <CardBody>
          <p>
            컴퓨터 하드웨어, 소프트웨어, 프로그래밍 등의 전문 지식과 교육학 이론
            및 실제를 겸비한 정보 교육 전문가를 양성하는 학과입니다.
          </p>
        </CardBody>
      </Card>
    </div>
  );
};
