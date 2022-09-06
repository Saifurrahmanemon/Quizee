import axios from 'axios';
import { useEffect, useState } from 'react';
import { TEST_URL } from '../api/Api';

const useAdmin = (user: any) => {
   const [admin, setAdmin] = useState(false);
   const [adminLoading, setAdminLoading] = useState(true);

   useEffect(() => {
      const getAdmin = async () => {
         const email = user?.email;
         if (email) {
            const res = await axios.get(`${TEST_URL}/admin/${email}`);

            if (res.status === 200) {
               console.log(res.data);
               setAdmin(res.data.admin);
               setAdminLoading(false);
            }
         }
      };

      getAdmin();
   }, [user]);

   return [admin, adminLoading];
};

export default useAdmin;
