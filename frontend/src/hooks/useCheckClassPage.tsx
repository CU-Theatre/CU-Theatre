import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';


const useCheckClassPage = (setClassPage: React.Dispatch<React.SetStateAction<boolean>>) => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/classes') {
      setClassPage(true);
    } else {
      setClassPage(false);
    }
  }, [location.pathname, setClassPage]);
};

export default useCheckClassPage;