import logo from "./logo.svg";
import "./App.css";
import Comments from "./components/comments/Comments";

function App() {
  return (
    <div className="App">
      <Comments currentUserId="1" />
    </div>
  );
}

export default App;
