import AsyncStorage from "@react-native-async-storage/async-storage";

// Storage config
import { GROUP_COLLECTION } from "@storage/storageConfig";

// Utils
import { AppError } from "@utils/AppErros";

import { groupsListAll } from "./groupsListAll";

export const groupCreate = async(newGroup: string) => {
    try {
        const storedGroups = await groupsListAll();

        const groupAlreadyExists = storedGroups.includes(newGroup);

        if(groupAlreadyExists) {
            throw new AppError('Já existe um grupo cadastrado com esse nome.');
        }

        const storage = JSON.stringify([...storedGroups, newGroup]);
        await AsyncStorage.setItem(GROUP_COLLECTION, storage);
    } catch (error) {
        throw error;
    }
}