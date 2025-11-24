import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const smoothScroll = (sectionId) => {
  const target = document.getElementById(sectionId);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

const useNavigationHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = useCallback(
    (link) => {
      if (link.sectionId) {
        if (location.pathname !== '/') {
          navigate('/', { state: { scrollTo: link.sectionId } });
        } else {
          smoothScroll(link.sectionId);
        }
        return;
      }

      if (link.path) {
        if (link.path === location.pathname) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          navigate(link.path);
        }
      }
    },
    [location.pathname, navigate]
  );

  return handleNavigation;
};

export default useNavigationHandler;


