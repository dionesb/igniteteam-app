import { Container, Message } from "./ListEmpty.styles";

interface IListEmptyProps {
    message: string;
}

const ListEmpty: React.FC<IListEmptyProps> = ({ message }) => (
    <Container>
        <Message>
            {message}
        </Message>
    </Container>
)

export default ListEmpty;