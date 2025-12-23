import { LRUCache } from 'lru-cache';

export const rateLimit = (options: { interval: number; uniqueTokenPerInterval: number }) => {
  
  const tokenCache = new LRUCache({
    max: options.uniqueTokenPerInterval || 500,
    ttl: options.interval || 60000,
  });

  return {
    check: (limit: number, token: string) => {
      const tokenCount = (tokenCache.get(token) as number[]) || [0];
      if (tokenCount[0] === 0) {
        tokenCache.set(token, tokenCount);
      }
      tokenCount[0] += 1;

      const currentUsage = tokenCount[0];
      const isRateLimited = currentUsage > limit;
      
      return {
        isRateLimited,
        currentUsage,
        limit
      };
    },
  };

};

// Dakikada 1000 farklı IP'ye kadar takip et, 10 saniye cache tut
export const limiter = rateLimit({
  interval: 10000, 
  uniqueTokenPerInterval: 1000,
});