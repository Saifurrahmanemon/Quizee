import axios from 'axios';
import { UserCredential } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { TEST_URL } from '../api/Api';

export type UserProps = UserCredential | null | undefined;

const useToken = (user: UserProps) => {
   const [token, setToken] = useState('');
   console.log(user);
   useEffect(() => {
      const getToken = async () => {
         const info = user?.user;
         const email = info?.email;
         const userInfo = {
            email,
            name: info?.displayName,
         };

         if (email) {
            const res = await axios.put(`${TEST_URL}/users/${email}`, userInfo);
            console.log(res);
            // set token to state to get access
            setToken(res.data.accessToken);
            localStorage.setItem('accessToken', res.data.accessToken);
         }
      };
      getToken();
   }, [user]);
   return [token];
};

export default useToken;
