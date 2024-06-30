import { useEffect, useRef, useState } from "react";
import { Alert, FlatList, TextInput } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

// Utils
import { AppError } from "@utils/AppErros";

// Storage
import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { playersListByGroupAndTeam } from "@storage/player/playersListByGroupAndTeam";

// Components
import Header from "@components/Header";
import HighLight from "@components/HighLight";
import ButtonIcon from "@components/ButtonIcon";
import Input from "@components/Input";
import Filter from "@components/Filter";
import PlayerCard from "@components/PlayerCard";
import ListEmpty from "@components/ListEmpty";
import Button from "@components/Button";
import Loading from "@components/Loading";

// Styles
import { Container, Form, HeaderList, NumberOfPlayers } from "./Players.styles";

// Interface
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { playersRemoveByGroup } from "@storage/player/playersRemoveByGroup";
import { groupRemoveByName } from "@storage/group/groupRemoveByName";

type RouteParams = {
    group: string;
};

const Players = () => {
    const [isLoading, seIsLoading] = useState(true);
    const [team, setTeam] = useState("Time A");
    const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
    const [newPlayerName, setNewPlayerName] = useState("");

    const navigation = useNavigation();

    const newPlayerNameinputRef = useRef<TextInput>(null);

    const route = useRoute();
    const { group } = route.params as RouteParams;

    const handleAddPlayer = async () => {
        if (newPlayerName.trim().length === 0) {
            return Alert.alert(
                "Nova pessoa",
                "Informe o nome da pessoa para adicionar."
            );
        }

        const newPlayer = {
            name: newPlayerName,
            team,
        };

        try {
            await playerAddByGroup(newPlayer, group);

            newPlayerNameinputRef.current?.blur();
            setNewPlayerName("");

            fetchPlayersByTeam();
        } catch (error) {
            if (error instanceof AppError) {
                Alert.alert("Nova pessoa", error.message);
            } else {
                Alert.alert("Nova pessoa", "Não foi possível adicionar.");
                console.log("error:", error);
            }
        }
    };

    const fetchPlayersByTeam = async () => {
        try {
            seIsLoading(true);

            const playersByTeam = await playersListByGroupAndTeam(group, team);

            setPlayers(playersByTeam);
        } catch (error) {
            console.log("error:", error);
            Alert.alert("Pessoas", "Não foi possível carregar as pessoas.");
        } finally {
            seIsLoading(false);
        }
    };

    const handleRemovePlayer = async (playerName: string) => {
        try {
            await playersRemoveByGroup(playerName, group);

            fetchPlayersByTeam();
        } catch (error) {
            if (error instanceof AppError) {
                Alert.alert("Remove player", error.message);
            } else {
                console.log("error:", error);
                Alert.alert("Remove o player", "Não foi possível remover o player.");
            }
        }
    };

    const removeGroup = async () => {
        try {
            await groupRemoveByName(group);

            navigation.navigate("groups");
        } catch (error) {
            console.log("error:", error);
            Alert.alert("Remover a turma", "Não foi possível remover a turma.");
        }
    };

    const handleRemoveGroup = async () => {
        Alert.alert("Remover", "Deseja remover a turma?", [
            { text: "Não", style: "cancel" },
            { text: "Sim", onPress: removeGroup },
        ]);
    };

    const renderPlayersList = () =>
        isLoading ? (
            <Loading />
        ) : (
            <FlatList
                data={players}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => (
                    <PlayerCard
                        name={item.name}
                        onRemove={() => handleRemovePlayer(item.name)}
                    />
                )}
                ListEmptyComponent={() => (
                    <ListEmpty message="Não pessoas nesse time." />
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[
                    { paddingBottom: 100 },
                    players.length === 0 && { flex: 1 },
                ]}
            />
        );

    useEffect(() => {
        fetchPlayersByTeam();
    }, [team]);

    return (
        <Container>
            <Header showBackButton />
            <HighLight title={group} subtitle="adicione a galera e separe os times" />
            <Form>
                <Input
                    inputRef={newPlayerNameinputRef}
                    placeholder="Nome da pessoa"
                    autoCorrect={false}
                    value={newPlayerName}
                    onChangeText={setNewPlayerName}
                    onSubmitEditing={handleAddPlayer}
                    returnKeyType="done"
                />
                <ButtonIcon icon="add" type="PRIMARY" onPress={handleAddPlayer} />
            </Form>
            <HeaderList>
                <FlatList
                    data={["Time A", "Time B"]}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                        <Filter
                            title={`${item}`}
                            isActive={item === team}
                            onPress={() => setTeam(item)}
                        />
                    )}
                    horizontal
                />
                <NumberOfPlayers>{players.length}</NumberOfPlayers>
            </HeaderList>
            {renderPlayersList()}
            <Button
                title="Remover turma"
                type="SECONDARY"
                onPress={handleRemoveGroup}
            />
        </Container>
    );
};

export default Players;
