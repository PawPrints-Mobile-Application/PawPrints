import {
  CreateTable,
  DeleteTable,
  ResetTable,
  InsertRowData,
  ReadFirstRow,
} from "../sqlite";
import { SetDocument, GetDocument } from "../firebase";
import ObjectToMap from "../../utils/ObectToMap";
import EnumConstructor from "../../utils/EnumConstructor";

class Theme extends EnumConstructor {
  light: "light" = "light";
  dark: "dark" = "dark";

  constructor() {
    super(["light", "dark"]);
  }
}

class Length extends EnumConstructor {
  meter: "meter" = "meter";
  feet: "feet" = "feet";

  constructor() {
    super(["meter", "feet"]);
  }
}

class Weight extends EnumConstructor {
  kilogram: "kilogram" = "kilogram";
  pound: "pound" = "pound";

  constructor() {
    super(["kilogram", "pound"]);
  }
}

class Temperature extends EnumConstructor {
  celsius: "celsius" = "celsius";
  fahrenheit: "fahrenheit" = "fahrenheit";

  constructor() {
    super(["celsius", "fahrenheit"]);
  }
}

const Enums = { Theme, Length, Weight, Temperature };

const constants = {
  collection: "Users",
  document: "Preferences",
  data: `
  theme TEXT,
  length TEXT,
  weight TEXT,
  temperature TEXT
    `,
};

type Props = {
  theme: "light" | "dark";
  length: "meter" | "feet";
  weight: "kilogram" | "pound";
  temperature: "celsius" | "fahrenheit";
};

const defaults: Props = {
  theme: "light",
  length: "meter",
  weight: "kilogram",
  temperature: "celsius",
};

const documentPath = (uid: string) =>
  `${constants.collection}/${uid}/Profile/${constants.document}`;

const CreateModel = () => CreateTable(constants.document, constants.data);
const DeleteModel = () => DeleteTable(constants.document);
const Clear = () => ResetTable(constants.document);

const Get = () =>
  ReadFirstRow(constants.document).then((response) => response.values![0]);

const Set = async (props: Props, uid?: string) => {
  const data = ObjectToMap(props);
  if (!!uid) await SetDocument(documentPath(uid), props);
  return InsertRowData(constants.document, {
    keys: Array.from(data.keys()),
    values: Array.from(data.values()),
  }).then(() => props);
};

const Sync = async (uid: string) =>
  GetDocument(documentPath(uid)).then(async (response) => {
    console.log("syncing...");
    const data = ObjectToMap(response!.data()!);
    return InsertRowData(
      constants.document,
      {
        keys: Array.from(data.keys()),
        values: Array.from(data.values()),
      },
      true
    ).then(Get);
  });

export type { Props };
export { Enums, CreateModel, DeleteModel, Clear, Set, Get, Sync, defaults };
