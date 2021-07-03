import { UserConst } from "../Const/userConst";
export const BlogReducer = (state, { type, payload }) => {
  switch (type) {
    case UserConst.ON_USERS_LIST_LOADING:
      return { ...state, users: [], loading: true, error: false };
    case UserConst.ON_USERS_LIST_FAIL:
      return { ...state, users: [], loading: false, error: true };
    case UserConst.ON_USERS_LIST_SUCCESS:
      return { ...state, users: payload, loading: false, error: false };
    case UserConst.ON_USER_ADD_LOADING:
      return { ...state, loading: true, error: false };
    case UserConst.ON_USER_ADD_FAIL:
      return { ...state, loading: false, error: true };
    case UserConst.ON_USER_ADD_SUCCESS:
      return { ...state, users: payload };
    case UserConst.ON_USER_REMOVE:
      const newUserList = state.users.filter((user) => user.id !== payload);
      return { ...state, users: newUserList };
    default:
      return state;
  }
};
