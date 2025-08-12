
import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface ClickTrackingData {
  linkId: string;
  userId: string;
  clickSource?: string;
}

interface DeviceInfo {
  device_type: string;
  browser: string;
  os: string;
}

const getDeviceInfo = (): DeviceInfo => {
  const userAgent = navigator.userAgent;
  
  // Detect device type
  let device_type = 'desktop';
  if (/iPhone|iPad|iPod|Android/i.test(userAgent)) {
    device_type = 'mobile';
  } else if (/iPad/i.test(userAgent)) {
    device_type = 'tablet';
  }
  
  // Detect browser
  let browser = 'unknown';
  if (userAgent.includes('Chrome')) browser = 'Chrome';
  else if (userAgent.includes('Firefox')) browser = 'Firefox';
  else if (userAgent.includes('Safari')) browser = 'Safari';
  else if (userAgent.includes('Edge')) browser = 'Edge';
  else if (userAgent.includes('Opera')) browser = 'Opera';
  
  // Detect OS
  let os = 'unknown';
  if (userAgent.includes('Windows')) os = 'Windows';
  else if (userAgent.includes('Mac')) os = 'macOS';
  else if (userAgent.includes('Linux')) os = 'Linux';
  else if (userAgent.includes('Android')) os = 'Android';
  else if (userAgent.includes('iOS')) os = 'iOS';
  
  return { device_type, browser, os };
};

const getLocationInfo = async () => {
  try {
    // Using a free IP geolocation service
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    
    return {
      country: data.country_name || null,
      city: data.city || null,
      region: data.region || null,
      ip_address: data.ip || null,
    };
  } catch (error) {
    console.error('Error getting location info:', error);
    return {
      country: null,
      city: null,
      region: null,
      ip_address: null,
    };
  }
};

export const useClickTracking = () => {
  const trackClickMutation = useMutation({
    mutationFn: async ({ linkId, userId, clickSource = 'bio_page' }: ClickTrackingData) => {
      const deviceInfo = getDeviceInfo();
      const locationInfo = await getLocationInfo();
      
      const clickData = {
        link_id: linkId,
        user_id: userId,
        click_source: clickSource,
        user_agent: navigator.userAgent,
        referer: document.referrer || null,
        ...deviceInfo,
        ...locationInfo,
      };
      
      console.log('Tracking click with data:', clickData);
      
      const { error } = await supabase
        .from('link_clicks')
        .insert(clickData);
      
      if (error) {
        console.error('Error tracking click:', error);
        throw error;
      }
    },
    onError: (error) => {
      console.error('Click tracking failed:', error);
    },
  });
  
  const trackClick = (linkId: string, userId: string, clickSource?: string) => {
    trackClickMutation.mutate({ linkId, userId, clickSource });
  };
  
  return {
    trackClick,
    isTracking: trackClickMutation.isPending,
  };
};
