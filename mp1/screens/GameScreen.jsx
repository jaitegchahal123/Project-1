import React, { useState } from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";

import { styles } from "../constants/Styles";
import { nameToPic } from "../constants/Constants";
import { useEffect } from "react";
import { shuffle } from "../utils/ArrayUtils";
const names = Object.keys(nameToPic);

export default function GameScreen() {
  // TODO: Declare and initialize state variables here, using "useState".
  const [currScore, setcurrScore] = useState(0);
  const [totalAttempts, settotalAttempts] = useState(0);
  const [totalOptions, setTotalOptions] = ([]);
  const [correctImage, setCorrectImage] = useState('');
  const [correctName, setCorrectName] = useState('');
  const [nameOptions, setNameOptions] = useState([]);

  // State for the timer is handled for you.
  const [timeLeft, setTimeLeft] = useState(5000);

  // Called by the timer every 10 seconds
  const countDown = () => {
    if (timeLeft > 0) {
      // Time still left, so decrement time state variable
      setTimeLeft(timeLeft - 10);
    } else {
      // Time has expired
      // TODO: update appropriate state variables
      getNextRound();
      setTimeLeft(5000);
      settotalAttempts(totalAttempts+1);
    }
  };

  // This is used in the useEffect(...) hook bound on a specific STATE variable.
  // It updates state to present a new member & name options.

  //ASK -- how to know what totalOptions && correctIMAGE is if you don't know the type

  
  //const [correctName, setCorrectName] = ("");
  const getNextRound = () => {
    // Fetches the next member name to guess.
    let correct = names[Math.floor(Math.random() * names.length)];
    let correctName = nameToPic[correct][0];
    let correctImage = nameToPic[correct][1];


    // Generate 3 more wrong answers.
    let nameOptions = [correctName];
    while (nameOptions.length < 4) {
      let wrong = names[Math.floor(Math.random() * names.length)];
      let wrongName = nameToPic[wrong][0];
      if (!nameOptions.includes(wrongName)) {
        nameOptions.push(wrongName);
      }
    }
    nameOptions = shuffle(nameOptions);
    // TODO: Update state here.
    //setTotalOptions([nameOptions]);
  //  setCorrectName()
    setCorrectImage(correctImage);
    setCorrectName(correctName);
    setNameOptions(nameOptions);
    setTimeLeft(5000);
  };

  // Called when user taps a name option.
  // TODO: Update correct # and total # state values.
  const selectedNameChoice = (index) => {
    settotalAttempts(totalAttempts+1);
    if(nameOptions[index] == correctName){
      setcurrScore(currScore+1);
    }
    getNextRound();

  };

  // Call the countDown() method every 10 milliseconds.
  useEffect(() => {
    const timer = setInterval(() => countDown(), 10);
    return function cleanup() {
      clearInterval(timer);
    };
  });

  // TODO: Finish this useEffect() hook such that we automatically
  // get the next round when the appropriate state variable changes.
  useEffect(
    () => {
  //    if(timeLeft==0){
        getNextRound();
   //   }
    },
    [
      /* TODO: Your State Variable Goes Here */
     // [currScore, totalAttempts]
    ]
  );

  // Set up four name button components
  const nameButtons = [];
  for (let i = 0; i < 4; i++) {
    const j = i;
    nameButtons.push(
      // A button is just a Text component wrapped in a TouchableOpacity component.
      <TouchableOpacity
        key={j}
        style={styles.button}
        onPress={() => selectedNameChoice(j)}
      >
        <Text style={styles.buttonText}>
          {nameOptions[j]}
        </Text>
      </TouchableOpacity>
    );
  }

  const timeRemainingStr = (timeLeft / 1000).toFixed(2);

  // Style & return the view.
  return (
    <View style = {styles.container}>
      <Text style = {styles.scoreText}>
        Current Score: {currScore} / {totalAttempts}
      </Text>
      <Text style = {styles.timerText}>
        Time Remaining: {timeRemainingStr}
      </Text>
      <View style = {styles.image}>
        <Image style = {styles.image} source = {correctImage}>
        </Image>
      </View>
      <View>
        {nameButtons}
      </View>

    
    </View>
  );
  // return (
  //   <View>
  //     <Text style = {{
  //       fontFamily: "Avenir",
  //       fontWeight: "700",
  //       fontSize: 24,
  //       color: "#3498db",
  //       textAlign: "center",
  //       marginBottom: 10,
  //     }}> 
  //       Current Score: {currScore}/{totalAttempts}
  //     </Text>
  
  //     <Text style = {{
  //       fontFamily: "Avenir",
  //       fontWeight: "700",
  //       fontSize: 24,
  //       color: "#e74c3c",
  //       textAlign: "center",
  //       marginBottom: 30,
  //     }}> 
  //       Time Remaining: {timeRemainingStr}
  //     </Text>
  
  //      <Image
  //       style = {styles.image}
  //       source = {correctImage}
  //     /> 
  //     {nameButtons};
  //   </View>
  // );
}
