import type { HttpInterceptorFn } from '@angular/common/http';

export const tokenHeaderInterceptor: HttpInterceptorFn = (
  req,
  next
) => {
  const token = 'TOKEN';

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
