import { SetDocument, GetDocument, DeleteDocument } from "../";
import { Props } from "../../models/Cache/Accounts";
const collectionName = "Accounts";

const Set = (props: Props) => SetDocument(collectionName, props.email, props);
const Get = (props: Props) => GetDocument(collectionName, props.email);
const Delete = (props: Props) => DeleteDocument(collectionName, props.email);

export { Set, Get, Delete };
