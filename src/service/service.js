import {useState, useEffect} from 'react'

const Service = () =>{
    const [wallet, setWallet] = useState([])
    const [assets, setAssets] = useState([])
    const [quantity, setQuantity] = useState()
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    const _BaseApi = 'https://cardano-mainnet.blockfrost.io/api/v0/'
    const _ApiKey = "mainnetRUrPjKhpsagz4aKOCbvfTPHsF0SmwhLc"
    const _userAddress = "addr1x88ttk0fk6ssan4g2uf2xtx3anppy3djftmkg959tufsc6qkqt76lg22kjjmnns37fmyue765qz347sxfnyks27ysqaqd3ph23"

    useEffect(()=>{
    async function getWallet() {
        try {
        const response = await fetch(`${_BaseApi}addresses/${_userAddress}`, {
            headers: {
            project_id: _ApiKey,
            },
        });
            const data = await response.json();
            setWallet(data.amount);
        } catch (err) {
            console.log("error", err);
            setError(true)
        }
    }
    getWallet()

    },[])

    useEffect(()=>{
        wallet.forEach((item,i)=>{
        if(i>=1){
        async function getAssets() {
            try {
            const response = await fetch(`${_BaseApi}assets/${item.unit}`, {
                headers: {
                project_id: _ApiKey,
                },
            });
                const dataAssets = await response.json();
                setAssets((prevAssets) => [...prevAssets, dataAssets]);
            } catch (err) {
                console.log("error", err);
                setError(true)
            }finally {
                setIsLoading(false);
            }
        }
        getAssets()
        }else{
            setQuantity(item.quantity)
        }

    })
    },[wallet])
    
    return {wallet, assets, quantity, isLoading, error}
}

export default Service
