
import { useMemo } from 'react';
import { getDomainConfig, getProfileUrl } from '@/utils/domainConfig';

export const useDomain = () => {
  const domainConfig = useMemo(() => getDomainConfig(), []);
  
  return {
    baseUrl: domainConfig.baseUrl,
    profileBaseUrl: domainConfig.profileBaseUrl,
    getProfileUrl,
  };
};
