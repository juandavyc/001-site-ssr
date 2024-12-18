import type { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const tokenHeaderInterceptor: HttpInterceptorFn = (
  req,
  next
) => {
  const token = environment.token;

  if(token){

    const cloneReq = req.clone({
      setHeaders:{
        Authorization: `Bearer ${token}`
      }
    })
    return next(cloneReq);
  }

  return next(req);
};
