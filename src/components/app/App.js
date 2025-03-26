// import logo from './logo.svg';
import './App.scss';
import Spinner from '../spinner/Spinner' 
import Error from '../../assets/error.png' 
import Slider from "../slider/Slider";
import TotalBallnce from '../totalBallance/TotalBallance';
import Service from "../../service/service";
function App() {
  const {isLoading, error} = Service()
  if(isLoading){
    return <div className="spinner"><Spinner></Spinner></div>
  }
  if(error){
    return <div>
        <img className = "error" src={Error} alt="error" ></img>
        <div className = "error_text">Something wrong happened try again later</div>
    </div>
  }
  return (
    <div className="App">
        <div className="container">
            <h1 className="wallet">Cordano NFT Wallet</h1>
            <h2 className="greeting">welcome</h2>
            <TotalBallnce></TotalBallnce>
            <Slider></Slider>
        </div>s
        
    </div>
  );
}

export default App;
