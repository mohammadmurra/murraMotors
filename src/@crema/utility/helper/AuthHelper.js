import {authRole} from '../../../shared/constants/AppConst';

export const getUserFromAuth0 = (user) => {
  if (user)
    return {
      id: 1,
      uid: user.sub,
      displayName: user.name,
      email: user.email,
      photoURL: user.picture,
      role: authRole.user,
    };
  return user;
};

export const getUserFromFirebase = (user) => {
  console.log(user.user);
  if (user)
    return {
      id: 1,
      uid: user.user.uid,
      displayName: user.user.displayName
        ? user.user.displayName
        : 'Murra User',
      email: user.user.email,
      photoURL: user.user.photoURL,
      role: user.role,
    };
  return null;
};
export const getUserFromAWS = (user) => {
  if (user)
    return {
      id: 1,
      uid: user.username,
      displayName: user.attributes.name ? user.attributes.name : 'Murra User',
      email: user.attributes.email,
      photoURL: user.photoURL,
      role: authRole.user,
    };
  return user;
};

export const getUserFromJwtAuth = (user) => {
  if (user)
    return {
      id: 1,
      uid: user._id,
      displayName: user.name,
      email: user.email,
      photoURL: user.avatar,
      role: authRole.user,
    };
  return user;
};
