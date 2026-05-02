import { Canvas, Group, Oval, rect, vec } from "@shopify/react-native-skia";
import React from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
const FirstScreen = () => {
  const { width, height } = useWindowDimensions();

  const cx = width / 2;
  const cy = height / 2;

  // The oval dimensions
  const ovalW = 260;
  const ovalH = 100;

  const strokeWidth = 16;

  // Oval centered on screen
  const ovalRect = rect(cx - ovalW / 2, cy - ovalH / 2, ovalW, ovalH);

  // Gradient colors — cyan top to blue bottom
  const gradientStart = vec(cx, cy - ovalH);
  const gradientEnd = vec(cx, cy + ovalH);
  const colors = ["#00CFFF", "#1A6EF5"];
  return (
    <Canvas style={styles.canvas}>
      {/* Oval 1 — horizontal (0°) */}
      <Oval
        rect={ovalRect}
        color="00CFFF"
        style="stroke"
        strokeWidth={strokeWidth}
      />
      {/* Oval 2 — rotated 60° */}
      <Group transform={[{ rotate: Math.PI / 3 }]} origin={{ x: cx, y: cy }}>
        <Oval
          rect={ovalRect}
          color="00CFFF"
          style="stroke"
          strokeWidth={strokeWidth}
        />
      </Group>

      {/* Oval 3 — rotated 120° */}
      <Group
        transform={[{ rotate: (2 * Math.PI) / 3 }]}
        origin={{ x: cx, y: cy }}
      >
        <Oval
          rect={ovalRect}
          color={"lightblue"}
          style="stroke"
          strokeWidth={strokeWidth}
        />
      </Group>
      {/* Center dot */}
    </Canvas>
  );
};

export default FirstScreen;

const styles = StyleSheet.create({
  canvas: {
    flex: 1, // fills the screen
    backgroundColor: "white",
  },
});
