import { playersListByGroup } from "./playersListByGroup";

export const playersListByGroupAndTeam = async (group: string, team: string) => {
    try {
        const players = await playersListByGroup(group);
    
        const playersByTeam = players.filter(player => player.team === team);
    
        return playersByTeam;
    } catch (error) {
        throw error;
    }
}