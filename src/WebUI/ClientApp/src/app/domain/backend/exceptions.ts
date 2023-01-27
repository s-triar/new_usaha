export class CustomExceptionError{
    detail:string;
    status:number;
    title:string;
    type:string;
}

export class NotFoundExceptionError extends CustomExceptionError {}
export class BadRequestExceptionError extends CustomExceptionError {}
export class ForbiddenAccessExceptionError extends CustomExceptionError {}
export class UnAuthorizedAccessExceptionError extends CustomExceptionError {}