import NavHeader from "./Navheader";
import HorizontalScroll from "./HorizontalScroll";
import Loader from "./Loader"

function App() {

  return (
    <div className="h-screen">
      <NavHeader />
      {/* <Loader /> */}
      <HorizontalScroll/>
    </div>
  );
}

export default App
