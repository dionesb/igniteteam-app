import { TouchableOpacityProps } from "react-native";

// Styles
import { Container, Title, ButtonTypeStyleProps } from "./Button.styles";

interface IButtonProps extends TouchableOpacityProps {
    title: string;
    type?: ButtonTypeStyleProps;
}

const Button: React.FC<IButtonProps> = ({ title, type = 'PRIMARY', ...rest }) => (
    <Container type={type} {...rest}>
        <Title>
            {title}
        </Title>
    </Container>
)

export default Button;