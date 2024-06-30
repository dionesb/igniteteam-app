import { TouchableOpacityProps } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

// Styles
import { Container, Icon, ButtonIconTypeStyleProps } from "./ButtonIcon.styles";

// Interface
interface IButtonIconProps extends TouchableOpacityProps {
    icon: keyof typeof MaterialIcons.glyphMap;
    type?: ButtonIconTypeStyleProps;
}

const ButtonIcon: React.FC<IButtonIconProps> = ({ icon, type = "PRIMARY", ...rest }) => {
    return (
        <Container {...rest}>
            <Icon name={icon} type={type} />
        </Container>
    )
}

export default ButtonIcon;