
import Service from "../../service/service";
import './TotalBallance.scss';
function TotalBallnce() {
  	const {quantity, assets} = Service()
  
	return (
		<>
			<div className="total_ballance">
                <div className="blur blur_pink"></div>
                <div className="blur blur_blue"></div>
                <div className="blur blur_yellow"></div>
                <div className="wrapper">
                    <div className="header">Total ballance</div>
                    <div className="quantity">{`${(quantity/1000000).toFixed(2)} ADA`}</div>
                </div>
                <div className="wrapper_quantitty">
                    <div className="quantity">{`quantity of NFTs: ${assets.length}`}</div>
                </div>
                
			</div>
		</>
		
	);
}

export default  TotalBallnce;