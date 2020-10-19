import AutoModel, { ModelManager } from './model';
import { RequestHandler, Request, Response, NextFunction } from 'express';
import userInstagram from 'user-instagram';

export default class Controller {
  static async getAutoOrders(req: Request, res: Response, next) {
    try {
      const orders = await ModelManager.getAutoOrders();
      const results: Array<any> = [];
      for (const user of orders) {
        if (user && user?.username) {
          results.push(userInstagram(user.username));
        }
      }
      try {
        const ress = await Promise.all(results);
        const mapres = ress.map((result, idx) => {
          const post: {
            url: string;
            lastPost: string;
            type: 'image' | 'video';
            startCount: number;
            username: string;
          } = {} as any;
          if (result?.posts[0]) {
            const posts = result.posts[0];
            post.url = posts?.url;
            post.lastPost = posts?.url;
            post.type = posts?.isVideo ? 'video' : 'image';
            post.startCount = posts?.likesCount;
            post.username = orders[idx]?.username;
          }
          return post;
        });

        for (const p of mapres) {
          try {
            await ModelManager.update(p);
          } catch (error) {
            console.log(error);
          }
        }
        res.send(mapres);
      } catch (error) {
        res.send({ error: 'Error ' + error });
      }
    } catch (error) {
      console.log(error);
    }
  }
}
