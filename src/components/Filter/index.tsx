import { TouchableOpacityProps } from "react-native";

// Styles
import { Container, Title, FilterStyleProps } from "./Filter.styles";

interface IFilterProps extends TouchableOpacityProps, FilterStyleProps {
    title: string;
}

const Filter: React.FC<IFilterProps> = ({
    title,
    isActive = false,
    ...rest
}) => {
    return (
        <Container isActive={isActive} {...rest}>
            <Title>{title}</Title>
        </Container>
    );
};

export default Filter;
