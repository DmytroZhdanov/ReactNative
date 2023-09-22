export const posts = [
  {
    id: 1,
    image: require("./assets/images/post1.jpg"),
    name: "Forest",
    comments: [
      {
        author: { name: "user", image: require("./assets/images/anotherUserImage.jpg") },
        text: "Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!",
        time: "09 june, 2020 | 08:40",
      },
      {
        author: { name: "Natali Romanova", image: require("./assets/images/userImage.jpg") },
        text: "A fast 50mm like f1.8 would help with the bokeh. I’ve been using primes as they tend to get a bit sharper images.",
        time: "09 june, 2020 | 09:14",
      },
      {
        author: { name: "user", image: require("./assets/images/anotherUserImage.jpg") },
        text: "Thank you! That was very helpful!",
        time: "09 june, 2020 | 09:20",
      },
      {
        author: { name: "user", image: require("./assets/images/anotherUserImage.jpg") },
        text: "Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!",
        time: "09 june, 2020 | 08:40",
      },
      {
        author: { name: "Natali Romanova", image: require("./assets/images/userImage.jpg") },
        text: "A fast 50mm like f1.8 would help with the bokeh. I’ve been using primes as they tend to get a bit sharper images.",
        time: "09 june, 2020 | 09:14",
      },
      {
        author: { name: "user", image: require("./assets/images/anotherUserImage.jpg") },
        text: "Thank you! That was very helpful!",
        time: "09 june, 2020 | 09:20",
      },
      {
        author: { name: "user", image: require("./assets/images/anotherUserImage.jpg") },
        text: "Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!",
        time: "09 june, 2020 | 08:40",
      },
      {
        author: { name: "Natali Romanova", image: require("./assets/images/userImage.jpg") },
        text: "A fast 50mm like f1.8 would help with the bokeh. I’ve been using primes as they tend to get a bit sharper images.",
        time: "09 june, 2020 | 09:14",
      },
    ],
    likes: 53,
    location: { title: "Ukraine", coords: { latitude: 48.3794, longitude: 31.1656 } },
  },
  {
    id: 2,
    image: require("./assets/images/post2.jpg"),
    name: "Sunset on Black Sea",
    comments: [
      {
        author: { name: "user", image: require("./assets/images/anotherUserImage.jpg") },
        text: "Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!",
        time: "09 june, 2020 | 08:40",
      },
      {
        author: { name: "Natali Romanova", image: require("./assets/images/userImage.jpg") },
        text: "A fast 50mm like f1.8 would help with the bokeh. I’ve been using primes as they tend to get a bit sharper images.",
        time: "09 june, 2020 | 09:14",
      },
      {
        author: { name: "user", image: require("./assets/images/anotherUserImage.jpg") },
        text: "Thank you! That was very helpful!",
        time: "09 june, 2020 | 09:20",
      },
    ],
    likes: 200,
    location: { title: "Ukraine", coords: null },
  },
  {
    id: 3,
    image: require("./assets/images/post3.jpg"),
    name: "Old house in Venice",
    comments: [],
    likes: 200,
    location: { title: "Italy", coords: { latitude: 41.8719, longitude: 12.5674 } },
  },
];
