import { SetDocument, GetDocument } from "../firebase";

const Enums = {
  Subscription: {
    guest: "guest",
    free: "free",
    pawmium: "pawmium",
  },
  Theme: {
    yellow: "yellow",
    pink: "pink",
    blue: "blue",
  },
  Mode: {
    light: "light",
    dark: "dark",
  },
};

const constants = {
  collection: "Users",
  document: "Information",
};

type Props = {
  uid: string;
  email: string;
  username: string;
  subscription: string;
  theme: string;
  mode: string;
  avatar: number;
};

const ToProps = (values: any): Props => {
  return {
    uid: values.uid,
    email: values.email,
    username: values.username,
    subscription: values.subscription,
    theme: values.theme,
    mode: values.mode,
    avatar: values.avatar,
  };
};

const documentPath = (uid: string) =>
  `${constants.collection}/${uid}/Profile/${constants.document}`;

const Get = (uid: string) => {
  if (uid === "")
    return {
      uid: "",
      email: "",
      username: "Hooman",
      subscription: Enums.Subscription.guest,
      theme: Enums.Theme.yellow,
      mode: Enums.Mode.light,
      avatar: 2,
    };
  return GetDocument(documentPath(uid)).then(async (response) => {
    console.log("Downloading Information");
    return ToProps(response!.data()!);
  });
};

const Set = async (props: Props) => {
  console.log("Uploading Information");
  if (props.uid === "") return;
  SetDocument(documentPath(props.uid), props);
};

export type { Props };
export { Enums, Set, Get };
