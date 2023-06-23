export const getThemeFromLS = () => {
  return localStorage.getItem("theme") || "light";
};
