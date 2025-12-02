import { useEffect,useState } from "react";

function App() {
  const [message, setMessage] = useState("Loading...");
  
  useEffect(() => { 
    fetch("/api/hello")
        .then((response) => response.json())
        .then((data) => setMessage(data.message))
        .catch(() => setMessage("Error fetching message"));
  }, []);
  
  return (
    <div style={{fontFamily:"sans-serif", padding:"2rem"}}>
        <h1>CI/CD + Kubernetes Demo</h1>     
        <p>Message from backend: {message}</p>
    </div>
  );
}

export default App;