import React from "react";
import { View, Text } from "react-native";
import YoutubeIframe from "react-native-youtube-iframe";

export default function Video( /*{props}*/{linkVideo}) {
    //const {linkVideo}=props
  return (
    <View>
      <YoutubeIframe
      height={230}
      play={true}//reproduce automaticamente
      videoId={linkVideo}
      />
    </View>
  );
}
