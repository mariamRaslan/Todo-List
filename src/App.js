import './App.css';
import { RouterProvider } from "react-router-dom";
import Routes from "./Routes";
import TodoContextProvider from "./TodoContext";

function App() {
  return (
    <TodoContextProvider>
    <div className="App">
    <RouterProvider router={Routes} />
    </div>
    </TodoContextProvider>
  );
}

export default App;
