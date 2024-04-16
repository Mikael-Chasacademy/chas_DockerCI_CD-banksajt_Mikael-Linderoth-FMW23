import Link from "next/link";

export default function Home() {
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

      {/* Hero-section */}
      <section className="flex-grow flex flex-col justify-center items-center">
        <h1 className="text-5xl">Välkommen till banken!</h1>
        <h3>Utforska våra tjänster nedan:</h3>
        <div className="flex space-x-10">
          <Link
            href="/login"
            className="bg-blue-500 p-4 text-white rounded-md border-2 border-solid  hover:bg-blue-600"
          >
            Logga in
          </Link>
          <Link
            href="/signup"
            className="bg-blue-500 p-4 text-white rounded-md border-2 border-solid  hover:bg-blue-600"
          >
            Skapa användare
          </Link>
        </div>
      </section>

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
