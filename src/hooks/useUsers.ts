import axios from 'api/AxiosPrivate';
import auth from 'config/firebase.init';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);

  useEffect(() => {
    setLoading(true);
    const getQuiz = async () => {
      const res = await axios.get(`/users/${user?.email}`);
      if (res.status === 200) {
        setUsers(res.data);
      }
      setLoading(false);
    };

    getQuiz();
  }, []);

  return { users, loading };
}

export default useUsers;
