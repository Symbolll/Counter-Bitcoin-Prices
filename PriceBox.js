import React,{useEffect} from "react";


const PriceBox = ({price, prevPrice, name}) => {
    useEffect(()=> {
        const changedPrice = document.getElementById(name);
        if(prevPrice > price) {
            changedPrice.classList.remove("increased","stable");
            changedPrice.classList.add('decreased');
        }else {
            changedPrice.classList.remove("decreased","stable");
            changedPrice.classList.add("increased");
        }

        setTimeout(() => {
            changedPrice.classList.remove("increased", "decreased");
            changedPrice.classList.add("stable");
        },2000)
    },[price]);

    return(
      <span
          className="stable"
          id={name}
      >
          {price}
      </span>

    );

}
export default PriceBox;