import React, {useState, useEffect,useMemo} from "react";
import './App.css';
import Counter from "./Counter";
import Prices from "./Prices";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [bpi, setBpi] = useState(null);


  const getData = async () => {
      await axios.get(`https://api.coindesk.com/v1/bpi/currentprice.json`)
          .then((response)=>{
               //console.log(Object.values(response.data.bpi));
              //console.log(Object.values(response.data));
              setBpi(response.data.bpi);
          })
          .catch((error)=>{
              console.log(error);
          })
      setTimeout(() => getData(),3000);
  };

  useEffect(() => {
    getData();
  }, []);

    return (
        <div className="App container mx-auto p-5">
            <div className="row p-5">
                <Counter
                />
            </div>
            <div className="row p-5">
                <Prices
                    bpi={bpi}
                />
            </div>
        </div>
    );
}

export default App;
