import { useNavigation } from "@react-navigation/native";

// Assets
import logoImg from "@assets/logo.png";

// Styles
import { Container, Logo, BackIcon, BackButton } from "./Header.styles";

// Interface
interface IHeaderProps {
    showBackButton?: boolean;
}

const Header: React.FC<IHeaderProps> = ({ showBackButton = false }) => {
    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.navigate('groups');
    }

    const renderBackButton = () =>
        showBackButton && (
            <BackButton onPress={handleGoBack}>
                <BackIcon />
            </BackButton>
        );

    return (
        <Container>
            {renderBackButton()}
            <Logo source={logoImg} />
        </Container>
    );
};

export default Header;
