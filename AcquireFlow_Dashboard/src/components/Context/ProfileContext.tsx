import React, { useState, createContext, useContext } from 'react';
type ProfileContextType = {
  profileImage: string | null;
  setProfileImage: (image: string | null) => void;
};
const defaultProfileImage = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';
const ProfileContext = createContext<ProfileContextType>({
  profileImage: defaultProfileImage,
  setProfileImage: () => {}
});
export const ProfileProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [profileImage, setProfileImage] = useState<string | null>(defaultProfileImage);
  return <ProfileContext.Provider value={{
    profileImage,
    setProfileImage
  }}>
      {children}
    </ProfileContext.Provider>;
};
export const useProfile = () => useContext(ProfileContext);