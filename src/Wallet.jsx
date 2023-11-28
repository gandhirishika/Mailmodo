import React, { useEffect, useState } from "react";
import { Bars } from "react-loader-spinner";

const Wallet = () => {
  const [data, setData] = useState();
  const [amount, setAmount] = useState(1000);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(0);
  const [input, setInput] = useState(0);
  const [inputs,setInputs]=useState([]);
  const [add,setAdd] = useState(false);
  const getData = async () => {
    setLoading(true);
    const data = await fetch(
      "https://data.messari.io/api/v1/assets?fields=id,slug,symbol,metrics/market_data/price_usd"
    );
    const response = await data.json();
    if (response?.data?.length > 0) {
      console.log(response?.data);
      setData(response?.data);
      const initialInputs = new Array(response.data.length).fill(0);
      setInputs(initialInputs);
      setLoading(false);
    }
  };
 const handleInput = (index,value) =>{
 const arr = [...inputs];
 arr[index]=value;
 setInputs(arr);
 
 }
 console.log(inputs,"inouts")
 
  const handleBuy = () => {
    if(add){
    const total = amount - value;
    if (total > 0) {
      setAmount(total);
      
      alert("Transaction Completed!");
    } else {
      alert("You do not have enough balance");
    }
    const initialInputs = new Array(data?.length).fill(0);
    setInputs(initialInputs);
    setValue(0);
  }
  else
  alert("Please select item to proceed!")
  };

  useEffect(() => {
    getData();
  }, []);
  if (loading) {
    return (
      <Bars
        height="80"
        width="80"
        color="#0000FF"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass="bar"
        visible={true}
      />
    );
  }
  return (
    <div className="h-[100%] w-[100%]">
      <div className="flex justify-between items-center gap-10 px-6 py-3">
        <img className="" src="https://www.mailmodo.com/static/images/logo/logo-full.svg" alt ="loading"/>
       <div className="flex gap-4"> <button
          className="bg-blue-800 text-white rounded-lg border-2 px-5 py-2"
          onClick={() => {
            handleBuy();
          }}
        >
          Buy Now
        </button>
        <button
          className="bg-blue-800 text-white rounded-lg border-2 px-5 py-2"
          onClick={()=>window.location.reload()}
        >
          Refresh
        </button>
        </div>
        <h1 className=" text-black rounded-lg border-2 px-5 py-2 text-xl">Cart: ${amount.toFixed(2)}</h1>
      </div>
      <div className="flex justify-center items-center mt-10 h-[100%] w-[100%]">
        <table className="h-[100%] w-[100%] border border-black">
          <thead>
            <tr className="">
              <th>Name</th>
              <th>Symbol</th>
              <th>Current Prices</th>
              <th>Input</th>
              <th>Add</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => {
              return (
                <tr className=" " key={index}>
                  <td>{item?.slug}</td>
                  <td>{item?.symbol}</td>
                  <td>{item?.metrics?.market_data?.price_usd.toFixed(2)}</td>
                  <td>
                    <input
                      className="border border-black"
                      type="number"
                      value={inputs[index]}
                      onChange={(e) => handleInput(index,e.target.value)}
                    />
                  </td>
                  <td>
                    <button

                      onClick={() => {
                        setAdd(true);
                        const amount = inputs[index]*item?.metrics?.market_data?.price_usd.toFixed(2);
                        setValue((prev) => prev + amount);
                      }}
                    >
                      Add
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Wallet;
