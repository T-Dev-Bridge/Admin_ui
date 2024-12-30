export const pathKeys = {
  root: import.meta.env.VITE_ROUTE_ROOT_URL,
  login() {
    return pathKeys.root.concat("login");
  },
  page404() {
    return pathKeys.root.concat("404");
  },
  profile() {
    return pathKeys.root.concat("profile");
  },
  admin: {
    root() {
      return pathKeys.root.concat("admin");
    },
    manager() {
      return pathKeys.admin.root().concat("/manager");
    },
  },
};
