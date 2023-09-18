import { FC, HTMLAttributes } from "react";

export const Button: FC<HTMLAttributes<HTMLButtonElement>> = (props) => (
  <button
    {...props}
    className="bg-stone-200 hover:bg-stone-100 transition-colors py-2 px-4 rounded-md flex items-center gap-2"
  />
);
