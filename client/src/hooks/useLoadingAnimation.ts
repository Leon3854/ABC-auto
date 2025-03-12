import {useEffect, useRef} from 'react'

const useLoadingAnimation = (): React.RefObject<HTMLDivElement> => {
  const iconRef = useRef<HTMLDivElement>(null);
  let rotation = 0;

  const animate = () => {
    rotation += 2;
    if (iconRef.current) {
      iconRef.current.style.transform = `rotate(${rotation}deg)`;
    }
    requestAnimationFrame(animate);
  };

  useEffect(() => {
    animate();
    return () => {
      // Очистка при размонтировании, если нужно
    };
  }, []);

  return iconRef;
};

export default useLoadingAnimation;