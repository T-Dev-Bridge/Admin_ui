export const apiPathKeys = {
  root: "/",
  admin() {
    return apiPathKeys.root.concat(`admin`);
  },
  auth() {
    return apiPathKeys.root.concat(`auth`);
  },
};
