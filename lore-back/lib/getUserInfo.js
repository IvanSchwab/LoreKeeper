function getUserInfo(user) {
  return {
    mail: user.mail,
    name: user.name,
    id: user.id || user._id,
  };
}

module.exports = getUserInfo;
