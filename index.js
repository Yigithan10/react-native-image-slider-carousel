import React, { useEffect, useRef, useState } from "react";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Image,
  Text,
  Pressable,
} from "react-native";
import { width } from "./components/Dimensions";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";

const ImageCarousel = (props) => {
  let data = props.data;
  let square = props.square;
  let autoChange = props.autoChange;
  let changeDuration = props.changeDuration;
  let loop = props.loop;
  let fullWidth = props.fullWidth;
  let showIndex = props.showIndex;
  let showDots = props.showDots;
  let imageBorderRadius = props.imageBorderRadius;
  let imageBorderWidth = props.imageBorderWidth;
  let imageBorderColor = props.imageBorderColor;
  let indexContainMarginTop = props.indexContainMarginTop;
  let dotContainMarginTop = props.dotContainMarginTop;
  let dotColor = props.dotColor;
  let dotWidth = props.dotWidth;
  let dotHeight = props.dotHeight;
  let dotBorderRadius = props.dotBorderRadius;
  let bgColorContainer = props.bgColorContainer;

  if (data == undefined) {
    data = [
      {
        image: require("./assets/notFound.png"),
      },
    ];
  }

  if (square == undefined) {
    square = false;
  }

  if (autoChange == undefined) {
    autoChange = true;
  }

  if (changeDuration == undefined) {
    changeDuration = 4000;
  }

  if (loop == undefined) {
    loop = true;
  }

  if (fullWidth == undefined) {
    fullWidth = false;
  }

  if (showIndex == undefined) {
    showIndex = false;
  }

  if (showDots == undefined) {
    showDots = true;
  }

  if (bgColorContainer == undefined) {
    bgColorContainer = "white";
  }

  if (imageBorderRadius == undefined) {
    imageBorderRadius = 20;
  }

  if (imageBorderWidth == undefined) {
    imageBorderWidth = 0;
  }

  if (imageBorderColor == undefined) {
    imageBorderColor = "black";
  }

  if (indexContainMarginTop == undefined) {
    indexContainMarginTop = 0;
  }

  if (dotContainMarginTop == undefined) {
    dotContainMarginTop = 0;
  }

  if (dotColor == undefined) {
    dotColor = "#0081A6";
  }

  if (dotWidth == undefined) {
    dotWidth = 10;
  }

  if (dotHeight == undefined) {
    dotHeight = 5;
  }

  if (dotBorderRadius == undefined) {
    dotBorderRadius = 10;
  }

  const [isPressed, setIsPressed] = useState(false);

  const scrollViewRef = useRef();

  const SIZE = fullWidth ? width : square ? width * 0.65 : width * 0.7;

  const SPACER = (width - SIZE) / 2;

  const [spacerData, setSpacerData] = useState([
    { key: "spacer-left" },
    ...data,
    { key: "spacer-right" },
  ]);

  const x = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPressed && autoChange == true) {
        if ((activeIndex === data.length - 1) == true && loop == true) {
          const nextIndex =
            activeIndex === data.length - 1 ? 0 : activeIndex + 1;

          setActiveIndex(nextIndex);

          scrollViewRef.current.scrollTo({
            x: nextIndex * SIZE,
            animated: true,
          });
        } else if ((activeIndex === data.length - 1) == false) {
          const nextIndex =
            activeIndex === data.length - 1 ? 0 : activeIndex + 1;

          setActiveIndex(nextIndex);

          scrollViewRef.current.scrollTo({
            x: nextIndex * SIZE,
            animated: true,
          });
        }
      }

      setIsPressed(false);
    }, changeDuration);

    return () => clearInterval(interval);
  }, [activeIndex, isPressed]);

  useEffect(() => {
    if (props.onChange) {
      props.onChange(data[activeIndex], activeIndex + 1);
    }
    setIsPressed(false);
  }, [activeIndex]);

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={[
            styles.container,
            {
              backgroundColor: bgColorContainer,
            },
          ]}
        >
          <Animated.ScrollView
            bounces={false}
            showsHorizontalScrollIndicator={false}
            decelerationRate={"fast"}
            scrollEventThrottle={16}
            snapToInterval={SIZE}
            horizontal={true}
            onScroll={onScroll}
            onMomentumScrollEnd={(event) => {
              const currentIndex = Math.round(
                event.nativeEvent.contentOffset.x / SIZE - 1
              );

              //const backIndex = currentIndex === 0 ? spacerData.length - 1 : currentIndex - 1;
              const nextIndex =
                currentIndex === spacerData.length - 1 ? 0 : currentIndex + 1;

              setActiveIndex(nextIndex);
            }}
            ref={scrollViewRef}
          >
            {spacerData.map((item, index) => {
              const carouselStyle = useAnimatedStyle(() => {
                const scale = interpolate(
                  x.value,
                  [(index - 2) * SIZE, (index - 1) * SIZE, index * SIZE],
                  [0.75, 1, 0.75]
                );

                return {
                  transform: [{ scale }],
                };
              });

              if (!item.image) {
                return <View key={index} style={{ width: SPACER }} />;
              }
              return (
                <Pressable
                  key={index}
                  style={{ width: SIZE }}
                  onPressIn={() => setIsPressed(true)}
                  onPress={() => {
                    if (props.onPress) {
                      props.onPress(data[activeIndex], activeIndex + 1);
                    }
                    setIsPressed(false);
                  }}
                >
                  <Animated.View
                    style={[
                      styles.imageContain,
                      carouselStyle,
                      {
                        borderRadius: imageBorderRadius,
                        borderWidth: imageBorderWidth,
                        borderColor: imageBorderColor,
                      },
                    ]}
                  >
                    <Image
                      style={[
                        styles.image,
                        {
                          aspectRatio: square ? 1 : 16 / 9,
                        },
                      ]}
                      source={item.image}
                    />
                  </Animated.View>
                </Pressable>
              );
            })}
          </Animated.ScrollView>
          {showIndex && (
            <View
              style={[
                styles.indexContain,
                {
                  marginTop: indexContainMarginTop,
                },
              ]}
            >
              <Text style={styles.index}>
                {activeIndex + 1 + " / " + data.length}
              </Text>
            </View>
          )}
          {showDots && (
            <View
              style={[
                styles.paginationContainer,
                {
                  marginTop: dotContainMarginTop,
                },
              ]}
            >
              {data.map((_, index) => {
                const animatedDotStyle = useAnimatedStyle(() => {
                  const widthAnimation = interpolate(
                    x.value,
                    [(index - 1) * SIZE, index * SIZE, (index + 1) * SIZE],
                    [dotWidth, dotWidth, dotWidth],
                    Extrapolate.CLAMP
                  );

                  const opacityAnimation = interpolate(
                    x.value,
                    [(index - 1) * SIZE, index * SIZE, (index + 1) * SIZE],
                    [0.5, 1, 0.5],
                    Extrapolate.CLAMP
                  );

                  return {
                    width: widthAnimation,
                    opacity: opacityAnimation,
                  };
                });
                return (
                  <Animated.View
                    key={index}
                    style={[
                      styles.paginationDot,
                      animatedDotStyle,
                      {
                        backgroundColor: dotColor,
                        width: dotWidth,
                        height: dotHeight,
                        borderRadius: dotBorderRadius,
                      },
                    ]}
                  />
                );
              })}
            </View>
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  imageContain: {
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: undefined,
  },
  ToStartContain: {
    justifyContent: "center",
    alignItems: "center",
  },
  indexContain: {
    width: width,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  index: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  paginationContainer: {
    width: width,
    height: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  paginationDot: {
    marginHorizontal: 4,
  },
});

export default ImageCarousel;
