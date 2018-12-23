import _ from "lodash";
import { reject } from "q";

export function checkUser(arr, item) {
  const findId = _.findIndex(arr, { email: item.email });
  if (findId === -1) {
    return { error: "User not found" };
  } else {
    if (item.password === arr[findId].password) {
      console.log("passwords match");
      let data = arr[findId];
      return { success: true, data };
    } else {
      return { error: "Email/password is incorrect" };
    }
  }
}
