import { TouchableOpacity, Text } from "react-native";

export default Button = ({ children, onPress, textSize }) => {
    return (
        <TouchableOpacity onPress={onPress} style={{ paddingVertical: 2, paddingHorizontal: 10, alignItems: 'baseline', borderRadius: 10, borderColor: 'black', backgroundColor: '#D9D9D9', borderWidth: "2" }}><Text style={{ fontSize: textSize }}>{children}</Text></TouchableOpacity>
    )
}