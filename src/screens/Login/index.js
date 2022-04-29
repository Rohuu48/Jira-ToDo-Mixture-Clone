import { useCallback } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import { LoginSchema } from "../../common/validationSchema";
import FormManager from "../../components/FormManager";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "actions/auth";
import useAlert from "hooks/useAlert";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const allUsers = useSelector((state) => state.auth?.allUsers || []);
  const isLoading = useSelector((state) => state.auth?.loading || false);

  const callback = useCallback((flagData, flagStatus) => {
    if (flagStatus === "failure") {
      showAlert({ status: "error", description: flagData });
    } else {
      navigate("/dashboard");
      showAlert({ status: "success", description: flagData });
    }
  }, []);

  const login = (values) => {
    dispatch(loginUser(allUsers, values, callback));
  };

  return (
    <FormManager
      style={{ height: "100vh" }}
      initialValues={{}}
      validationSchema={LoginSchema}
      onSubmit={(values) => {
        login(values);
      }}
    >
      {({ formik, errorSection }) => (
        <VStack spacing={4} align="flex-start">
          <FormControl>
            <FormLabel htmlFor="email">Email Address</FormLabel>
            <Input
              id="email"
              name="email"
              type="email"
              variant="filled"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {errorSection("email")}
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              name="password"
              type="password"
              variant="filled"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {errorSection("password")}
          </FormControl>
          <Button type="submit" colorScheme="purple">
            {isLoading ? (
              <Spinner data-testid="activity_indicator" color="white.500" />
            ) : (
              "Login"
            )}
          </Button>
        </VStack>
      )}
    </FormManager>
  );
};

export default Login;
