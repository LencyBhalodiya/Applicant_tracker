export interface IApplicants {
    id:number,
    firstname: string,
    lastname: string,
    stream: string,
    stage: string,
    status: string,
    round:string
}

export interface Stage {
    stageId: number;
    stageName: string;
    createdTime: string;
    createdBy: string;
    isActive: boolean;
    rounds: Round[];
  }
  
  export interface Round {
    roundId: number;
    roundName: string;
    createdTime: string;
    createdBy: string;
  }
  
  export interface UpdateFeedbackForm{
      status:string;
      review:string;
      futureRef:string;
      end_date:string;
      id:number;
      tracking : {
          tid:number;
      }
  }
  
  export interface PromoteForm{
      stage: string;
      round: string,
      start_date: string,
      end_date: string,
      status: string,
      tracking: {
          tid: number
      }
  }
  
  
  export interface BulkUpdateFeedbackForm {
      ids:IDs[],
      data: {
          status: string,
          review: string,
          futureRef: string,
          end_date: string
      }
  }
  
  export interface BulkUpdateCreateForm{
      ids: ID[],
      data: {
          stage: string,
          round: string,
          start_date: string,
          end_date: string,
          status: string
      }
  }
  
  export type IDs= {
      id:number,
      trackingId:number
    }
  
  export type ID = {
      trackingId:number;
  }

  export interface INewApplicants {
    id:number,
    name: string,
    stream: string,
}