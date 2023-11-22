export interface SmashProto {
  metadata: {
    // milliseconds since epoch
    createdAt: number;
  };

  // the id of the fly that was smashed
  flyId: string;
}
