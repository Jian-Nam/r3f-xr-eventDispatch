import { ThreeEvent } from "@react-three/fiber";
import { useCallback, useRef } from "react";
import { Vector3 } from "three";

export function useDrag(){
    const grabbingPointerIdRef = useRef<number | null>(null)
    const offsetRef = useRef<Vector3 >(new Vector3())

    const onPointerMove = useCallback((e: ThreeEvent<PointerEvent>) => {
        if (grabbingPointerIdRef.current != e.pointerId) return;
        e.object.position.copy(e.point.add(offsetRef.current));
      }, []);
    
      const onPointerDown = useCallback((e: ThreeEvent<PointerEvent>) => {
        if (grabbingPointerIdRef.current != null) return;
        grabbingPointerIdRef.current = e.pointerId;
        offsetRef.current.copy(e.object.position)
        offsetRef.current.sub(e.point)
    
        const target = e.target as Element;
        target.setPointerCapture(e.pointerId);
        e.stopPropagation();
      }, []);
    
      const onPointerUp = useCallback((e: ThreeEvent<PointerEvent>) => {
        if (grabbingPointerIdRef.current == null || grabbingPointerIdRef.current != e.pointerId) return;
        grabbingPointerIdRef.current = null;

        const target = e.target as Element;
        target.releasePointerCapture(e.pointerId);
      }, []);

      return {onPointerMove, onPointerDown, onPointerUp}

}