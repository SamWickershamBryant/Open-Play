import { getData, saveData } from "./DataStorage";
import { useState, useEffect, useCallback } from "react";

export const useQueue = () => {
    const [queue, setQueue] = useState([]);

    useEffect(() => {
      //console.log("ENTRY")
      console.log("SOMETHING CHANGED?")
    
      return () => {
        
      }
    }, [queue])
    
  
    const enqueue = useCallback((item) => {
      setQueue([...queue, item]);
    }, [queue]); // dependencies for callback
  
    const dequeue = useCallback(() => {
      if (queue.length === 0) {
        return null;
      }
      const item = queue[0];
      setQueue(queue.slice(1));
      return item;
    }, [queue]);
  
    return { queue, enqueue, dequeue };
  };