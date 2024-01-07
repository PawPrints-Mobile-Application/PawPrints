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
  data: `
      uid TEXT PRIMARY KEY NOT NULL UNIQUE,
      email TEXT,
      username TEXT,
      subscription TEXT,
      theme TEXT,
      mode TEXT
      `,
  supports: ["cloud"],
};

type Props = {
  uid: string;
  email: string;
  username: string;
  subscription: string;
  theme: string;
  mode: string;
};

const ToProps = (values: any): Props => {
  return {
    uid: values.uid,
    email: values.email,
    username: values.username,
    subscription: values.subscription,
    theme: values.theme,
    mode: values.mode,
  };
};

const documentPath = (uid: string) =>
  `${constants.collection}/${uid}/Profile/${constants.document}`;

const Get = (uid: string) =>
  GetDocument(documentPath(uid)).then(async (response) => {
    console.log("Downloading Information");
    return ToProps(response!.data()!);
  });

const Set = async (props: Props) => {
  console.log("Uploading Information");
  SetDocument(documentPath(props.uid), props);
};

export type { Props };
export { Enums, Set, Get };
