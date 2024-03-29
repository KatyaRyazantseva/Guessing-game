import {createContext, Dispatch } from 'react';

interface ToggleMenuContextType {
  toggleMenuValue: boolean;
  setToggleMenuValue: Dispatch<React.SetStateAction<boolean>>;
}

export const ToggleMenuContext = createContext<ToggleMenuContextType>({
  toggleMenuValue: true,
  setToggleMenuValue: () => {},
});