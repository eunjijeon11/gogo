'use client';
import { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer';

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
          <animated.div style={springProps1} ref={ref1}>
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
          <div className="w-[100] h-80 bg-slate-300" />
        </div>
      </section>

      <section className="flex flex-row items-center h-[calc(100vh-65px)] gap-4">
        <div className="flex-1 justify-center">
          <div className="w-[100] h-80 bg-slate-300" />
        </div>
        <div className="flex-1">
          <animated.div style={springProps2} ref={ref2}>
            <p className="text-center text-6xl font-bold">생활기록부 기반</p>
            <p className="text-center text-6xl font-bold text-purple-500">
              관련성 높은 진로 추천
            </p>
          </animated.div>
        </div>
      </section>
    </div>
  );
}
