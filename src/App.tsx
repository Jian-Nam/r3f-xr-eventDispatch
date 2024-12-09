import { Canvas } from "@react-three/fiber";
import { XR, createXRStore } from "@react-three/xr";
import "./App.css";
import { Print } from "./Print";

const store = createXRStore({ secondaryInputSources: true, controller: {} });

export default function App() {
  return (
    <>
      <button onClick={() => store.enterVR()}>Enter VR</button>
      <Canvas>
        <XR store={store}>
          <Print />
        </XR>
      </Canvas>
    </>
  );
}
