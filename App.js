/*
So this is my weather app. I went with a simple yet informative UI design, which also has a nice background. All the weather is displayed inside low opcaity boxes
to make it readable. At the very top you can enter a city, but the app opens with the data to Randolph, since it was made for local use. You can get the current temp
at the top and then some extra info like; wind speed, feels like, UV Index, and cloudiness. The bottom then has a 7 day forecast with all the highs and lows. 

There are a few bugs with the app. On both IOS and Android if you type one letter and then delete it, you will get an alert that says "Please enter a City". This
only happens because the City string becomes empty and the API doesnt know what to do with it. 

Most of my bugs come from android. On certain android devices, when you open the keyboard to enter a city, all the text on the screen becomes squished, but then 
fixes itself once you enter a city. Another bug on android is the clearTextOnFocus just doesnt work, so you have to manually delete your last input, which then
gives you the error from before with an empty string. My app also doesnt open saying "Randolph NJ", because the way I had it previously working with my {city} variable 
made it so that you couldnt enter a full city on Android, so I had to change it a string that doesnt change. 

Aside from this you could literally enter anything into the city section, and the API will display the closest results. This means you could enter something like &*%$#
and it wont give an error. 

Other than these little bugs, my app works as intended and I havent been able to crash it yet. 

*/
import React from 'react';
import { useState, useEffect } from 'react';
import moment from "moment";
import { StyleSheet, Text, View, FlatList, ImageBackground, SafeAreaView,TextInput,Image,} from 'react-native';

const imageOne = { uri: "https://wallpaperaccess.com/full/12569.jpg" };

