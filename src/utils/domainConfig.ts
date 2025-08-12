
/**
 * Domain configuration utility
 * Automatically detects the current domain and provides the base URL
 */
export const getDomainConfig = () => {
  // Get the current domain from window.location
  const currentDomain = typeof window !== 'undefined' ? window.location.origin : '';
  
  return {
    baseUrl: currentDomain,
    profileBaseUrl: `${currentDomain}/u/`,
  };
};

export const getProfileUrl = (username: string) => {
  const { profileBaseUrl } = getDomainConfig();
  return `${profileBaseUrl}${username}`;
};
