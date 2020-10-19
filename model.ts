import { Schema, Document, model, Types } from 'mongoose';

type IAuto = {
  username: string;
  postsCount: number;
  postsLeft: number;
  recentPosts: string[];
} & Document;

const AutoSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    postsCount: {
      type: Number,
      required: true,
    },
    postsLeft: {
      type: Number,
    },
    lastPost: {
      type: String,
    },
    type: {
      type: String,
    },
    recentPosts: {
      type: [String],
    },
  },
  { timestamps: true }
);

const AutoModel = model<IAuto>('Auto', AutoSchema, 'auto');
export default AutoModel;

export class ModelManager {
  public static async getAutoOrders(): Promise<any> {
    const users = await AutoModel.find();
    return users;
  }

  public static async update(post: any): Promise<any> {
    try {
      const user = await AutoModel.updateOne(
        { username: post.username },
        {
          ...post,
          // $addToSet: { recentPosts: post.url },
        }
      ); //.lean().exec()
      return user;
    } catch (error) {
      throw new Error(`error occurred: ${error}`);
    }
  }
}