export default function App() {

const[cords, setCords] = useState({lat: 0, lng: 0})
const[city, setCity] = useState("Randolph NJ")
const [number, onChangeNumber] = React.useState(null);
const [current, setCurrent] = useState([]);
const [currentWeather, setCurrentWeather] = useState([""]);
const [dailyWeather, setDailyWeather] = useState([{temp:{max:"0"},temp:{max:"0"}}]);
const [daily, setDaily] = useState([{temp:{max:"0"}, weather: [{icon: "10d"}]}, {temp:{max:"0"}, weather: [{icon: "10d"}]}, {temp:{max:"0"}, weather: [{icon: "10d"}]}, {temp:{max:"0"}, weather: [{icon: "10d"}]}, {temp:{max:"0"}, weather: [{icon: "10d"}]}, {temp:{max:"0"}, weather: [{icon: "10d"}]}, {temp:{max:"0"}, weather: [{icon: "10d"}]}, {temp:{max:"0"}, weather: [{icon: "10d"}]}, {temp:{max:"0"}, weather: [{icon: "10d"}]}, {temp:{max:"0"}, weather: [{icon: "10d"}]}]);

const [open, setOpen] = useState(true);

useEffect(() => {
  const geoLocation = "https://maps.googleapis.com/maps/api/geocode/json?address="+city+"&key=AIzaSyBai2aRjTpJEvvDMqjhU6kcVv_Y2M9CNiQ"
  fetch(geoLocation)
  .then(response => response.json())
  .then(data => {
    if (data.status !== "ZERO_RESULTS"){
      console.log(data.results[0].geometry.location)
      setCords(data.results[0].geometry.location);
  }})
  .catch((error) => alert("Please enter a valid City"))

}, [city])


useEffect(() => {
  const weatherAPI = "https://api.openweathermap.org/data/2.5/onecall?lat="+cords.lat+"&lon="+cords.lng+"&appid=27602453a9225f51de335289155da1a8&units=imperial"
  fetch(weatherAPI)
  .then((response) => response.json())
  .then((result) => {
    setCurrent(result.current)
    setDaily(result.daily.slice(1))
    setDailyWeather(result.daily)
    setCurrentWeather(result.current.weather)
  })
  
  .catch((error) => alert("Please restart the App"))
  .finally(() => setOpen(false))
}, [cords])


  return (
    <View style = {styles.background}>
      <ImageBackground source={imageOne} style={styles.image}>
      <SafeAreaView style = {styles.container}>

      <View style = {styles.currentTempContainer}>
      <TextInput
        style={styles.cityInput}
        onChangeText={(value) => {setCity(value);}} 
        value={number}
        placeholder="Enter City"
        placeholderTextColor = 'white'
        clearTextOnFocus/>
      </View>

      <View style = {styles.topContainer}>
        
      <View style = {styles.currentWeather}>
      <Text style = {styles.weatherFont}>{Math.round(current.temp)}°F</Text>
      <Image
      style={{
        width: 100,height: 100,marginLeft: 25,
        resizeMode: 'contain'
        }}
        source={{
        uri:
        'http://openweathermap.org/img/wn/'+currentWeather[0].icon+'@4x.png'
        }}
      />
      <View style ={styles.infoContainer}>
        <Text style = {styles.extrasFont}> High: {Math.round(dailyWeather[0].temp.max)}°F </Text>
        <Text style = {styles.extrasFont}> Low: {Math.round(dailyWeather[0].temp.min)}°F </Text>
        <Text style = {styles.extrasFont}>{currentWeather[0].main}</Text>
      </View>
      
      </View>
      <View style = {styles.spacer}>
        </View>
      
      </View>

      <View style = {styles.middleContainer}>
        <View style = {styles.extraContainer}>
        <View style = {styles.divider}>
        <Image
      style={{
        width: 35,height: 35,
        resizeMode: 'contain'
        }}
        source={{
        uri:
          "https://cdn.discordapp.com/attachments/536661075173703683/920324562929979412/2682842_breeze_fast_speed_weather_wind_icon-3.png"
        }}
      />
        <Text style={styles.extrasFont}>{Math.round(current.wind_speed)} MPH</Text>
        <Image
      style={{
        width: 35,height: 35,
        resizeMode: 'contain'
        }}
        source={{
        uri:
          "https://cdn.discordapp.com/attachments/536661075173703683/920323531730985041/2682806_light_radiation_rays_sun_ultraviolet_icon-4.png"
        }}
      />
        <Text style={styles.extrasFont}>{(current.uvi)}</Text>
        </View>
        <View style = {styles.divider}>
        <Image
      style={{
        width: 35,height: 35,
        resizeMode: 'contain'
        }}
        source={{
        uri:
          "https://cdn.discordapp.com/attachments/536661075173703683/920718032052035594/3741361_celcius_fahrenheit_thermometer_weather_icon-4.png"
        }}
      />
        <Text style={styles.extrasFont}>{Math.round(current.feels_like)}°F</Text>
        
        <Image
      style={{
        width: 35,height: 35,
        resizeMode: 'contain'
        }}
        source={{
        uri:
          "https://cdn.discordapp.com/attachments/536661075173703683/920718492632748102/3741359_cloud_overcast_weather_icon-3.png"
        }}
      />
        <Text style={styles.extrasFont}>{(current.clouds)}%</Text>
        </View>
        </View>
      </View>
      
      <View style = {styles.forecastSection}>
      <FlatList
              horizontal={true}
              data={daily}
              renderItem={({ item }) => (
                <View style={styles.forecastBox}>
                  <Text style = {styles.extrasFont}>{moment.unix(item.dt).format('dddd')}</Text>
                  <Image style={styles.icon}
                  source={{uri: `http://openweathermap.org/img/wn/${item.weather[0].icon}@4x.png`}}/>
                  <Text style={styles.extrasFont}>High: {Math.round(item.temp.max)}°F</Text>
                  <Text style={styles.extrasFont}>Low: {Math.round(item.temp.min)}°F</Text>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
      </View>

      </SafeAreaView>
      </ImageBackground>
    </View>
    
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%",
    backgroundColor: "black"
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%"
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    opacity: 0.8
  },
  currentTempContainer: {
    flex: 0.08,
    //backgroundColor: "red",
    width: "100%",
    marginTop: 10
  },
  cityInput: {
    width: "100%",
    height: "100%",
    fontSize: 33,
    //borderColor: "white",
    //textAlign: "center",
    color: "white",
    fontWeight: "bold",
    //backgroundColor: "black",
    marginLeft: 10,
    marginTop: 12
  },
  topContainer:{
    flex: 0.4,
    //backgroundColor: "yellow",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  middleContainer: {
    flex: 0.3,
    //backgroundColor: "blue",
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-end",
    padding: 10
  },
  forecastSection: {
    flex: 0.35,
    flexDirection: "row",
    //backgroundColor: "#000080",
    width: "100%",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 10
  },
  forecastBox: {
    flex: 0.35,
    margin: 5,
    backgroundColor: "black",
    borderRadius: 10,
    borderColor: "white",
    borderWidth: 1,
    width: 90,
    height: 200,
    opacity: 0.7,
    justifyContent: "center",
    alignItems: "center",
  },
  currentWeather: {
    flex: 0.6,
    backgroundColor: "black",
    borderRadius: 10,
    borderColor: "white",
    borderWidth: 1,
    width: "95%",
    height: "90%",
    opacity: 0.7,
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row"
  },
  infoContainer: {
    flex: 0.95,
    //backgroundColor: "black",
    width: "95%",
    height: "90%",
    opacity: 0.7,
    alignItems: "center",
    justifyContent: "center",
  },
  spacer:{
    flex: 0.3,
    //backgroundColor: "green",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: 'row',
  },
  addbuttonCont: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    width: 50,
    marginLeft: 15,
    marginRight: 25,
    marginTop: 10,
    height: 50,
    borderColor: "white",
    borderWidth: 1,
  },
  buttonText: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold"
},
  extraContainer: {
    backgroundColor: "black",
    borderRadius: 10,
    borderColor: "white",
    borderWidth: 1,
    width: "53%",
    height: "90%",
    opacity: 0.75,
    marginBottom: 80,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  divider: {
    //backgroundColor: "blue",
    borderRadius: 10,
    //borderColor: "white",
    //borderWidth: 1,
    width: "39%",
    height: "95%",
    opacity: 0.75,
    alignItems: "center",
    justifyContent: "center",
    margin: 5
  },
  weatherFont: {
    fontSize: 35,
    fontWeight: "bold",
    color: "white",
    marginLeft: 25
  },
  extrasFont: {
    fontSize: 12,
    fontWeight: "bold",
    color: "white",
    margin: 5
  },
  icon: {
    width: 60,
    height: 60,
    margin: 5, 
    resizeMode:'contain'
  }
  });