const getType = category => {
  switch (category) {
    case "Restaurants":
      return [
        {
          categoryName: "restaurant",
          categoryIcon: process.env.PUBLIC_URL + "/icons/restaurant.png"
        },
        {
          categoryName: "cafe",
          categoryIcon: process.env.PUBLIC_URL + "/icons/cafe.png"
        }
      ];
    case "Hang-Out":
      return [
        {
          categoryName: "bar",
          categoryIcon: process.env.PUBLIC_URL + "/icons/bar.png"
        },
        {
          categoryName: "night_club",
          categoryIcon: process.env.PUBLIC_URL + "/icons/club.png"
        },
        {
          categoryName: "movie_theater",
          categoryIcon: process.env.PUBLIC_URL + "/icons/movie-theater.png"
        },
        {
          categoryName: "casino",
          categoryIcon: process.env.PUBLIC_URL + "/icons/casino.png"
        }
      ];
    case "TouristAttractions":
      return [
        {
          categoryName: "tourist_attraction",
          categoryIcon: process.env.PUBLIC_URL + "/icons/tourist-attraction.png"
        },
        {
          categoryName: "aquarium",
          categoryIcon: process.env.PUBLIC_URL + "/icons/aquarium.png"
        },
        {
          categoryName: "museum",
          categoryIcon: process.env.PUBLIC_URL + "/icons/museum.png"
        },
        {
          categoryName: "park",
          categoryIcon: process.env.PUBLIC_URL + "/icons/park.png"
        }
      ];
    default:
      return null;
  }
};

export { getType };
