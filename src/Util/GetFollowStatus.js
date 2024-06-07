const GetFollowStatus = (followers, uid) => {
  //uid loggedin user id
  let status = false;
  if (followers.length > 0 && followers.includes(uid)) {
    status = true;
  }
  return status;
};
export default GetFollowStatus;
