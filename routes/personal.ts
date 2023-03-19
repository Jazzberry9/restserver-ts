import { Router } from 'express';
import { getPersonal} from '../controllers/personal';

const router = Router();

router.get('/', );
router.get('/:id', getPersonal);
router.post('/', );
router.put('/:id',  );
router.delete('/:id', );




export default router;