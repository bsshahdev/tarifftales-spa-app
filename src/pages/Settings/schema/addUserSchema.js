import * as yup from "yup";

const emailRules = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const addUserSchema = yup.object().shape({
  firstName: yup.string().required("First name required"),
  email: yup
    .string()
    .required("Email required")
    .matches(emailRules, { message: "Not valid email" }),
  roles: yup
    .array()
    .of(yup.number().required("Select at least one role")),
  password: yup
    .string()
    .required("Password Required !"),
  reEnterdPassword: yup
    .string()
    .oneOf([yup.ref("password") || null], "Passwords must match")
    .required("Confirm-Password Required !"),
    roleNames: yup.string(),
  location: yup.string(),
});
