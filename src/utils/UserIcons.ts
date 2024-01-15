import user_0 from "../assets/users/user_0.png";
import user_1 from "../assets/users/user_1.png";
import user_2 from "../assets/users/user_2.svg";
import user_3 from "../assets/users/user_3.svg";
import user_4 from "../assets/users/user_4.svg";
import user_5 from "../assets/users/user_5.svg";
import user_6 from "../assets/users/user_6.svg";
import user_7 from "../assets/users/user_7.svg";
import user_8 from "../assets/users/user_8.svg";
import user_9 from "../assets/users/user_9.svg";
import user_10 from "../assets/users/user_10.svg";

const entries = [
  user_0,
  user_1,
  user_2,
  user_3,
  user_4,
  user_5,
  user_6,
  user_7,
  user_8,
  user_9,
  user_10,
];

const get = (value: string | number) => {
  const temp = Number(value);
  if (!temp || (temp < 0 && temp > 10)) return undefined;
  return entries[temp];
};

export default { entries, get };
