import { ThreeEvent } from "@react-three/fiber";
import { useXRInputSourceState } from "@react-three/xr";
import { useCallback } from "react";
import { Object3D } from "three";

let objectParent: Object3D | null = null;

export const Print = () => {
  const state = useXRInputSourceState("controller", "right");

  const onPointerDown = useCallback(
    (e: ThreeEvent<PointerEvent>) => {
      objectParent = e.object.parent;
      state?.object?.attach(e.object);
    },
    [state]
  );

  const onPointerUP = useCallback((e: ThreeEvent<PointerEvent>) => {
    objectParent?.attach(e.object);
    objectParent = null;
  }, []);

  console.log(state?.object);
  return (
    <>
      <mesh
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUP}
        position={[-0.6, 1.5, -3]}
      >
        <boxGeometry />
        <meshBasicMaterial color={"blue"} />
      </mesh>
      <mesh
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUP}
        position={[0.6, 1.5, -3]}
      >
        <boxGeometry />
        <meshBasicMaterial color={"blue"} />
      </mesh>
    </>
  );
};
