import * as mongodb from 'mongodb';

export class MongoHelper {
  public static client: mongodb.MongoClient;

  public static connect(url: string) {
    return new Promise((resolve, rejects) => {
      mongodb.MongoClient.connect(url).catch((err) => {
        if (err) {
          rejects(err);
        } else {
          resolve(MongoHelper.client);
        }
      });
    });
  }
}
