import { Text, TextInput, View } from "react-native";

export default function EditProfile()
{
    return(
        <View>
          <Text>Name</Text>
          <TextInput placeholder="Enter Name" type/>  
          <Text>Email</Text>
          <TextInput placeholder="Enter Name" keyboardType='email-address'/>
          <Text>Age</Text>
          <TextInput placeholder="Enter Name" keyboardType='number-pad'/>
          <Text>Contact No.</Text>
          <TextInput placeholder="Enter Name" keyboardType='number-pad'/>
          
        </View>
    );
}