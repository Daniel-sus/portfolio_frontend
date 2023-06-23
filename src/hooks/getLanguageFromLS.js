export const getLanguageFromLS = () => {
    return localStorage.getItem("language") || "english"
};
