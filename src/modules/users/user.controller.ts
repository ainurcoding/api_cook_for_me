import { Request, Response } from 'express';
import { createUser } from './user.service';
import { toZonedTime } from 'date-fns-tz';

const jakartaDateNow = toZonedTime(new Date(), 'Asia/Jakarta');
export const createUserHandler = async (req: Request, res: Response) => {
  try {
    
    const user = await createUser({
        ...req.body,
        created_at: jakartaDateNow
    });
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Gagal menambahkan user' });
  }
};
