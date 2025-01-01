import { useDispatch } from "react-redux";
import { addUserSchema } from "../schema";
import { addUsersData } from "../../../store/Settings/actions";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const useAddUser = (state) => {
  const dispatch = useDispatch();
  const { settings_users_data } = useSelector((state) => state.settings);
  const navigate = useNavigate();

  const currUserData = Array.isArray(settings_users_data.content) && settings_users_data.content.find((user) => user.id === state?.id) || {};

  const initialValues = {
    firstName: currUserData?.firstName || "",
    lastName: currUserData?.lastName || "",
    email: currUserData?.email || "",
    roles: currUserData?.roles || [],
    password: currUserData?.password || "",
    reEnterdPassword: currUserData?.password || "",
    roleNames: currUserData?.roleNames || "",
    location: "",
  };

  const handleAddUser = async (values, { resetForm }) => {
    console.log("hey I am add user:-", values);

    const payload = {
      ...(Object.keys(currUserData).length ? { id: currUserData.id, version: currUserData.version } : {}),
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      ...(!(state?.id) && {
        password: values.password,
      }),
      roles: values.roles,
      status: "ACTIVE",
    };

    dispatch(addUsersData(payload));
    resetForm();
    navigate('/settings/users');
  };

  return {
    initialValues,
    schema: addUserSchema,
    handleAddUser,
  };
};

export default useAddUser;
