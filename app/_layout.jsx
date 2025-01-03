import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SecureStore from "expo-secure-store";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";

// Define your publishable key here
const publishableKey = "pk_test_cHJvZm91bmQtYXJhY2huaWQtMjQuY2xlcmsuYWNjb3VudHMuZGV2JA";

// Create a token cache for SecureStore
const createTokenCache = () => {
  return {
    getToken: async (key) => {
      try {
        const item = await SecureStore.getItemAsync(key);
        if (item) {
          console.log(`${key} was retrieved successfully 🔐`);
        } else {
          console.warn(`No value stored under key: ${key}`);
        }
        return item;
      } catch (error) {
        console.error(`Error retrieving key "${key}":`, error);
        await SecureStore.deleteItemAsync(key); // Optional cleanup
        return null;
      }
    },
    saveToken: async (key, token) => {
      if (!token) {
        console.error("Cannot store a null or undefined token.");
        return;
      }
      try {
        await SecureStore.setItemAsync(key, token);
        console.log(`${key} was saved successfully 🔐`);
      } catch (error) {
        console.error(`Error saving key "${key}":`, error);
      }
    },
  };
};

// Example usage of token cache
const useTokenCache = async () => {
  const tokenCache = createTokenCache();

  // Save the publishable key
  await tokenCache.saveToken("publishableKey", publishableKey);

  // Retrieve the publishable key
  const storedKey = await tokenCache.getToken("publishableKey");
  console.log("Retrieved Publishable Key:", storedKey);
};

// Call the async function to execute the above logic
useTokenCache().catch((error) => {
  console.error("Error in useTokenCache:", error);
});

export default function RootLayout() {
  console.log("Publishable Key (direct):", publishableKey);

  // Load custom fonts
  const [fontsLoaded] = useFonts({
    outfit: require("./../assets/fonts/Outfit-Regular.ttf"),
    "outfit-medium": require("./../assets/fonts/Outfit-Medium.ttf"),
    "outfit-bold": require("./../assets/fonts/Outfit-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null; // Or a loading spinner
  }

  // Return the layout with ClerkProvider
  return (
    <ClerkProvider
      tokenCache={createTokenCache()}
      publishableKey={publishableKey}
    >
      <ClerkLoaded>
        <Stack>
          <Stack.Screen name="index" />
          <Stack.Screen
            name="Login/index"
            options={{ headerShown: false }}
          />
        </Stack>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
