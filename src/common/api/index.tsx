import axios from "axios";

const api = {
  key: "69f1180baba16804c8046c4c94a48706",
  base: "https://api.openweathermap.org/data/2.5/",
  // onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
};

export async function getSearchData(searchParam: any, location?: string) {
  let result: any = null;
  let url = "";
  if (
    searchParam.infoType === "weather" ||
    searchParam.infoType === "forecast"
  ) {
    url =
      api.base +
      `${searchParam.infoType}` +
      `?q=${location}` +
      `&units=metric&appid=${api.key}`;
  } else {
    url =
      api.base +
      `${searchParam.infoType}` +
      `?lat=${searchParam.lat}&lon=${searchParam.lon}` +
      `&exclude=${searchParam.exclude}` +
      `&appid=${api.key}`;
  }
  // onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,alerts&appid=69f1180baba16804c8046c4c94a48706`
  // console.log(url);

  try {
    result = await axios.get(encodeURI(url));
  } catch (error: any) {
    const axiosError = error;

    if (axiosError.response) {
      result = axiosError.response;
    } else {
      result = null;
    }
  }

  return result ? result.data : null;
}

// const formatToLocalTime = (
//   secs,
//   zone,
//   format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
// ) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

export const iconUrlFromCode = (code: any) =>
  `http://openweathermap.org/img/wn/${code}@2x.png`;
