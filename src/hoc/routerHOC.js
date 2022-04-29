import { useLocation, useNavigate, useParams } from 'react-router-dom';

//withRouter has been discontinued from react router v6. This HOC mimics the withRouter functionality.

const routerHOC = (Component) => {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp;
};

export { routerHOC };
