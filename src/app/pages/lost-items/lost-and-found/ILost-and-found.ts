export interface IlostAndPages {
  _id: number;
  name: string;
  description: string;
  status: number;
  creation_date: string;
  attachment_path: string;
  claim_date: Date;
  claimer: number;
  safekeeper: string;
}
