import axios from "axios";

const getType = (category) => {
  switch (category) {
    case "Restaurants":
      return {
        subCategoryColor: "#3498DB",
        subCategoryBackground:
          "linear-gradient(to bottom right, rgba(0, 255, 255, 0.8), rgba(173, 255, 255, 0.6) 60%),url(https://images.unsplash.com/photo-1428515613728-6b4607e44363?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80)",
        subCategoryList: [
          {
            categoryName: "restaurant",
            categoryIcon: process.env.PUBLIC_URL + "/icons/restaurant.png",
          },
          {
            categoryName: "cafe",
            categoryIcon: process.env.PUBLIC_URL + "/icons/cafe.png",
          },
        ],
      };
    case "Hang-Out":
      return {
        subCategoryColor: "#0C00FF",
        subCategoryBackground:
          "linear-gradient(to bottom right, rgba(0, 220, 255, 0.4), rgba(10, 100, 242, 0.5) 60%),url(https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80)",
        subCategoryList: [
          {
            categoryName: "bar",
            categoryIcon: process.env.PUBLIC_URL + "/icons/bar.png",
          },
          {
            categoryName: "night_club",
            categoryIcon: process.env.PUBLIC_URL + "/icons/club.png",
          },
          {
            categoryName: "movie_theater",
            categoryIcon: process.env.PUBLIC_URL + "/icons/movie-theater.png",
          },
          {
            categoryName: "casino",
            categoryIcon: process.env.PUBLIC_URL + "/icons/casino.png",
          },
        ],
      };
    case "TouristAttractions":
      return {
        subCategoryColor: "#8A0BC5",
        subCategoryBackground:
          "linear-gradient(to bottom right, rgba(173, 35, 255, 0.7), rgba(199, 144, 255, 0.7) 60%),url(https://images.unsplash.com/photo-1416397202228-6b2eb5b3bb26?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1047&q=80)",
        subCategoryList: [
          {
            categoryName: "tourist_attraction",
            categoryIcon:
              process.env.PUBLIC_URL + "/icons/tourist-attraction.png",
          },
          {
            categoryName: "aquarium",
            categoryIcon: process.env.PUBLIC_URL + "/icons/aquarium.png",
          },
          {
            categoryName: "museum",
            categoryIcon: process.env.PUBLIC_URL + "/icons/museum.png",
          },
          {
            categoryName: "park",
            categoryIcon: process.env.PUBLIC_URL + "/icons/park.png",
          },
        ],
      };
    case "Taxi":
      return {
        subCategoryColor: "#0C00FF",
        subCategoryBackground:
          "linear-gradient(to bottom right, rgba(173, 35, 255, 0.7), rgba(199, 144, 255, 0.7) 60%),url(https://images.unsplash.com/photo-1416397202228-6b2eb5b3bb26?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1047&q=80)",
        subCategoryList: [{ categoryName: "", categoryIcon: "" }],
      };
    default:
      return null;
  }
};
const createDictionaryForm = async ({ target }) => {
  let details = {};
  for (let i = 0; target[i].type !== "submit"; i++) {
    let name = target[i].name;
    let value;
    if (name === "profile_image") {
      value = await uploadProfileImage(target[i].files[0]);
      if (!(value instanceof Error)) {
        value = value.data.data.link;
      }
    } else {
      value = target[i].value;
    }
    details[name] = value;
  }
  return details;
};

const getUserCredentialsFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("User_Credentials"));
};

const setUserCredentialsInLocalStorage = (userCredentials) => {
  return localStorage.setItem(
    "User_Credentials",
    JSON.stringify(userCredentials)
  );
};

const uploadProfileImage = async (profileImageFile) => {
  let tempImageData = new FormData();
  tempImageData.append("image", profileImageFile);
  const response = await axios
    .post("https://api.imgur.com/3/image", tempImageData, {
      headers: {
        Authorization: `Client-ID ${process.env.REACT_APP_IMGUR_CLIENT_ID}`,
        Accept: "application/json",
      },
    })
    .catch(() => {
      if (profileImageFile === undefined) {
        let error = new Error("Image was not uploaded");
        error.name = "Empty upload";
        return error;
      }
      throw Error("Image file was not acceptible by the upload server");
    });
  return response;
};

export {
  getType,
  createDictionaryForm,
  getUserCredentialsFromLocalStorage,
  setUserCredentialsInLocalStorage,
};
