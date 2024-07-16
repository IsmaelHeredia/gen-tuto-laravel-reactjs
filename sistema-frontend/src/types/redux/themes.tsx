interface InitialState {
    theme_mode: number;
    theme_color: number;
    theme_style: any;
}
  
const UpdateNameAction: string = "Themes";
  
export default InitialState;

export { UpdateNameAction };