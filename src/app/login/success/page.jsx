'use client'

import { useSearchParams } from "next/navigation";
import { useEffect } from 'react';

const AuthSuccess = () => {

      const search = useSearchParams();
      const token = search.get('token');
      const getToken = localStorage.get('token');

      useEffect(() => {
            if (token && !getToken) {
                  
            }
      })

      return (
            <>
                  Success
            </>
      )
}

export default AuthSuccess;