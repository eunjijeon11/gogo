'use client';
import Image from 'next/image';
import { useSpring, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer';
import {
	Button,
	ButtonGroup,
	Card,
	CardBody,
	CardHeader,
	Divider,
} from "@nextui-org/react";
import { BiSolidRightArrow, BiSolidLeftArrow } from "react-icons/bi";
import { ChipList } from "../../components/ChipList";

const skillList = [

	"논리력",
	"사고력",
	"협동심",
];

const subjectList = [
	"정보",
	"인공지능 기초",
	"수학1",
	"수학2",
	"미적분",
	"확률과 통계",
];

function Major({ index }: { index: number }) {
	return <animated.div style={useSpring({ opacity: 1, transform: 'translateY(0)' })}>Major {index}</animated.div>;
}

function Activity({ index }: { index: number }) {
	return <animated.div style={useSpring({ opacity: 1, transform: 'translateY(0)' })}>Activity {index}</animated.div>;
}

export default function Plan() {
	const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.1 });
	const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.1 });

	const springProps1 = useSpring({
		opacity: inView1 ? 1 : 0,
		transform: inView1 ? 'translateY(0)' : 'translateY(50px)',
	});

	const springProps2 = useSpring({
		opacity: inView2 ? 1 : 0,
		transform: inView2 ? 'translateY(0)' : 'translateY(50px)',
	});

	return (
		<div>
			<section className="flex flex-row items-center h-[calc(100vh-65px)] gap-4">
				<div className="flex-1">
					<animated.div style={{ ...springProps1, display: 'flex', flexDirection: 'column' }} ref={ref1}>
						<p className="text-center text-6xl font-bold">아직 진로계획이</p>
						<p className="text-center text-6xl font-bold text-purple-500">
							뚜렷하지 않으신가요?
						</p>
						<p className="text-center text-xl text-gray-500">
							진로 추천을 받아보세요
						</p>
					</animated.div>
				</div>
				<div className="flex-1 justify-center">
					<animated.div style={{ ...springProps1, display: 'flex', justifyContent: 'center' }} ref={ref1}>
						<Image
							src="/sangibu_example.png"
							alt="Description of the image"
							width={500}
							height={500}
						/>
					</animated.div>
				</div>
			</section>

			<section className="flex flex-row items-center h-[calc(100vh-65px)] gap-4">
				<div className="flex-1">
					<animated.div style={{ ...springProps2, display: 'flex', justifyContent: 'center' }} ref={ref2}>

						<div className="w-full h-full p-4">
							<animated.div style={useSpring({ opacity: 1, transform: 'translateY(0)' })}>
								<div className="flex flex-row row-span-3 gap-4">
									<div className="flex flex-col gap-4">
										<div className="flex flex-col gap-2">
											<div className="flex flex-row items-center">
												<h1 className="text-xl font-bold">진로 추천</h1>
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
													개발자
												</CardHeader>
												<Divider />
												<CardBody>
													<p>
														컴퓨터 하드웨어, 소프트웨어, 프로그래밍 등을 개발하고 유지보수하는 직업입니다
													</p>
												</CardBody>
											</Card>
										</div>
										<ChipList title="이 진로와 관련된 과목" list={subjectList} />
										<ChipList title="이 진로와 관련된 능력" list={skillList} />
									</div>
									<Divider orientation="vertical" />
								</div>
								<div className=""></div>
							</animated.div>
						</div>
					</animated.div>
				</div>

				<div>
					<animated.div style={springProps2}>
						<p className="text-center text-6xl font-bold">생활기록부 기반</p>
						<p className="text-center text-6xl font-bold text-purple-500">관련성 높은 진로 추천</p>
						<p className="text-center text-xl text-gray-500">
							성적, 활동기반 진로 추천
						</p>
					</animated.div>
				</div>


			</section>
		</div>
	);
}
