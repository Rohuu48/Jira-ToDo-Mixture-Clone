import { useCallback, useState, useEffect } from 'react';

const useWindowDimensions = () => {
  const [dimensions, updateDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  const onResize = useCallback(() => {
    updateDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }, []);

  useEffect(() => {
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [onResize]);

  return {
    dimensions
  };
};

export default useWindowDimensions;
