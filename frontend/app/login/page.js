"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    // Perform login logic here (fetch request to backend)
    try {
      const response = await fetch(
        "http://ec2-13-53-243-8.eu-north-1.compute.amazonaws.com:3001/sessions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data); // Assuming you receive a token upon successful login
        // Redirect to saldo page upon successful login
        localStorage.setItem("token", data.token);
        router.push("/saldo");
      } else {
        // Handle incorrect credentials
        setErrorMessage("Incorrect username or password");
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle login error (display error message)
    }
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
      <nav className="p-4 flex items-center bg-blue-800">
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
      </nav>

      <div className="flex-grow flex flex-col justify-center items-center">
        <h1>Logga in</h1>
        <form onSubmit={handleLogin} className="flex flex-col space-y-4">
          <div className="flex flex-col ">
            <input
              type="text"
              placeholder="Användarnamn"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Lösenord"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col justify-start">
            <button type="submit">Logga in</button>
            <Link href="/" className="text-white">
              Tillbaka till startsidan
            </Link>
          </div>
        </form>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
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
