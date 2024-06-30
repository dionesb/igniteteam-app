import AsyncStorage from "@react-native-async-storage/async-storage";

// Storage config
import { PLAYER_COLLECTION } from "@storage/storageConfig";

// DTO
import { PlayerStorageDTO } from "./PlayerStorageDTO";

// Utils
import { AppError } from "@utils/AppErros";

import { playersListByGroup } from "./playersListByGroup";

export const playerAddByGroup = async(newPlayer: PlayerStorageDTO, group: string) => {
    try {
        const storedPlayers = await playersListByGroup(group);
        console.log('teste storedPlayers:', storedPlayers);
        const playerAlreadyExists = storedPlayers.filter(player => player.name === newPlayer.name);
        console.log('teste playerAlreadyExists:', playerAlreadyExists);
        if(playerAlreadyExists.length > 0) {
            throw new AppError('Essa pessoa já está adicionada em um time aqui.');
        }
        
        const storage = JSON.stringify([...storedPlayers, newPlayer]);
        await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage);
    } catch (error) {
        throw error;
    }
}