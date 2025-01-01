import * as yup from "yup";

const emailRules = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
export const comapanySchema = yup.object().shape({
  image: yup.string(),
  companyName: yup.string().required("Company name required"),
  contactNumber: yup
    .string()
    .required("Contact number required")
    .matches(phoneRegExp, "Contact number is not valid")
    .min(10, "Contact number must be at least 10 characters"),
  email: yup
    .string()
    .required("Email required")
    .matches(emailRules, { message: "Not valid email" }),
  companyAddress: yup.string().required("Company address required"),
  city: yup.string(),
  state: yup.string(),
  zipcode: yup.string(),
  country: yup.string(),
});
