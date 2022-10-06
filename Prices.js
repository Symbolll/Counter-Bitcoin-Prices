import React, {useEffect, useRef} from "react";
import './App.css';
import Table from 'react-bootstrap/Table';
import PriceBox from "./PriceBox";

const usePrevious = (value) => {
    const ref = useRef();

    useEffect(() => {
        ref.current = value;
    }, [value]);
    return ref.current;
};


const Prices = (props) => {
    const prevPrices = usePrevious(props.bpi);

    return (
        <Table className="pricesTable mx-auto" striped bordered hover variant="dark">
            <thead>
            <tr>
                <th>Name</th>
                <th>Price</th>
            </tr>
            </thead>
            <tbody>
            {props.bpi && Object.values(props.bpi).map((item, i) => (
                <tr key={i}>
                    <td>
                        <span className="symbol" dangerouslySetInnerHTML={{__html: item.symbol}}></span>
                        <span className="code">{item.code}</span>
                    </td>
                    <td>
                        <span>
                            <PriceBox
                                price={item.rate_float}
                                prevPrice={prevPrices && prevPrices[item.code].rate_float}
                                name={item.code}
                            />
                        </span>
                    </td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
}
export default Prices ;