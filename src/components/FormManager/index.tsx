/* eslint-disable camelcase */
import React from "react";
import * as Yup from "yup";
import { useFormik, FormikProps } from "formik";
import { Box, Flex } from "@chakra-ui/react";
import "./formManager.scss";

type FormManagerProps = React.InputHTMLAttributes<HTMLInputElement> & {
  initialValues: object;
  validationSchema: any;
  onSubmit: () => void;
  className?: string;
  children: JSX.Element;
  error_msg_className?: string;
};

interface FormValues {
  initialValues: object;
  validationSchema: any;
  onSubmit: (event: React.MouseEvent<HTMLElement>) => void;
}

const FormManager = ({
  initialValues,
  validationSchema,
  onSubmit,
  className,
  children,
  error_msg_className,
  style,
  ...rest
}: FormManagerProps) => {
  const formik: FormikProps<FormValues> = useFormik<FormValues>({
    initialValues,
    validationSchema,
    onSubmit,
    ...rest,
  });
  const errorSection = (name: string) => {
    return (
      formik &&
      formik.errors[name] && (
        <p className="error_msg error_msg_className">{formik.errors[name]}</p>
      )
    );
  };
  return (
    <Flex bg="gray.100" align="center" justify="center" style={style}>
      <Box bg="white" p={6} rounded="md" w="70vw">
        <form onSubmit={formik.handleSubmit}>
          {children({ formik, errorSection })}
        </form>
      </Box>
    </Flex>
  );
};
export default FormManager;
