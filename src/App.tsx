import { Fragment } from "react";
import "./App.css";
import { toast } from "./store";
import { Toast } from "./store/toast";

function App() {
  return (
    <Fragment>
      <div>
        <button
          onClick={() => {
            toast({ message: "hello", duration: 5000 });
          }}
        >
          set toast
        </button>
        <br />
      </div>
      <Toast />
    </Fragment>
  );
}

export default App;
