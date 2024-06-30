import { TouchableOpacityProps } from "react-native";

// Styles
import { Container, Icon, Title } from "./GroupCard.styles";

// Interfaces
interface IGroupCardProps extends TouchableOpacityProps {
    title: string;
}

const GroupCard: React.FC<IGroupCardProps> = ({ title, ...rest }) => {
    return (
        <Container {...rest}>
            <Icon />
            <Title>
                {title}
            </Title>
        </Container>
    )
}

export default GroupCard;