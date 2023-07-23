'use client';

import { getMobileOperatingSystem } from '@/utils/getMobileOperatingSystem';
import { peekTime, tickTime } from '@/utils/timeCounter';
import { useEffect, useRef, useState } from 'react';

let shaking: { x: number; y: number; z: number } | undefined;

function normalize(x: number, y: number, z: number) {
  const len = Math.hypot(x, y, z);
  return [x / len, y / len, z / len];
}

const Group = () => {
  const [motion1, setMotion1] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  const motion2 = useRef({
    x: 0,
    y: 0,
    z: 0,
  });

  const [count, setCount] = useState(0);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const hypot = Math.hypot(motion1.x, motion1.y, motion1.z);

    if (hypot > 30) {
      if (shaking) {
        const [a, b, c] = normalize(motion1.x, motion1.y, motion1.z);
        const [d, e, f] = normalize(shaking.x, shaking.y, shaking.z);

        if (Math.abs(a * d + b * e + c * f) < 0.3) {
          shaking = undefined;
        }
      }
      if (!shaking) {
        shaking = {
          x: motion1.x,
          y: motion1.y,
          z: motion1.z,
        };
        setCount(count + 1);
        tickTime();
        setTime(Math.round(peekTime()));
      }
    } else if (hypot < 20) {
      shaking = undefined;
    }

    // Update new position
    motion2.current = {
      x: motion1.x,
      y: motion1.y,
      z: motion1.z,
    };
  }, [motion1, count]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(Math.round(peekTime()));
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleRequestMotion = async () => {
    const mobile = getMobileOperatingSystem();
    if (mobile === 'iOS') {
      if (typeof (DeviceMotionEvent as any).requestPermission === 'function') {
        (DeviceMotionEvent as any)
          .requestPermission()
          .then((permissionState: any) => {
            if (permissionState === 'granted') {
              window.addEventListener('devicemotion', (e: any) => {
                setMotion1({
                  x: e.accelerationIncludingGravity.x,
                  y: e.accelerationIncludingGravity.y,
                  z: e.accelerationIncludingGravity.z,
                });
              });
            }
          })
          .catch(console.error);
      } else {
        // handle regular non iOS 13+ devices
        console.log('Not Supported');
      }
    } else {
      window.addEventListener('devicemotion', (e: any) => {
        setMotion1({
          x: e.accelerationIncludingGravity.x,
          y: e.accelerationIncludingGravity.y,
          z: e.accelerationIncludingGravity.z,
        });
      });
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center text-9xl font-bold">
      {count}
      <button
        className="fixed bottom-0 w-full rounded-t-lg bg-blue-500 px-4 py-2 text-center text-base font-normal text-white hover:bg-blue-700"
        onClick={handleRequestMotion}
      >
        สำหรับ IOS ถ้าเขย่าแล้วคะแนนไม่เพิ่ม ให้กดปุ่มนี้
      </button>
    </div>
  );
};

export default Group;
