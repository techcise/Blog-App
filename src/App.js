import Navbar from "./Navbar";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import About from "./About";
import Home from "./Home";
import BlogDetails from "./BlogDetails";
import Create from "./Create";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/blog-detail/:id">
            <BlogDetails />
          </Route>
          <Route exact path="/create">
            <Create />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
