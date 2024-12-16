import { Canvas } from "@react-three/fiber";
import { XR, createXRStore } from "@react-three/xr";
import "./App.css";
import { useDrag } from "./useDrag";

const store = createXRStore({ secondaryInputSources: true });

export default function App() {
  const {onPointerMove, onPointerDown, onPointerUp} = useDrag()

  return (
    <>
      <button onClick={() => store.enterVR()}>Enter VR</button>
      <Canvas>
        <XR store={store}>
          <mesh
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerMove={onPointerMove}
            position={[-0.6, 1.5, -3]}
          >
            <boxGeometry />
            <meshBasicMaterial color={"blue"} />
          </mesh>
          <mesh
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerMove={onPointerMove}
            position={[0.6, 1.5, -3]}
          >
            <boxGeometry />
            <meshBasicMaterial color={"blue"} />
          </mesh>
        </XR>
      </Canvas>
    </>
  );
}
