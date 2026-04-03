import { useEffect, useState } from "react";
import { getPrices } from "../../api/marketApi";

function MarketPrices() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getPrices().then(res => setData(res.data));
  }, []);

  return (
    <div className="main">
      <h1>💰 Market Prices</h1>

      <table>
        <thead>
          <tr>
            <th>Crop</th>
            <th>Price</th>
          </tr>
        </thead>

        <tbody>
          {data.map((d, i) => (
            <tr key={i}>
              <td>{d.crop}</td>
              <td>{d.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MarketPrices;