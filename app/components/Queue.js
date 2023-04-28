import { useState, useEffect, useCallback } from "react";

export const useQueue = () => {
    const [queue, setQueue] = useState([]);

    useEffect(() => {
      //console.log("ENTRY")
      //console.log("SOMETHING CHANGED?")
    
      return () => {
        
      }
    }, [queue])
    
    const exitQueue = useCallback((name) => {
      setQueue(prevQueue => prevQueue.filter(item => item.name !== name));
    }, []);
  
    const enqueue = useCallback((item) => {
      setQueue(prevQueue => [...prevQueue, item]);
    }, []); // dependencies for callback
  
    const dequeue = useCallback((amt, rank=0) => {
      if (queue.length < amt) return;
    
      let playersToDequeue = queue.filter((plyr) => plyr.rank === rank)
      if (playersToDequeue.length < amt) {
        let remainingPlayers = queue.filter((player) => player.rank !== rank);
        playersToDequeue = playersToDequeue.concat(
          remainingPlayers.slice(0, amt - playersToDequeue.length)
        );
      } else {
        // If there are more players with the same rank, take only the required amount
        playersToDequeue = playersToDequeue.slice(0, amt);
      }
    
      setQueue((prevQueue) => {
        // Update the queue with the remaining players
        const updatedQueue = prevQueue.filter((plyr) => {
          const index = playersToDequeue.findIndex((dplyr) => dplyr.name === plyr.name)
          return index === -1
        })
    
        // Save the updated queue
        return updatedQueue;
      });
    
      // Return the dequeued players
      return playersToDequeue;
    }, [queue]);
    
  
    return { queue, enqueue, dequeue, exitQueue };
  };