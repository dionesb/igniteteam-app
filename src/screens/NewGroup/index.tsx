import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

// Utils
import { AppError } from "@utils/AppErros";

// Storage
import { groupCreate } from "@storage/group/groupCreate";

// Components
import Header from "@components/Header";
import HighLight from "@components/HighLight";
import Button from "@components/Button";
import Input from "@components/Input";

// styles
import { Container, Content, Icon } from "./NewGroup.styles";
import { Alert } from "react-native";

const NewGroup = () => {
    const navigation = useNavigation();

    const [group, setGroup] = useState('');

    const handleNew = async () => {
        try {
            if (group.trim().length === 0) {
                return Alert.alert('Novo Group', 'Informe o nome da turma.');
            }

            await groupCreate(group);

            navigation.navigate('players', { group });
        } catch (error) {
            if (error instanceof AppError) {
                Alert.alert('Novo Group', error.message);
            } else {
                Alert.alert('Novo Group', 'Não foi possível criar um novo group.');
                console.log('error:', error);
            }
        }
    }

    return (
        <Container>
            <Header showBackButton />
            <Content>
                <Icon />
                <HighLight
                    title="Nova turma"
                    subtitle="crie a turma para adicionar as pessoas"
                />
                <Input placeholder="Nome da turma" onChangeText={setGroup} />
                <Button title="Criar" style={{ marginTop: 20 }} onPress={handleNew} />
            </Content>
        </Container>
    );
};

export default NewGroup;
