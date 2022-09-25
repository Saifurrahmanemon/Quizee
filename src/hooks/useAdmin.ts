import axios from 'api/AxiosPrivate';
import { User } from 'firebase/auth';
import { useEffect, useState } from 'react';

type AdminProps = User | null | undefined;

const useAdmin = (user: AdminProps) => {
  const [admin, setAdmin] = useState(false);
  const [adminLoading, setAdminLoading] = useState(true);
  useEffect(() => {
    const getAdmin = () => {
      const email = user?.email;
      if (email) {
        axios.get(`/admins/${email}`).then((res) => {
          if (res.status === 200) {
            setAdmin(res.data.admin);
          }
          setAdminLoading(false);
        });
      }
    };

    getAdmin();
  }, [user]);

  return [admin, adminLoading];
};

export default useAdmin;
