This is a custom image slider and carousel.
Please reload the application to make it work more correctly when you make a change for this component.
My build versions:
1- react-native-reanimated: 2.14.4 

## Installation

```bash
npm install react-native-image-slider-carousel
```

## Doc

[react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/)

## Usage

```js
    import ImageCarousel from "react-native-image-slider-carousel";

    const imageData = [
        {
            image: {
            uri: "https://cdn.tommylife.com.tr/p-siyah-beyaz-bagcikli-yuksek-taban-suni-deri-erkek-spor-ayakkabi-89111-spor-ayakkabi-tommylife-t11er-89111-173162-32-O.jpg",
            },
            text: "Item 1",
        },
        {
            image: {
            uri: "https://st-vans.mncdn.com/mnresize/1500/1500/Content/media/ProductImg/original/637639363468969344.jpg",
            },
            text: "Item 2",
        },
        {
            image: {
            uri: "https://cdn.cimri.io/image/1000x1000/pumasmashvbuckerkeksporayakkabgri_208856385.jpg",
            },
            text: "Item 3",
        },
        {
            image: require("your local image path"),
            text: "Item 4",
        },
    ];

    <ImageCarousel
        data={imageData}
        square={false}
        autoChange={true}
        changeDuration={4000}
        loop={true}
        fullWidth={false}
        showIndex={false}
        showDots={true}
        bgColorContainer={"white"}
        imageBorderRadius={20}
        imageBorderWidth={0}
        imageBorderColor={"black"}
        indexContainMarginTop={0}
        dotContainMarginTop={0}
        dotColor={"#0081A6"}
        dotWidth={10}
        dotHeight={5}
        dotBorderRadius={10}
        onChange={(item, index) => {
            console.log("******");
            console.log("onChange : " + index);
            console.log("onChange : " + item.text);
        }}
        onPress={(item, index) => {
            console.log("******");
            console.log("onPress : " + index);
            console.log("onPress : " + item.text);
        }}
    />;
```

## API

| prop                    | type      | description                      | default        |
| :---------------------- | :-------- | :------------------------------- | :------------- |
| `data`                  | `List`    | Image Data.                      | "notFound.png" |
| `square`                | `Boolean` | Image square.                    | false          |
| `autoChange`            | `Boolean` | Image auto change.               | true           |
| `changeDuration`        | `Number`  | Image auto change duration.      | 4000           |
| `loop`                  | `Boolean` | Image loop.                      | true           |
| `fullWidth`             | `Boolean` | Image fullWidth.                 | false          |
| `showIndex`             | `Boolean` | Image index.                     | false          |
| `showDots`              | `Boolean` | Image dots.                      | true           |
| `bgColorContainer`      | `String`  | Image container backgroundColor. | "white"        |
| `imageBorderRadius`     | `Number`  | Image borderRadius.              | 20             |
| `imageBorderWidth`      | `Number`  | Image borderWidth.               | 0              |
| `imageBorderColor`      | `String`  | Image borderColor.               | "black"        |
| `indexContainMarginTop` | `Number`  | Image index marginTop.           | 0              |
| `dotContainMarginTop`   | `Number`  | Image dots marginTop.            | 0              |
| `dotColor`              | `String`  | Image dots color.                | "#0081A6"      |
| `dotWidth`              | `Number`  | Image dots width.                | 10             |
| `dotHeight`             | `Number`  | Image dots height.               | 5              |
| `dotBorderRadius`       | `Number`  | Image dots borderRadius.         | 10             |
