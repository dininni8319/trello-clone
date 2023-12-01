// not in use at the moment
// I may need it 
export const useInput = () => {
  return {
    value: '',
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log(e.target.value);
    },
  };
}