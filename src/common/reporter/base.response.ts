import { ErrorCodes } from "../constants/errorCodes";


export class BaseResponse {
  constructor(
    public code: number,
    public message: string,
    public data: any,
    public success: boolean = false,
    public statusCode: number = 400,
    public time = new Date()
  ) { }
  public static UnknownError(data?: any) {
    return new BaseResponse(ErrorCodes.BASE, 'Unknown error!', data);
  }
  public static ValidationError(data?: any) {
    return new BaseResponse(ErrorCodes.BASE + 1, 'Validation Error!', data);
  }

  public static Success(data: any = null) {    
    return new BaseResponse(0, 'OK', data, true, 200)
  }

  public static UnAuthorizationError(data: any = null) {
    return new BaseResponse(401, 'Session expired!', data, false, 401)
  }
  
  public static NotFound(data: any = null) {
    return new BaseResponse(404, 'Not found!', data, false, 404)
  }

  public static PositionError(data: any = null) {
    return new BaseResponse(400, 'Position error!', data);
  }
  public static UploadError(data: any = null) {
    return new BaseResponse(200, 'Upload error', data);
  }
}
