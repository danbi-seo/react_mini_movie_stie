export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error();
  }
  return context;
};
