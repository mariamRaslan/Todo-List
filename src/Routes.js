import { createBrowserRouter } from "react-router-dom";
import Home from "./Pages/Home/Home";
import CreateTodo from "./Pages/CreateTodo/CreateTodo";
import EditTodo from "./Pages/EditTodo/EditTodo";
import TodoDetails from "./Pages/TodoDetails/TodoDetails";
import Navbar from "./Components/Navbar/Navbar";


const Routes = createBrowserRouter([
  {
    path: "/",
    element:[<Navbar />, <Home />],
  },
  {
    path:'/CreateTodo',
    element:[<Navbar />,<CreateTodo />]
  },
  {
    path:'/EditTodo/:id',
    element:[<Navbar />,<EditTodo />]
  },
  {
    path:'/TodoDetails/:id',
    element:[<Navbar />,<TodoDetails />]
  }
]);

export default Routes 
