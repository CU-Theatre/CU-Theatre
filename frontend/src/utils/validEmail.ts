import { EMAIL_REGEX } from "./globalVariables";

export const validEmail = (email: string) => {
  if (!EMAIL_REGEX.test(email)) {
    return "Enter your email";
  }

  return true;
};