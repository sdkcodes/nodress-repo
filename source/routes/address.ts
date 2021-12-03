import { Router } from "express";
import { getAddress, getAddresses } from "../controllers/address";

const router = Router();

router.get('/address', getAddresses);
router.get('/address/:id', getAddress);
export = router;