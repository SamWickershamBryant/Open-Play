
import AsyncStorage from "@react-native-async-storage/async-storage";

export class Court {
    constructor(name, players = [], inProgress = true) {
        this.name = name;
        this.players = players
        this.inProgress = inProgress
    }
    addPlayer(playerName) {
        if (this.players.length < 4) {
          this.players.push({name:playerName,winner:false});
          return true;
        }
        return false;
      }
    removePlayer(playerName) {
    const index = this.players.indexOf((ply) => ply.name === playerName);
    if (index > -1) {
        this.players.splice(index, 1);
        return true;
    }
    return false;
    }

    async save() {
        try {
          const courts = await Court.getAll();
          const index = courts.findIndex(court => court.name === this.name);
          if (index > -1) {
            courts[index] = this;
          } else {
            courts.push(this);
          }
          await AsyncStorage.setItem('courts', JSON.stringify(courts));
          return true;
        } catch (error) {
          console.error(error);
          return false;
        }
      }

      static async getAll() {
        try {
          const courtsJson = await AsyncStorage.getItem('courts');
          if (courtsJson) {
            const courts = JSON.parse(courtsJson).map(courtJson => new Court(courtJson.name, courtJson.players, courtJson.inProgress));
            return courts;
          } else {
            return [];
          }
        } catch (error) {
          console.error(error);
          return [];
        }
      }
      static async remove(courtName) {
        try {
          const courts = await Court.getAll();
          const index = courts.findIndex(court => court.name === courtName);
          if (index > -1) {
            courts.splice(index, 1);
            await AsyncStorage.setItem('courts', JSON.stringify(courts));
            return true;
          } else {
            return false;
          }
        } catch (error) {
          console.error(error);
          return false;
        }
      }
}