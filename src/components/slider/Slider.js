import {useRef, useState, useEffect, useCallback, useMemo} from 'react'
import Service from "../../service/service";
import './Slider.scss';
import NftCard from '../nftCard/NftCard'
function NftList() {

  	const {assets} = Service()
	const sliderRef = useRef(null);
	const [value, setValue] = useState(getSlideValue);
	const [SliderWidth, setSliderWidth] = useState(0);
	const slideCardWidth = useMemo(() => Math.round(SliderWidth / value), [SliderWidth, value]);
	const fieldWidth = useMemo(() => `${(100 * assets.length) / value}%`, [assets.length, value]);
	const [offset, setOffset] = useState(0)
	const [clickedDotId, setClickedDotId] = useState(0)
	const dotsArr = [];

	function getSlideValue() {
        const breakpoints = [
            { max: 768, value: 1 },
            { max: 992, value: 2 },
            { max: 1200, value: 3 },
        ];
        const match = breakpoints.find(({ max }) => window.matchMedia(`(max-width: ${max}px)`).matches);
        return match ? match.value : 4;
    }

	useEffect(()=>{
        setClickedDotId(0)
       
    },[value])

	const updateSizes = useCallback(() => {
        setValue(getSlideValue());
		
        if (sliderRef.current) {
            setSliderWidth(sliderRef.current.getBoundingClientRect().width);
        }
    }, []);

    useEffect(() => {
        window.addEventListener('resize', updateSizes);
        updateSizes();
        return () => window.removeEventListener('resize', updateSizes);
    }, [updateSizes]);

	
	useEffect(()=>{
        setOffset(-SliderWidth*clickedDotId)
		
    },[clickedDotId, SliderWidth])

	const dots = useMemo(() => {
		
        for (let i = 0; i < Math.ceil(assets.length/value); i++) {
			
            dotsArr.push(
                <div
                    onClick={(e) => setClickedDotId(i)}
                    id={i}
                    key={i}
                    className={clickedDotId == i ? "dot dot_active" : "dot"}
                ></div>
            );
        }
        return dotsArr;
    }, [clickedDotId, value, assets.length]);



	const nextValidation = () => {
        setClickedDotId((prev) => (prev === Math.ceil(assets.length / value) - 1 ? 0 : prev + 1));
    };

    const prevValidation = () => {
        setClickedDotId((prev) => (prev === 0 ? Math.ceil(assets.length / value) - 1 : prev - 1));
    };

	return (
		   
		<>	
			<h2 className='nft_header'>Your NFT list</h2>
			<div className='slider'>
				
				<div ref={sliderRef} className='nftCard-wrapper'>
					<div style={{width: fieldWidth, transform: `translateX(${offset}px)`, transition: "transform 0.3s ease"} } className="slider-wrapper">
						{assets.map((item, i) => (
							< NftCard id={i} key={i} nftName={item.onchain_metadata.name} quantity={item.quantity} img={item.onchain_metadata.image} cardWidth={slideCardWidth}/>
						))}
					</div>
				</div>
                <div onClick={ prevValidation } className='button button_prev'>&lt;</div>
				<div onClick={nextValidation} className='button button_next'>&gt;</div>
			</div>
			<div className="dots">
					{dots}
			</div>
			
		</>
	);
}

export default NftList;