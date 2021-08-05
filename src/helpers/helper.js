const fetchGravatarImg = async (userEmail) => {
  const response = await fetch(`https://www.gravatar.com/avatar/${userEmail}`);
  const responseGravatar = response.url;
  return responseGravatar;
};
export default fetchGravatarImg;
