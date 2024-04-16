/* // pages/saldo.js
"use client";
import { useState, useEffect } from "react";

export default function Saldo() {
  const [saldo, setSaldo] = useState(null);

  useEffect(() => {
    // Fetch saldo logic here (fetch request to backend)
    const fetchSaldo = async () => {
      try {
        const token = localStorage.getItem("token"); // Assuming you store token in localStorage upon login
        const response = await fetch("http://localhost:3001/me/accounts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });
        const data = await response.json();
        console.log(data); // Assuming you receive saldo data from backend
        setSaldo(data.amount);
      } catch (error) {
        console.error("Error:", error);
        // Handle saldo fetch error
      }
    };

    fetchSaldo();

    return () => {
      // Cleanup logic (if needed)
    };
  }, []);

  return (
    <div>
      <h1>Saldo</h1>
      {saldo !== null ? (
        <p>Ditt saldo är: {saldo} kr</p>
      ) : (
        <p>Laddar saldo...</p>
      )}
    </div>
  );
}
 */

// pages/saldo.js
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Saldo() {
  const [saldo, setSaldo] = useState(null);
  const [amount, setAmount] = useState("");
  /* const [password, setPassword] = useState(""); */
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Fetch saldo logic here (fetch request to backend)
    const fetchSaldo = async () => {
      try {
        const token = localStorage.getItem("token"); // Assuming you store token in localStorage upon login
        const response = await fetch(
          "http://ec2-13-53-243-8.eu-north-1.compute.amazonaws.com:3001/me/accounts",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
          }
        );
        const data = await response.json();
        console.log(data); // Assuming you receive saldo data from backend
        setSaldo(data.amount);
      } catch (error) {
        console.error("Error:", error);
        // Handle saldo fetch error
      }
    };

    fetchSaldo();

    return () => {
      // Cleanup logic (if needed)
    };
  }, []);

  const handleTransaction = async (e) => {
    e.preventDefault();
    // Perform transaction logic here (fetch request to backend)
    try {
      const token = localStorage.getItem("token"); // Assuming you store token in localStorage upon login
      const response = await fetch(
        "http://ec2-13-53-243-8.eu-north-1.compute.amazonaws.com:3001/me/accounts/transactions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token, amount }),
        }
      );
      const data = await response.json();
      console.log(data); // Assuming you receive a success message upon successful transaction
      // Update saldo after transaction
      setSaldo(data.newBalance);
      setMessage("Transaktionen lyckades!");
      // Assuming you receive
    } catch (error) {
      console.error("Error:", error);
      setMessage("Transaktionen misslyckades.");
      // Handle transaction error (display error message)
    }
  };

  const handleLogout = () => {
    // Clear authentication token from localStorage
    localStorage.removeItem("token");
    // Redirect to home page
    router.push("/");
  };

  return (
    <main
      style={{
        background:
          "linear-gradient(to bottom right, #090979 0%, #1a36ed 35%, #00bbe0 80%)",
      }}
      className="w-full min-h-screen flex flex-col"
    >
      {/* Navbar */}
      <nav className="p-4 flex items-center bg-blue-800 justify-between">
        {" "}
        {/* Added justify-between */}
        <div className="flex items-center">
          {" "}
          {/* Added flex container */}
          <img
            alt="Bank SVG Vector Icon"
            style={{
              padding: "10px 20px 10px 20px",
              color: "transparent",
              width: "50px",
              height: "50px",
            }}
            src="https://www.svgrepo.com/show/111195/bank.svg"
          />
          <h1 className="ml-4 text-white">Micke Banken</h1>
        </div>
        <button onClick={handleLogout}>Logout</button>{" "}
        {/* Moved logout button to the end */}
      </nav>

      <div className="flex-grow flex flex-col justify-center items-center">
        <h1>Saldo</h1>

        {saldo !== null ? (
          <div className="bg-blue-300 border-solid border-2 rounded-lg overflow-hidden m-5 p-5">
            <h2>Ditt saldo är: {saldo} kr</h2>
            <form onSubmit={handleTransaction}>
              <input
                type="number"
                placeholder="Belopp"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <button type="submit">Utför transaktion</button>
            </form>

            {message && <p>{message}</p>}
          </div>
        ) : (
          <p>Laddar saldo...</p>
        )}
      </div>

      {/* footer */}
      <nav className="flex justify-start space-x-60 p-0 bg-blue-800 text-white text-center">
        <ul className="list-none flex flex-col items-start">
          Adress:
          <li>Mickevägen123</li>
          <li>163 30</li>
          <li>Stockholm</li>
        </ul>
        <ul className="list-none flex flex-col items-start">
          kontakt:
          <li>Tel: 08 245 555</li>
          <li>Mejl: micke@hotmail.com</li>
        </ul>
      </nav>
    </main>
  );
}
