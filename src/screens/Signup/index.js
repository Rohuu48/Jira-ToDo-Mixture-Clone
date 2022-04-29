import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import { SignUpSchema } from "common/validationSchema";
import FormManager from "components/FormManager";
import { signUpUser } from "actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import useAlert from "hooks/useAlert";
import { useCallback } from "react";

const SignUp = () => {
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

  const signup = (values) => {
    dispatch(signUpUser(allUsers, values, callback));
  };

  return (
    <FormManager
      style={{ height: "100vh" }}
      initialValues={{}}
      validationSchema={SignUpSchema}
      onSubmit={(values) => {
        signup(values);
      }}
    >
      {({ formik, errorSection }) => (
        <VStack spacing={4} align="flex-start">
          <FormControl>
            <FormLabel htmlFor="fullName">Full Name</FormLabel>
            <Input
              id="fullName"
              name="fullName"
              type="fullName"
              variant="filled"
              onChange={formik.handleChange}
              value={formik.values.fullName}
            />
            {errorSection("fullName")}
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="fullName">Username</FormLabel>
            <Input
              id="username"
              name="username"
              type="username"
              variant="filled"
              onChange={formik.handleChange}
              value={formik.values.username}
            />
            {errorSection("username")}
          </FormControl>
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
          <FormControl>
            <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="confirmPassword"
              variant="filled"
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
            />
            {errorSection("confirmPassword")}
          </FormControl>
          <Button type="submit" colorScheme="purple">
            {isLoading ? <Spinner color="white.500" /> : "Sign up"}
          </Button>
        </VStack>
      )}
    </FormManager>
  );
};

export default SignUp;
