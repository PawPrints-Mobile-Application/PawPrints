import { AuthType } from ".";

export default async () => {
    console.log(`${window.localStorage.getItem('authUsername')} has disconnected!`);
    window.localStorage.setItem('authType', AuthType[0]);
    window.localStorage.setItem('authID', '');
    window.localStorage.setItem('authUsername', '');
    window.localStorage.setItem('authEmail', '');
  };