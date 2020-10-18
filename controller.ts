import AutoModel, { ModelManager } from './model';
import { RequestHandler, Request, Response, NextFunction } from 'express';
import userInstagram from 'user-instagram';

const userInstagram = require('user-instagram');

export default class Controller {
  static async getAutoOrders() {
    try {
      const orders = await ModelManager.getAutoOrders();
      const results = [];
      for (const user of orders) {
        results.push(userInstagram(user.username));
      }
      const ress = await Promise.all(results);
      const mapres = ress.map((res, idx) => {
        const post: {
          url: string;
          lastPost: string;
          type: 'image' | 'video';
          startCount: number;
          username: string;
        } = {} as any;
        if (res.posts[0]) {
          const posts = res.posts[0];
          post.url = posts?.url;
          post.lastPost = posts?.url;
          post.type = posts?.isVideo ? 'video' : 'image';
          post.startCount = posts?.likesCount;
          post.username = orders[idx].username;
        }
        return post;
      });

      for (const p of mapres) {
        await ModelManager.update(p);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
