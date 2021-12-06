import React, { ReactNode } from "react";

function Layers({ children }: {children: ReactNode}){
  console.log('Layersの中');
  console.log(children);
    return <div>{children}</div>;
};

export default Layers;