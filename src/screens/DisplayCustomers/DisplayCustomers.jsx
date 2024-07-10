import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

function DisplayCustomers() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchNumber, setSearchNumber] = useState("");

  const navigate = useNavigate();

  async function getCustomersAndTransactions() {
    const customerData = await axios({
      url: "http://localhost:3000/customers",
    });

    const transactionData = await axios({
      url: "http://localhost:3000/transactions",
    });

    transactionData.data.map((transaction) => {
      customerData.data.map((customer) => {
        if (customer.id == transaction.customer_id) {
          if (
            typeof customer.totalAmount == "undefined" &&
            typeof customer.totalTtransactions == "undefined"
          ) {
            customer.totalAmount = 0;
            customer.totalTtransactions = 0;
          }
          customer.totalAmount += transaction.amount;
          customer.totalTtransactions += 1;
        }
      });
    });
    setCustomers(customerData.data);
  }

  useEffect(() => {
    getCustomersAndTransactions();
  }, []);
  return (
    <div className="h-screen pt-20 ">
      <Helmet>
        <title>Customers</title>
      </Helmet>
      <h2 className="text-center text-4xl mb-20">Customers</h2>
      <div className="w-2/12 mx-auto mb-7">
        <input
          className="border py-1 px-2 border-white focus:shadow-md focus:shadow-white duration-500 bg-transparent rounded-tr-md rounded-bl-md w-full focus:outline-none"
          type="text"
          placeholder="Search by name or amount"
          onChange={(e) => {
            if (isNaN(e.target.value) || e.target.value == "") {
              setSearch(e.target.value);
            }
            if (!isNaN(e.target.value) || e.target.value == "") {
              setSearchNumber(e.target.value);
            }
          }}
        />
      </div>

      <div className="w-2/6 mx-auto ">
        {customers
          .filter((customer) =>
            customer.totalAmount
              .toString()
              .includes(searchNumber.toString().trim())
          )
          .filter((customer) =>
            customer.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((customer) => (
            <div
              onClick={() => {
                navigate("/graph", { state: { id: customer.id } });
              }}
              key={customer.id}
              className="flex mb-4 py-2 cursor-pointer shadow-[#001510] shadow-md hover:shadow-white duration-300"
            >
              <h3 className="me-8 ms-4 w-8">Id: {customer.id}</h3>
              <h3 className="me-8 w-48">Name: {customer.name}</h3>
              <h3 className="me-8 w-40">
                Total transactions: {customer.totalTtransactions}
              </h3>
              <h3>Total amount: {customer.totalAmount}</h3>
            </div>
          ))}
      </div>
    </div>
  );
}

export default DisplayCustomers;

// http://localhost:3000/customers
// http://localhost:3000/transactions
// http://localhost:3000/transactions
