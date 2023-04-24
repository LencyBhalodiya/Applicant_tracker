export interface IApplicants {
  id: number;
  name: string;
  stream: string;
  stage: string;
  status: string;
}
export interface IRoles {
  createdBy: string;
  id: number;
  permissions: {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
  };
  rolename: string;
  updatedBy: string;
}
