import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    // Required Field Validation
    .required("Email is required")
    // Format Validation
    .email("Invalid email address format"),

  password: Yup.string()
    .required("Password is required")
    //Minimum Character Validation
    .min(6, "Password must be 6 characters at minimum"),
});

export const SignUpSchema = Yup.object().shape({
  fullName: Yup.string().required("Fullname is required"),
  email: Yup.string().required("Email is required").email("Email is invalid"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(40, "Password must not exceed 40 characters"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), null], "Confirm Password does not match"),
});

export const ToDoSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
});
