import Users from "./dummyusers";
import Tweets from "./dummytweets";
import { ApiCall } from "config/api";
import { checkUser } from "utils/utils";

export const ApiCallForLogin = params => {
  return new Promise((resolve, reject) => {
    let data = params.data;
    const isUser = checkUser(Users, data);
    if (isUser) {
      if (isUser.success) {
        resolve(isUser.data);
      } else {
        reject(isUser.error);
      }
    } else {
      reject({ error: "No user found" });
    }
  });
};
