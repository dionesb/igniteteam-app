import AsyncStorage from "@react-native-async-storage/async-storage";

// Storage config
import { PLAYER_COLLECTION } from "@storage/storageConfig";

// Storage
import { playersListByGroup } from "./playersListByGroup";

// DTO
import { PlayerStorageDTO } from "./PlayerStorageDTO";

export const playersRemoveByGroup = async(playerName: string, group: string) => {
    try {
        const storage = await playersListByGroup(group);

        const filtered = storage.filter(item => item.name !== playerName);
        const players = JSON.stringify(filtered);

        await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, players);
    } catch (error) {
        throw error;
    }
}