
import notFoundImg from '../../assets/not_found.jpg'
import './NftCard.scss';
function NftCard({id, nftName, quantity, img, cardWidth}) {

	return (
	
		<>
			<div style ={{width: cardWidth}}  key={id} className="asset_wrapper">
					
					<div>
						<div className="Nft Nft_name">{nftName}</div>
						<img 
							className='Nft_pic' 
							src={ 
							Array.isArray(img) ? 
							notFoundImg : 
							`https://ipfs.io/ipfs/${img.slice(7)}`
							} 
							alt="Nft_picture" 
						/>
						
						<div className="Nft Nft_quantity">Quantity: {quantity}</div>
						
						
					</div>
					

            </div>
			
		</>
		
	);
}

export default NftCard;

