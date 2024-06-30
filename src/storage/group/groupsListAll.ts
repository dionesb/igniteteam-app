import AsyncStorage from "@react-native-async-storage/async-storage";

// Storage config
import { GROUP_COLLECTION } from "@storage/storageConfig";

export const groupsListAll = async() => {
    try {
        const storage = await AsyncStorage.getItem(GROUP_COLLECTION);
        
        const groups: string[] = storage ? JSON.parse(storage) : [];

        return groups;
    } catch (error) {
        throw error;
    }
}