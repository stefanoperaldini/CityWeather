import React from "react";

export function BarTemperature({temperature}) {
  let color = "darkblue";
  let widthProgess = temperature * 2;

  if (widthProgess > 100){
    widthProgess = 100;
  }else if (widthProgess < -100){
    widthProgess = -100;
  }

  if (widthProgess > 60){
    color = "red";
  } else if ( widthProgess > 50 && widthProgess <= 60 ){
    color = "orange";
  } if (widthProgess > 30 && widthProgess <= 50){
    color = "yelloworange";
  } else if (widthProgess > 20 && widthProgess <= 30){
    color = "yellow";
  } else if (widthProgess >= 0 && widthProgess <= 20){
    color = "blue";
  } else if (widthProgess < 0){
    widthProgess *= -1;
  }
 
  return (
      <React.Fragment>
        <div className="meter">
            <span style={{"width": `${widthProgess}%`}}><span className={`progress ${color}`}></span></span>
        </div>
    </React.Fragment>
  );
}