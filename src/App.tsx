import { Canvas, RootState } from "@react-three/fiber";
import { VRButton } from "three/addons/webxr/VRButton.js";
import "./App.css";
import * as THREE from "three";
import { useRef } from "react";

export default function App() {
  const rightControllerRef = useRef<THREE.XRTargetRaySpace | null>(null);
  const rightControllerGripRef = useRef<THREE.XRGripSpace | null>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);

  const onCreateCanvas = ({ gl, scene }: RootState) => {
    sceneRef.current = scene;

    const xrManager = gl.xr;
    xrManager.enabled = true;
    document.body.appendChild(VRButton.createButton(gl));

    const controller1 = xrManager.getController(0);
    controller1.addEventListener("selectstart", handleRightSelectStart);
    controller1.addEventListener("connected", function (event) {
      this.add(buildController(event.data));
    });

    scene.add(controller1);
    rightControllerRef.current = controller1;

    const controller2 = xrManager.getController(1);
    controller2.addEventListener("selectstart", handleLeftSelectStart);
    controller2.addEventListener("connected", function (event) {
      this.add(buildController(event.data));
    });
    scene.add(controller2);

    const controllerGrip1 = xrManager.getControllerGrip(0);
    rightControllerGripRef.current = controllerGrip1;
    console.log(controller1.position);
    console.log(controllerGrip1.position);
    // const controllerGrip2 = xrManager.getControllerGrip(1);

    // scene.add(controllerGrip1, controllerGrip2);
    scene.background = new THREE.Color(0xffffff);
    console.log(scene.toJSON());
  };

  const handleRightSelectStart = (e) => {
    console.log("Right Controller: SelectStartEvent");

    if (
      rightControllerRef.current === null ||
      sceneRef.current === null ||
      rightControllerGripRef.current !== null
    )
      return;
    const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.copy(rightControllerRef.current?.position);
    sceneRef.current.add(mesh.clone());

    mesh.position.copy(rightControllerGripRef.current?.position);
    sceneRef.current.add(mesh.clone());
  };

  const handleLeftSelectStart = (e) => {
    console.log("Left Controller: SelectStartEvent");
  };

  function buildController(data) {
    let geometry, material;

    switch (data.targetRayMode) {
      case "tracked-pointer":
        geometry = new THREE.BufferGeometry();
        geometry.setAttribute(
          "position",
          new THREE.Float32BufferAttribute([0, 0, 0, 0, 0, -1], 3)
        );
        geometry.setAttribute(
          "color",
          new THREE.Float32BufferAttribute([0.5, 0.5, 0.5, 0, 0, 0], 3)
        );

        material = new THREE.LineBasicMaterial({
          vertexColors: true,
          blending: THREE.AdditiveBlending,
        });

        return new THREE.Line(geometry, material);

      case "gaze":
        geometry = new THREE.RingGeometry(0.02, 0.04, 32).translate(0, 0, -1);
        material = new THREE.MeshBasicMaterial({
          opacity: 0.5,
          transparent: true,
        });
        return new THREE.Mesh(geometry, material);
    }
  }

  return (
    <Canvas onCreated={onCreateCanvas}>
      <mesh
        position={[0, 0, -5]}
        onClick={() => {
          console.log("onClickMeshEvent");
          materialRef.current!.color = new THREE.Color(0x00ff00);
        }}
      >
        <boxGeometry args={[2, 2, 2]} />
        <meshBasicMaterial color="rgb(110, 20, 30)" ref={materialRef} />
      </mesh>
      <ambientLight intensity={0.1} />
      <directionalLight position={[0, 0, 5]} color="red" />
    </Canvas>
  );
}
