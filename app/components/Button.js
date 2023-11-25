import { TouchableOpacity } from "react-native";

export default Button = ({ children, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={{ paddingVertical: 2, paddingHorizontal: 10, alignItems: 'baseline', borderRadius: 10, borderColor: 'black', backgroundColor: '#D9D9D9', borderWidth: "2" }}>{children}</TouchableOpacity>
    )
}