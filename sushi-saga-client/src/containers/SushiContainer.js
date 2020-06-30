import React, { Fragment } from 'react'
import MoreButton from '../components/MoreButton'
import Sushi from '../components/Sushi'

const SushiContainer = (props) => {
  
  const renderSushis = () =>{
    return (
      props.sushis.map((sushi, idx)=>{
      return (
        <Sushi 
        details={sushi} 
        key={idx} 
        sushiKey={idx} 
        buySushi={props.buySushi}/>
      )
      })
    )
  } 

  
  
  
  return (
    <Fragment>
      <div className="belt">
        {
          renderSushis()
        }
        <MoreButton getSushis={props.getSushis}/>
      </div>
    </Fragment>
  )
}

export default SushiContainer