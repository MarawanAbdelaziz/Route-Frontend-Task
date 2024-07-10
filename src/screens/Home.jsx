import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className=" h-screen pt-64">
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div className="w-4/6 mx-auto  p-5 text-center">
        <Link
          to={"/displayCustomers"}
          className="text-4xl border w-fit mb-14 mx-auto block px-3 pt-2 pb-3 rounded-tr-md rounded-bl-md hover:text-[#001510] hover:border-[#001510] duration-300"
        >
          Show Customers
        </Link>
        <Link
          className="text-4xl border block mx-auto w-fit px-6 pt-2 pb-4 rounded-tr-md rounded-bl-md hover:text-[#001510] hover:border-[#001510] duration-300"
        >
          Graph
        </Link>
      </div>
    </div>
  );
}

export default Home;
