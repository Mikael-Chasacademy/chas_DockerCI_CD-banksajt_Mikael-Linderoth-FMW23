import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Generera engångslösenord
function generateOTP() {
  // Generera en sexsiffrig numerisk OTP
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp.toString();
}

// Din kod här. Skriv dina arrayer
const users = [];
const accounts = [];
const sessions = [];

// Din kod här. Skriv dina routes:

// Skapa användare endpoint
app.post("/users", (req, res) => {
  const { username, password } = req.body;
  const id = users.length + 1; // Tilldela ett unikt id till användaren
  const newUser = { id, username, password };
  users.push(newUser);

  console.log(newUser);

  // Skapa ett konto med 0 kr som saldo för den nya användaren
  const accountId = accounts.length + 1;
  const newAccount = { id: accountId, userId: id, amount: 0 };
  accounts.push(newAccount);

  console.log(newAccount);

  res.json({
    success: true,
    message: "Användare och konto skapade framgångsrikt.",
  });
});

// Logga in endpoint
app.post("/sessions", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (!user) {
    return res
      .status(401)
      .json({ success: false, message: "Ogiltiga inloggningsuppgifter." });
  }

  // Skapa och spara en sessions token för användaren
  const token = generateOTP();
  sessions.push({ userId: user.id, token });

  res.json({ success: true, token }); // Returnera token till klienten

  console.log(sessions);
});

// Visa saldo endpoint
app.post("/me/accounts", (req, res) => {
  const { token } = req.body;

  console.log("token", token); //vi hämtar inte token därför får vi null

  const session = sessions.find((session) => session.token === token);

  if (!session) {
    return res
      .status(401)
      .json({ success: false, message: "Ogiltig sessions token." });
  }

  const userId = session.userId;
  const account = accounts.find((account) => account.userId === userId);

  if (!account) {
    return res
      .status(404)
      .json({ success: false, message: "Konto hittades inte för användaren." });
  }

  res.json({ success: true, amount: account.amount });
  console.log(account);
});

// Sätt in pengar endpoint
app.post("/me/accounts/transactions", (req, res) => {
  const { token, amount, otp } = req.body;

  const session = sessions.find((session) => session.token === token);

  if (!session) {
    return res
      .status(401)
      .json({ success: false, message: "Ogiltig sessions token." });
  }

  const userId = session.userId;
  const user = users.find((user) => user.id === userId);

  if (!user) {
    return res
      .status(401)
      .json({ success: false, message: "Ogiltiga autentiseringsuppgifter." });
  }

  const account = accounts.find((account) => account.userId === userId);

  if (!account) {
    return res
      .status(404)
      .json({ success: false, message: "Konto hittades inte för användaren." });
  }

  // Kontrollera om det angivna engångslösenordet matchar det sparade för användaren
  const sessionWithOTP = sessions.find(
    (session) => session.token === token && session.otp === otp
  );

  if (!sessionWithOTP) {
    return res
      .status(401)
      .json({ success: false, message: "Felaktigt engångslösenord." });
  }

  // Lägg till det insatta beloppet till saldot
  account.amount += parseFloat(amount);

  res.json({ success: true, newBalance: account.amount });
});

// Starta servern
app.listen(port, () => {
  console.log(
    `Bankens backend körs på http://ec2-13-53-243-8.eu-north-1.compute.amazonaws.com:${port}`
  );
});
