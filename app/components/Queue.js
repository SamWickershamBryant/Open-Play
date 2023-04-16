import { getData, saveData } from "./DataStorage";
import { useState, useEffect, useCallback } from "react";

export const useQueue = () => {
    const [queue, setQueue] = useState([]);

    useEffect(() => {
      //console.log("ENTRY")
      //console.log("SOMETHING CHANGED?")
    
      return () => {
        
      }
    }, [queue])
    
  
    const enqueue = useCallback((item) => {
      setQueue(prevQueue => [...prevQueue, item]);
    }, []); // dependencies for callback
  
    const dequeue = useCallback((amt) => {
      if (queue.length < amt) return;
    
      const playersToDequeue = queue.slice(0, amt);
    
      setQueue((prevQueue) => {
        // Update the queue with the remaining players
        const updatedQueue = prevQueue.slice(amt);
    
        // Save the updated queue
        return updatedQueue;
      });
    
      // Return the dequeued players
      return playersToDequeue;
    }, [queue]);
    
  
    return { queue, enqueue, dequeue };
  };