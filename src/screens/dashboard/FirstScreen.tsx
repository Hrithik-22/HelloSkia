import {
  BlurMask,
  Canvas,
  Circle,
  Group,
  Oval,
  Paint,
  RadialGradient,
  rect,
  SweepGradient,
  vec,
} from "@shopify/react-native-skia";
import { useEffect } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import {
  Easing,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const FirstScreen = () => {
  const { width, height } = useWindowDimensions();
  const center = vec(width / 2, height / 2);
  const c1 = "#00CFFF";
  const c2 = "#1A6EF5";
  const rct = rect(center.x - 130, center.y - 50, 260, 100);

  // 🌀 The spin value
  const rotate = useSharedValue(0);
  const rotateTransform = useDerivedValue(() => [{ rotate: rotate.value }]);

  useEffect(() => {
    rotate.value = withRepeat(
      withTiming(Math.PI * 2, {
        duration: 3000,
        easing: Easing.linear, // constant speed, no easing
      }),
      -1, // infinite
      false, // don't reverse
    );
  }, []);

  const StrokePaint = () => (
    <Paint style="stroke" strokeWidth={18}>
      <SweepGradient c={center} colors={[c1, c2, c1]} />
      <BlurMask blur={10} style="outer" />
    </Paint>
  );

  return (
    <Canvas style={styles.canvas}>
      {/* Center dot stays still */}
      <Circle c={center} r={25}>
        <RadialGradient
          colors={[c1, c2]}
          c={vec(center.x + 10, center.y - 10)}
          r={30}
        />
        <BlurMask blur={10} style="inner" />
      </Circle>
      {/* Wrap everything in a rotating Group */}
      <Group transform={rotateTransform} origin={center}>
        <Oval rect={rct} color="transparent">
          <StrokePaint />
        </Oval>

        <Group
          transform={[{ rotate: Math.PI / 3 }, { scale: -1 }]}
          origin={center}
        >
          <Oval rect={rct} color="transparent">
            <StrokePaint />
          </Oval>
        </Group>

        <Group
          transform={[{ rotate: -Math.PI / 3 }, { scale: -1 }]}
          origin={center}
        >
          <Oval rect={rct} color="transparent">
            <StrokePaint />
          </Oval>
        </Group>
      </Group>
    </Canvas>
  );
};

const styles = StyleSheet.create({
  canvas: { flex: 1, backgroundColor: "white" },
});
export default FirstScreen;
