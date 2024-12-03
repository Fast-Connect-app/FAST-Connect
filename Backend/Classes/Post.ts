import { GetDatabaseAdapter } from "../DatabaseFactory/DatabaseAdapterFactory";
import { FirebaseAdapterFactory } from "../DatabaseFactory/FirebaseAdapterFactory";
import { IJSONData } from "./IDatabaseAdapter";

export class Post {
  private authorid: string;
  private postID: number;
  private likes: number;
  private content: string;
  private base64encoded: string;

  constructor(
    _authorid: string,
    _postID: number,
    _likes: number,
    _content: string,
    _image: string
  ) {
    this.authorid = _authorid;
    this.postID = _postID;
    this.likes = _likes;
    this.content = _content;
    this.base64encoded = _image;
  }

  public static GetDatabaseAdapter() {
    return GetDatabaseAdapter<"Post">(FirebaseAdapterFactory, "Posts");
  }

  public GetJsonData(): object {
    const data = { ...this };
    return data;
  }

  public static fromFirebaseJson(data: {
    authorId: string;
    postId: number;
    likes: number;
    content: string;
    image: string;
  }): Post {
    return new Post(
      data.authorId,
      data.postId,
      data.likes,
      data.content,
      data.image
    );
  }

  public GetAuthorId(): string {
    return this.authorid;
  }

  public GetPostId(): number {
    return this.postID;
  }

  public GetLikes(): number {
    return this.likes;
  }

  public GetContent(): string {
    return this.content;
  }

  public GetImage(): string {
    return this.base64encoded;
  }
}
