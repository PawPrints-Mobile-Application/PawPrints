import { AuthState } from ".";

export default async () => {
    console.log(`${window.localStorage.getItem('username')} has disconnected!`);
    window.localStorage.setItem('auth', AuthState[0]);
    window.localStorage.setItem('userID', '');
    window.localStorage.setItem('username', '');
    window.localStorage.setItem('email', '');
  };