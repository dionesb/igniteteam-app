import { useState, useCallback } from "react";
import { Alert, FlatList } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

// Storage
import { groupsListAll } from "@storage/group/groupsListAll";

// Components
import HighLight from "@components/HighLight";
import Header from "@components/Header";
import GroupCard from "@components/GroupCard";
import Button from "@components/Button";
import ListEmpty from "@components/ListEmpty";
import Loading from "@components/Loading";

// Styles
import { Container } from "./Groups.styles";

const Groups = () => {
    const [isLoading, seIsLoading] = useState(true);
    const [groups, setGroups] = useState<string[]>([]);

    const navigation = useNavigation();

    const handleNewGroup = () => {
        navigation.navigate("new");
    };

    const fetchGroups = async () => {
        try {
            seIsLoading(true);

            const storageGroups = await groupsListAll();

            setGroups(storageGroups);
        } catch (error) {
            console.log("error:", error);
            Alert.alert("Turmas", "Não foi possível carregar as turmas.");
        } finally {
            seIsLoading(false);
        }
    };

    const handleOpenGroup = (group: string) => {
        navigation.navigate("players", { group });
    };

    const renderGroupsList = () =>
        isLoading ? (
            <Loading />
        ) : (
            <FlatList
                data={groups}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                    <GroupCard title={item} onPress={() => handleOpenGroup(item)} />
                )}
                contentContainerStyle={groups.length === 0 && { flex: 1 }}
                ListEmptyComponent={() => (
                    <ListEmpty message="Que tal cadastrar a primeira turma?" />
                )}
            />
        );

    useFocusEffect(
        useCallback(() => {
            fetchGroups();
        }, [])
    );

    return (
        <Container>
            <Header />
            <HighLight title="Turmas" subtitle="jogue com a sua turma" />
            {renderGroupsList()}
            <Button title="Criar nova turma" onPress={handleNewGroup} />
        </Container>
    );
};

export default Groups;
