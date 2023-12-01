import { TouchableOpacity, Text } from "react-native";

export default Button = ({ children, onPress, textSize }) => {
    return (
        <TouchableOpacity onPress={onPress} style={{ paddingVertical: 2, paddingHorizontal: 10, alignItems: 'center', borderRadius: 10, borderColor: 'black', backgroundColor: '#D9D9D9', borderWidth: "2", width:"auto" }}><Text style={{ fontSize: textSize, width:"auto" }}>{children}</Text></TouchableOpacity>
    )
}