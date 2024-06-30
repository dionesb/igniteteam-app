import AsyncStorage from "@react-native-async-storage/async-storage";

// Storage config
import { GROUP_COLLECTION, PLAYER_COLLECTION } from "@storage/storageConfig";

// Utils
import { AppError } from "@utils/AppErros";

import { groupsListAll } from "./groupsListAll";

export const groupRemoveByName = async(groupName: string) => {
    try {
        const storedGroups = await groupsListAll();

        const groups = storedGroups.filter(group => group !== groupName);

        await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify(groups));

        await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${groupName}`); 
    } catch (error) {
        throw error;
    }
}