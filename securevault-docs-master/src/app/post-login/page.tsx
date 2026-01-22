'use client'

import { useEffect } from 'react'

export default function PostLogin() {
  useEffect(() => {
    // DEV: auto-provision a throwaway org and redirect to an overview
    const v = (process.env.NEXT_PUBLIC_APP_NAME && process.env.NODE_ENV !== 'production');
    const org = 'org_demo';
    const target = `/org/${org}/overview`;

    window.location.replace(target);
  }, [])

  return null
}

