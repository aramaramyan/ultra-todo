export default function getUserObjFromArr(userArr) {
  const obj = {};

  userArr.forEach((user) => {
    obj[user.id] = user;
  });

  return obj;
}