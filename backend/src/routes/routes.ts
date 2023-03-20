// routes.ts
import { Request, Response } from 'express';

export function handleHome(req: Request, res: Response) {
  res.render('index', { message: 'Hello World' });
}

export function handleAbout(req: Request, res: Response) {
  res.render('about');
}
