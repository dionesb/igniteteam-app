import AsyncStorage from "@react-native-async-storage/async-storage";

// Storage config
import { PLAYER_COLLECTION } from "@storage/storageConfig";

// DTO
import { PlayerStorageDTO } from "./PlayerStorageDTO";

export const playersListByGroup = async(group: string) => {
    try {
        const storage = await AsyncStorage.getItem(`${PLAYER_COLLECTION}-${group}`);

        const players: PlayerStorageDTO[] = storage ? JSON.parse(storage) : [];

        return players;
    } catch (error) {
        throw error;
    }
}