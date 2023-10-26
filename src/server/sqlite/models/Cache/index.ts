import AccountsModel from "./Accounts";
import LoginHistoryModel from "./LoginHistory";

const dbName = 'Guest';
const models = [AccountsModel, LoginHistoryModel];

export default {
    dbName: dbName,
    models: models
};
