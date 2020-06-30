import React, { Fragment } from 'react'

const Sushi = (props) => {
  const { name, price, img_url, eaten, } = props.details


  const imagePath = () =>{
    const image = require(`${img_url}`)
    return image
  }



  return (
    <div className="sushi">
      <div className="plate">
        { 
          /* Tell me if this sushi has been eaten! */ 
          eaten ?
          null
          :
            <img 
            // src={imagePath()}
            src={img_url} 

            width="100%" 
            onClick={()=>{props.buySushi(props.sushiKey)}}
            />
        }
      </div>
      <h4 className="sushi-details">
        {name} - ${price}
      </h4>
    </div>
  )
}

export default Sushi