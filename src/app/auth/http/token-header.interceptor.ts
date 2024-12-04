import type { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../enviroments/environments';

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
    //console.log('CLONE: ',cloneReq);
    return next(cloneReq);
  }

  return next(req);
};
