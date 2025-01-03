import { Text, View, Image, Pressable, ScrollView } from "react-native";
import React from "react";

export default function LoginScreen() {
  return (
    <ScrollView 
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'space-between',
        backgroundColor: '#fff',
      }}
    >
      {/* Image Section */}
      <Image 
        source={require('./../../assets/images/login.png')} 
        style={{
          width: '100%',
          height: 500,
        }}
      />
      
      {/* Text Section */}
      <View 
        style={{
          padding: 20,
          alignItems: 'center',
        }}
      >
        <Text 
          style={{
            textAlign: 'center',
            fontSize: 30,
            fontFamily: 'outfit-bold',
          }}
        >
          Ready to make a new friend?
        </Text>

        <Text 
          style={{
            fontFamily: 'outfit',
            fontSize: 18,
            textAlign: 'center',
            marginVertical: 10,
            color: '#94949', 
          }}
        >
          Let's adopt the pet which you like and make their life happy again
        </Text>
      </View>

      {/* Button Section */}
      <View 
        style={{
          padding: 20,
          alignItems: 'center',
        }}
      >
        <Pressable
          style={{
            paddingVertical: 14,
            backgroundColor: '#e88504', 
            width: '100%',
            borderRadius: 14,
          }}
          onPress={() => alert("Get Started Pressed")}
        >
          <Text
            style={{
              fontSize: 20,
              fontFamily: 'outfit-medium',
              textAlign: 'center',
              color: '#fff', 
            }}
          >
            Get Started
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
