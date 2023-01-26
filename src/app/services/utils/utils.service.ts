import { Injectable } from '@angular/core';

@Injectable()
export class UtilsService {

    public memoize<T extends (...args: any[]) => any>(func: T): T {
      const cache: { [key: string]: any } = {};
      return function(...args: Parameters<T>): ReturnType<T> {
        const key = JSON.stringify(args);
        if (key in cache) {
          return cache[key];
        } else {
          const result = func(...args);
          cache[key] = result;
          return result;
        }
      } as T;
    }

}
