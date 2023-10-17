export default async () => {
    console.log(`${window.localStorage.getItem('username')} has disconnected!`);
    window.localStorage.setItem('auth', 'false');
    window.localStorage.setItem('userID', '');
    window.localStorage.setItem('username', '');
    window.localStorage.setItem('email', '');
  };