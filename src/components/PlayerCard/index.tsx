// Components
import ButtonIcon from "@components/ButtonIcon";

// Styles
import { Container, Icon, Name } from "./PlayerCard.styles";

interface IPlayerCardProps {
    name: string;
    onRemove: () => void;
}

const PlayerCard: React.FC<IPlayerCardProps> = ({ name, onRemove }) => {
    return (
        <Container>
            <Icon name="person" />
            <Name>{name}</Name>
            <ButtonIcon icon="close" type="SECONDARY" onPress={onRemove} />
        </Container>
    );
};

export default PlayerCard;
