import { Canvas } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";
import { Center, OrbitControls } from "@react-three/drei";
import Laptop from "../../../assets/models/Laptop";
const ThreeDLaptop = () => {
  const isTablet = useMediaQuery({ query: "(max-width: 1023px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 480px)" });

  return (
    <Canvas
      style={{
        height: isMobile ? "200px" : isTablet ? "400px" : "500px",
        width: isMobile ? "200px" : isTablet ? "400px" : "500px",
      }}
      camera={{ position: [0, 0, 6], fov: 50 }}
    >
      <ambientLight intensity={0.2} color="#1a1a40" />
      <directionalLight position={[5, 5, 5]} intensity={5} />
      <OrbitControls
        enablePan={false}
        enableZoom={!isTablet && !isMobile}
        maxDistance={8}
        minDistance={6}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI / 2}
      />
      <Center>
        <Laptop rotation={[0, Math.PI / 4, 0]} />
      </Center>
    </Canvas>
  );
};

export default ThreeDLaptop;
