import { Canvas, ThreeEvent } from "@react-three/fiber";
import { XR, createXRStore } from "@react-three/xr";
import "./App.css";
import { useCallback } from "react";

const store = createXRStore({ secondaryInputSources: true });
let grabbingPointerId: number | null = null;

export default function App() {
  const onMovePointer = useCallback((e: ThreeEvent<PointerEvent>) => {
    if (grabbingPointerId != e.pointerId) return;
    e.object.position.copy(e.point);
  }, []);

  const onPointerDown = useCallback((e: ThreeEvent<PointerEvent>) => {
    if (grabbingPointerId != null) return;
    grabbingPointerId = e.pointerId;

    const target = e.target as Element;
    // position update를 막아줌 지속적으로 앞으로 오는 문제
    target.setPointerCapture(e.pointerId);
    e.stopPropagation();
  }, []);

  const onPointerUP = useCallback((e: ThreeEvent<PointerEvent>) => {
    if (grabbingPointerId == null || grabbingPointerId != e.pointerId) return;
    grabbingPointerId = null;
    const target = e.target as Element;
    target.setPointerCapture(e.pointerId);
  }, []);
  return (
    <>
      <button onClick={() => store.enterVR()}>Enter VR</button>
      <Canvas>
        <XR store={store}>
          <mesh
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUP}
            onPointerMove={onMovePointer}
            position={[-0.6, 1.5, -3]}
          >
            <boxGeometry />
            <meshBasicMaterial color={"blue"} />
          </mesh>
          <mesh
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUP}
            onPointerMove={onMovePointer}
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
